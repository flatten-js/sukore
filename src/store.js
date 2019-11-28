import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { apolloProvider } from '@/apollo'
import { FAVORITE } from '@/constants/graphql'

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
    mediaList: [],
    favorites: []
  },
  mutations: {
    setUser(state, payload) {
      state.user = { ...state.user, ...payload.user }
    },
    setMediaList(state, payload) {
      state.mediaList.push(...payload.mediaList)
    },
    setFavorite(state, payload) {
      state.favorites.push(...payload.favorites)
    },
    initFavorite({ favorites, mediaList }) {
      favorites.forEach(fav => {
        const index = mediaList.findIndex(media => media.id === fav.tid)

        if (index !== -1) {
          mediaList.splice(index, 1, { ...mediaList[index], state: true })
        }
      })
    },
    updateFavorite({ mediaList }, payload) {
      const index = mediaList.findIndex(media => media.id === payload.tid)
      mediaList.splice(index, 1, { ...mediaList[index], state: !mediaList[index].state })
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
    },
    favorites: ({ favorites }) => {
      return favorites
    }
  },
  actions: {
    userPickupData({ dispatch }, { screenName, count, excludeReplies }) {
      dispatch('userSearch', { screenName })
      dispatch('userTimelineSearch', {
        screenName,
        count,
        excludeReplies
      })
    },
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

        commit('initFavorite')
      })
    },
    allFavorite({ commit }) {
      const payload = {
        favorites: null
      }

      apolloProvider.defaultClient.query({
        query: FAVORITE.ALL
      }).then(res => {
        payload.favorites = res.data.favorites
        commit('setFavorite', payload)
      })
    },
    addFavorite({ commit }, tid) {
      const payload = {
        tid: tid
      }

      commit('updateFavorite', payload)

      apolloProvider.defaultClient.mutate({
        mutation: FAVORITE.ADD,
        variables: {
          tid: payload.tid
        }
      }).catch(err => {
        console.log(err)
        commit('updateFavorite', payload)
      })
    },
    removeFavorite({ commit }, tid) {
      const payload = {
        tid: tid
      }

      commit('updateFavorite', payload)

      apolloProvider.defaultClient.mutate({
        mutation: FAVORITE.REMOVE,
        variables: {
          tid: payload.tid
        }
      }).catch(err => {
        console.log(err)
        commit('updateFavorite', payload)
      })
    }
  }
})
