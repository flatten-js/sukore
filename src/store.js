import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    auth: {
      screenName: 'this_world_girl'
    },
    user: {
      masthead: '',
      icon: '',
      name: '',
      screenName: '',
      description: '',
      fave: false,
      urlObject: {
        url: [],
        description: []
      },
      status: {
        following: '',
        followers: '',
      },
      remarks: {
        location: '',
        link: ''
      }
    },
    mediaList: [],
    currentId: ''
  },
  mutations: {
    setUser(state, payload) {
      state.user = { ...state.user, ...payload.user }
    },
    initFave(state, payload) {
      state.user = {
        ...state.user,
        fave: payload.faves.some(fave => fave.uid === payload.uid)
      }
    },
    updateFave(state) {
      state.user = { ...state.user, fave: !state.user.fave }
    },
    updateCurrentId(state, payload) {
      state.currentId = payload.currentId
    },
    initMediaList(state) {
      if (!state.mediaList.length) return
      state.mediaList = []
    },
    addMediaList({ mediaList }, payload) {
      mediaList.push(...payload.mediaList)
    },
    updateMediaList(state, payload) {
      state.mediaList = payload.mediaList
    },
    initMediaListState({ mediaList }, payload) {
      payload.likes.forEach(fav => {
        const index = mediaList.findIndex(media => media.id === fav.tid)

        if (index !== -1) {
          mediaList.splice(index, 1, { ...mediaList[index], state: true })
        }
      })
    },
    updateMediaListState({ mediaList }, payload) {
      const index = mediaList.findIndex(media => media.id === payload.tid)
      mediaList.splice(index, 1, { ...mediaList[index], state: !mediaList[index].state })
    }
  },
  getters: {
    auth: ({ auth }) => auth,
    user: ({ user }) => user,
    currentId: ({ currentId }) => currentId,
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
          id: user.id_str,
          masthead: user.profile_banner_url,
          icon: user.profile_image_url_https.replace('normal', '400x400'),
          name: user.name,
          screenName: user.screen_name,
          description: user.description,
          urlObject: Object.keys(user.entities).reduce((acc, cur) => {
            acc[cur] = user.entities[cur].urls
            return acc
          }, {}),
          status: {
            following: user.friends_count,
            followers: user.followers_count,
          },
          remarks: {
            location: user.location,
            link: user.url
          }
        }

        commit('setUser', payload)
      })
    },
    async userTimelineSearch({ commit }, { screenName, count, excludeReplies }) {
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
            urlList: obj.entities.urls,
            text: obj.text,
            created: obj.created_at,
            entities: {
              type: obj.extended_entities.media[0].type,
              thumbnail: {
                src: obj.extended_entities.media[0].media_url_https,
                size: obj.extended_entities.media[0].sizes.small
              },
              src: obj.extended_entities.media[0].type.match('photo')
              ? obj.extended_entities.media.map(media => media.media_url_https)
              : obj.extended_entities.media[0].video_info.variants.filter(variant => variant.content_type === 'video/mp4')[0].url,
              sizes: obj.extended_entities.media.map(media => media.sizes.medium),
              length: obj.extended_entities.media.length
            },
            retweetedStatus: false,
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

        commit('updateMediaList', payload)
      })
    },
    async tweetsSearch({ state, commit }, { type = 'update', query, count, maxId }) {
      const payload = {
        mediaList: [],
        currentId: ''
      }

      await axios.get('http://localhost:3000/api/twitter/search/tweets', {
        params: {
          q: query,
          count,
          max_id: maxId
        }
      })
      .then(res => {
        res.data.statuses.forEach(obj => {
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
            thumbnailSize: obj.extended_entities.media[0].sizes.small,
            state: false
          }

          if (obj.retweeted_status) {
            const updateMediaObject = {
              id: obj.retweeted_status.id_str,
              icon: obj.retweeted_status.user.profile_image_url_https.replace('normal', '400x400'),
              name: obj.retweeted_status.user.name,
              screenName: obj.retweeted_status.user.screen_name,
              text: obj.retweeted_status.text,
              retweetedStatus: obj.retweeted_status.user.screen_name !== state.user.screenName
            }

            mediaObjectTemplate = { ...mediaObjectTemplate, ...updateMediaObject }
          }

          payload.mediaList.push(mediaObjectTemplate)
          payload.currentId = mediaObjectTemplate.id
        })

        const typeSwitch = {
          add() {
            commit('addMediaList', payload)
          },
          update() {
            commit('updateMediaList', payload)
          }
        }

        typeSwitch[type]()
        commit('updateCurrentId', payload)
      })
    }
  }
})
