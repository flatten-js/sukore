import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    mediaList: null
  },
  mutations: {
    getUser(state, payload) {
      state.user = payload.user
    },
    getMediaList(state, payload) {
      state.mediaList = payload.mediaList
    }
  },
  getters: {
    user: ({ user }) => {
      if (!user) return
      return user
    },
    tweetFilter: ({ mediaList }, { mediaListDuplicateNo }) => {
      if (!mediaList) return
      return mediaListDuplicateNo.filter(obj => !obj.retweeted_status)
    },
    retweetFilter: ({ mediaList }, { mediaListDuplicateNo }) => {
      if (!mediaList) return
      return mediaListDuplicateNo.filter(obj => obj.retweeted_status)
    },
    mediaListDuplicateNo: ({ mediaList }) => {
      if (!mediaList) return

      return mediaList.filter((media, index, self) => {
        return self.findIndex(findMedia => findMedia.id === media.id) === index
      })
    }
  },
  actions: {
    async userTimelineSearch({ commit }, { screenName, count, excludeReplies }) {
      const payload = {
        user: null,
        mediaList: []
      }

      await axios.get(`http://localhost:3000/api/twitter/search?screen_name=${screenName}&count=${count}&excludeReplies=${excludeReplies}`)
      .then(res => {
        res.data.map(obj => {
          if (!payload.user) {
            payload.user = {
              headerImage: obj.user.profile_banner_url,
              userIcon: obj.user.profile_image_url_https.replace('normal', '400x400'),
              name: obj.user.name,
              screenName: obj.user.screen_name,
              description: obj.user.description,
              follow: obj.user.friends_count,
              followers: obj.user.followers_count
            }
          }

          if (!obj.extended_entities) return

          let mediaObjectTemplate = {
            id: obj.id,
            icon: obj.user.profile_image_url_https.replace('normal', '400x400'),
            name: obj.user.name,
            screen_name: obj.user.screen_name,
            src: obj.extended_entities.media.map(media => media.media_url_https),
            text: obj.text,
            created: obj.created_at,
            retweeted_status: false,
            size: obj.extended_entities.media.length
          }

          if (obj.retweeted_status) {
            const updateMediaObject = {
              id: obj.retweeted_status.id,
              icon: obj.retweeted_status.user.profile_image_url_https.replace('normal', '400x400'),
              name: obj.retweeted_status.user.name,
              screen_name: obj.retweeted_status.user.screen_name,
              text: obj.retweeted_status.text,
              retweeted_status: obj.retweeted_status.user.screen_name !== screenName
            }

            mediaObjectTemplate = { ...mediaObjectTemplate, ...updateMediaObject }
          }

          payload.mediaList.push(mediaObjectTemplate)
        })

        commit('getUser', payload)
        commit('getMediaList', payload)
      })
    }
  }
})
