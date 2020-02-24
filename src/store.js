import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    oauth: {
      iid: '1035366824412471296'
    },
    user: {
      id: '',
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
    media: {
      sender: '',
      list: []
    },
    stock: [],
    currentId: ''
  },
  mutations: {
    setUser(state, payload) {
      state.user = { ...state.user, ...payload.user }
    },
    initFave(state, payload) {
      state.user = {
        ...state.user,
        fave: payload.faves.some(fave => fave.uid === state.user.id)
      }
    },
    updateFave(state) {
      state.user = { ...state.user, fave: !state.user.fave }
    },
    updateCurrentId(state, payload) {
      state.currentId = payload.currentId
    },
    initMedia(state) {
      state.media = {
        sender: '',
        list: []
      }
    },
    addMedia(state, payload) {
      state.media = {
        sender: payload.sender,
        list: payload.stock
        ? payload.mediaList.concat(payload.stock.list)
        : payload.mediaList
      }
    },
    updateMedia(state, payload) {
      state.media = {
        ...state.media,
        list: state.media.list.concat(payload.mediaList)
      }
    },
    initMediaListState({ media }, payload) {
      payload.likes.forEach(like => {
        const i = media.list.findIndex(media => media.id === like.tid)

        if (i !== -1) {
          media.list.splice(i, 1, { ...media.list[i], state: true })
        }
      })
    },
    updateMediaListState({ media }, payload) {
      const i = media.list.findIndex(media => media.id === payload.tid)
      media.list.splice(i, 1, { ...media.list[i], state: !media.list[i].state })
    },
    updateStock({ stock, media }, payload) {
      if (payload.stock) {
        if (!payload.mediaList.length) return
        const i = stock.findIndex(media => media.sender === payload.screenName)
        stock.splice(i, 1, media)
      } else {
        stock.push(media)
      }
    }
  },
  getters: {
    oauth: ({ oauth }) => oauth,
    user: ({ user }) => user,
    media: ({ media }) => media,
    stock: ({ stock }) => stock,
    currentId: ({ currentId }) => currentId,
    noMediaListDuplicate: ({ media }) => {
      return media.list.filter((media, i, self) => {
        return self.findIndex(findMedia => findMedia.id === media.id) === i
      })
    },
    tweetFilter: (state, { noMediaListDuplicate }) => {
      return noMediaListDuplicate.filter(media => !media.retweeted)
    },
    retweetFilter: (state, { noMediaListDuplicate }) => {
      return noMediaListDuplicate.filter(media => media.retweeted)
    },
    stockAllMediaList: ({ stock }) => {
      return stock.flatMap(media => media.list)
    }
  },
  actions: {
    async homeTimelineSearch({ commit }, { count, excludeReplies }) {
      const payload = {
        sender: 'home',
        mediaList: []
      }

      await axios.get('/api/twitter/statuses/home/timeline', {
        params: {
          count,
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
              : [obj.extended_entities.media[0].video_info.variants.filter(variant => variant.content_type === 'video/mp4')[0].url],
              sizes: obj.extended_entities.media.map(media => media.sizes),
              length: obj.extended_entities.media.length
            },
            retweeted: false,
            state: false
          }

          if (obj.retweeted_status) {
            const updateMediaObject = {
              id: obj.retweeted_status.id_str,
              icon: obj.retweeted_status.user.profile_image_url_https.replace('normal', '400x400'),
              name: obj.retweeted_status.user.name,
              screenName: obj.retweeted_status.user.screen_name,
              text: obj.retweeted_status.text,
              retweeted: obj.retweeted_status.user.screen_name
            }

            mediaObjectTemplate = { ...mediaObjectTemplate, ...updateMediaObject }
          }

          payload.mediaList.push(mediaObjectTemplate)
        })

        commit('addMedia', payload)
      })
    },
    async userSearch({ commit }, { screenName }) {
      const payload = {
        user: null
      }

      await axios.get('/api/twitter/users/show', {
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
    async userTimelineSearch({ commit, getters }, { screenName, count, excludeReplies }) {
      const payload = {
        sender: screenName,
        mediaList: [],
        stock: {}
      }

      const stock = getters.stock.find(media => media.sender === screenName)
      payload.stock = stock || null

      await axios.get('/api/twitter/statuses/user/timeline', {
        params: {
          screen_name: screenName,
          since_id: stock
          ? stock.list[0]._id
          : null,
          count: count,
          exclude_replies: excludeReplies
        }
      })
      .then(res => {
        res.data.forEach(obj => {
          if (!obj.extended_entities) return

          let mediaObjectTemplate = {
            _id: obj.id_str,
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
              : [obj.extended_entities.media[0].video_info.variants.filter(variant => variant.content_type === 'video/mp4')[0].url],
              sizes: obj.extended_entities.media.map(media => media.sizes),
              length: obj.extended_entities.media.length
            },
            retweeted: false,
            state: false
          }

          if (obj.retweeted_status) {
            const updateMediaObject = {
              id: obj.retweeted_status.id_str,
              icon: obj.retweeted_status.user.profile_image_url_https.replace('normal', '400x400'),
              name: obj.retweeted_status.user.name,
              screenName: obj.retweeted_status.user.screen_name,
              text: obj.retweeted_status.text,
              retweeted: obj.retweeted_status.user.screen_name !== screenName
            }

            mediaObjectTemplate = { ...mediaObjectTemplate, ...updateMediaObject }
          }

          payload.mediaList.push(mediaObjectTemplate)
        })

        commit('addMedia', payload)
        commit('updateStock', payload)
      })
    },
    async tweetsSearch({ getters, commit }, { type = 'add', query, count, maxId }) {
      const payload = {
        sender: '',
        mediaList: [],
        currentId: ''
      }

      await axios.get('/api/twitter/search/tweets', {
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
              : [obj.extended_entities.media[0].video_info.variants.filter(variant => variant.content_type === 'video/mp4')[0].url],
              sizes: obj.extended_entities.media.map(media => media.sizes),
              length: obj.extended_entities.media.length
            },
            retweeted: false,
            state: false
          }

          if (obj.retweeted_status) {
            const updateMediaObject = {
              id: obj.retweeted_status.id_str,
              icon: obj.retweeted_status.user.profile_image_url_https.replace('normal', '400x400'),
              name: obj.retweeted_status.user.name,
              screenName: obj.retweeted_status.user.screen_name,
              text: obj.retweeted_status.text,
              retweeted: obj.retweeted_status.user.screen_name !== getters.user.screenName
            }

            mediaObjectTemplate = { ...mediaObjectTemplate, ...updateMediaObject }
          }

          payload.mediaList.push(mediaObjectTemplate)
          payload.currentId = mediaObjectTemplate.id
        })

        const typeSwitch = {
          add() {
            commit('addMedia', payload)
          },
          update() {
            commit('updateMedia', payload)
          }
        }

        typeSwitch[type]()
        commit('updateCurrentId', payload)
      })
    }
  }
})
