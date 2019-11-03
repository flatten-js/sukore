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
      follow: '',
      followers: ''
    },
    mediaList: [],
    favorites: []
  },
  mutations: {
    getUser(state, payload) {
      state.user = { ...state.user, ...payload.user }
    },
    getMediaList(state, payload) {
      state.mediaList.push(...payload.mediaList)
    },
    getFavorite(state, payload) {
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
    async userTimelineSearch({ state, commit }, { screenName, count, excludeReplies }) {
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
            id: obj.id_str,
            icon: obj.user.profile_image_url_https.replace('normal', '400x400'),
            name: obj.user.name,
            screenName: obj.user.screen_name,
            src: obj.extended_entities.media.map(media => media.media_url_https),
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
          commit('getUser', payload)
          commit('getMediaList', payload)
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
        commit('getFavorite', payload)
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
