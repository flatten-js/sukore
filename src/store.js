import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      headerImage: '',
      userIcon: '',
      name: '',
      screenName: '',
      description: '',
      descriptionUrlList: [],
      follow: '',
      followers: '',
      location: ''
    },
    mediaList: []
  },
  mutations: {
    setUser(state, payload) {
      state.user = { ...state.user, ...payload.user }
    },
    setMediaList(state, payload) {
      state.mediaList.push(...payload.mediaList)
    }
  },
  getters: {
    user: ({ user }) => {
      return user
    },
    noMediaListDuplicate: ({ mediaList }) => {
      return mediaList.filter((media, index, self) => {
        return self.findIndex(findMedia => findMedia.id === media.id) === index
      })
    },
    tweetFilter: (state, { noMediaListDuplicate }) => {
      return noMediaListDuplicate.filter(obj => !obj.retweetedStatus)
    },
    retweetFilter: (state, { noMediaListDuplicate }) => {
      return noMediaListDuplicate.filter(obj => obj.retweetedStatus)
    }
  },
  actions: {
    async userSearch({ commit }, { screenName }) {
      const payload = {
        user: null
      }

      await axios.get('http://localhost:3000/api/twitter/users/show', {
        params: {
          screen_name: screenName
        }
      })
      .then(res => {
        const user = res.data

        payload.user = {
          headerImage: user.profile_banner_url,
          userIcon: user.profile_image_url_https.replace('normal', '400x400'),
          name: user.name,
          screenName: user.screen_name,
          description: user.description,
          urlList: user.entities.description.urls,
          follow: user.friends_count,
          followers: user.followers_count,
          location: user.location
        }

        commit('setUser', payload)
      })
    },
    async userTimelineSearch({ state, commit }, { screenName, count, excludeReplies }) {
      const payload = {
        mediaList: []
      }

      await axios.get('http://localhost:3000/api/twitter/search', {
        params: {
          screen_name: screenName,
          count: count,
          exclude_replies: excludeReplies
        }
      })
      .then(res => {
        res.data.forEach(obj => {
          if (!obj.extended_entities) return

          let mediaObjectTemplate = {
            id: obj.id_str,
            icon: obj.user.profile_image_url_https.replace('normal', '400x400'),
            name: obj.user.name,
            screenName: obj.user.screen_name,
            src: obj.extended_entities.media.map(media => media.media_url_https),
            urlList: obj.entities.urls,
            text: obj.text,
            created: obj.created_at,
            retweetedStatus: false,
            size: obj.extended_entities.media.length,
            state: false
          }

          if (obj.retweeted_status) {
            const updateMediaObject = {
              id: obj.retweeted_status.id_str,
              icon: obj.retweeted_status.user.profile_image_url_https.replace('normal', '400x400'),
              name: obj.retweeted_status.user.name,
              screenName: obj.retweeted_status.user.screen_name,
              text: obj.retweeted_status.text,
              retweetedStatus: obj.retweeted_status.user.screen_name !== screenName
            }

            mediaObjectTemplate = { ...mediaObjectTemplate, ...updateMediaObject }
          }

          payload.mediaList.push(mediaObjectTemplate)
        })

        if (!state.mediaList.length || state.user.screenName !== screenName) {
          commit('setMediaList', payload)
        }
      })
    }
  }
})
