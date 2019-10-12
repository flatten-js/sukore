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

          obj.extended_entities.media.map(media => {
            payload.mediaList.push({
              id: media.id,
              src: media.media_url_https
            })
          })
        })

        commit('getUser', payload)
        commit('getMediaList', payload)
      })
    }
  }
})
