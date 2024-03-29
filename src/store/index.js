import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

import user from './modules/user.js'

Vue.use(Vuex)

const mediaTemplate = (data, screenName) => {
  if (!data.extended_entities) return

  let mediaObjectTemplate = {
    _id: data.id_str,
    id: data.id_str,
    icon: data.user.profile_image_url_https.replace('normal', '400x400'),
    name: data.user.name,
    screenName: data.user.screen_name,
    urlList: data.entities.urls,
    text: data.text,
    created: data.created_at,
    entities: {
      type: data.extended_entities.media[0].type,
      thumbnail: {
        src: data.extended_entities.media[0].media_url_https,
        size: data.extended_entities.media[0].sizes.small
      },
      src: data.extended_entities.media[0].type.match('photo')
      ? data.extended_entities.media.map(media => media.media_url_https)
      : [data.extended_entities.media[0].video_info.variants.filter(variant => variant.content_type === 'video/mp4')[0].url],
      sizes: data.extended_entities.media.map(media => media.sizes),
      length: data.extended_entities.media.length
    },
    retweeted: false,
    state: false
  }

  if (data.retweeted_status) {
    const updateMediaObject = {
      id: data.retweeted_status.id_str,
      icon: data.retweeted_status.user.profile_image_url_https.replace('normal', '400x400'),
      name: data.retweeted_status.user.name,
      screenName: data.retweeted_status.user.screen_name,
      text: data.retweeted_status.text,
      retweeted: data.retweeted_status.user.screen_name !== screenName
    }

    mediaObjectTemplate = { ...mediaObjectTemplate, ...updateMediaObject }
  }

  return mediaObjectTemplate
}

export default new Vuex.Store({
  modules: { user },
  state: {
    oauth: {
      iid: '1035366824412471296',
      icon: ''
    },
    media: {
      sender: '',
      list: [],
      refill: {
        tweet: [],
        retweet: []
      }
    },
    stock: []
  },
  mutations: {
    initMedia(state) {
      state.media = {
        sender: '',
        list: [],
        refill: {
          tweet: [],
          retweet: []
        }
      }
    },
    addMedia(state, payload) {
      state.media = {
        sender: payload.sender,
        list: payload.stock
        ? payload.mediaList.concat(payload.stock.list)
        : payload.mediaList,
        refill: payload.stock
        ? payload.stock.refill
        : { tweet: [], retweet: [] }
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
    addMediaRefill(state, payload) {
      const { tweet, retweet } = state.media.refill
      const newTweetRefill = payload.mediaList.filter(media => !media.retweeted)
      const newRetweetRefill = payload.mediaList.filter(media => media.retweeted)

      const filling = (to, from) => {
        const refill = []
        if (from) {
          refill.push(from.concat(to.splice(0, 50 - from.length)))
        }
        while(to.length) {
          refill.push(to.splice(0, 50))
        }
        return refill
      }

      state.media = {
        ...state.media,
        refill: {
          tweet: state.media.refill.tweet
          .concat(filling(newTweetRefill, tweet.pop())),
          retweet: state.media.refill.retweet
          .concat(filling(newRetweetRefill, retweet.pop()))
        }
      }
    },
    setRefill(state, payload) {
      state.media = {
        ...state.media,
        list: state.media.list.concat(state.media.refill[payload.style].shift())
      }
    },
    updateStock({ stock, media }, payload) {
      if (payload.stock) {
        if (!payload.mediaList.length) return
        const i = stock.findIndex(media => media.sender === payload.sender)
        stock.splice(i, 1, media)
      } else {
        stock.push(media)
      }
    }
  },
  getters: {
    oauth: ({ oauth }) => oauth,
    media: ({ media }) => media,
    stock: ({ stock }) => stock,
    uniqMediaList: ({ media }) => {
      return media.list.filter((set => v => !set.has(v.id) && set.add(v.id))(new Set))
    },
    tweetFilter: (state, { uniqMediaList }) => {
      return uniqMediaList.filter(media => !media.retweeted)
    },
    retweetFilter: (state, { uniqMediaList }) => {
      return uniqMediaList.filter(media => media.retweeted)
    },
    stockAllMediaList: ({ stock }) => {
      return stock.flatMap(media => media.list)
    }
  },
  actions: {
    initialize({ commit }) {
      commit('user/init')
    },
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
          const media = mediaTemplate(obj)
          if (!media) return
          payload.mediaList.push(media)
        })
      })

      commit('addMedia', payload)
    },
    async userTimelineSearch({ commit, getters }, { type = 'add', style, screenName, count, excludeReplies = true }) {
      const payload = {
        sender: screenName,
        mediaList: [],
        stock: {},
        style
      }

      const stock = getters.stock.find(media => media.sender === screenName)
      payload.stock = stock || null

      await axios.get('/api/twitter/statuses/user/timeline', {
        params: {
          screen_name: screenName,
          since_id: type === 'add' && stock
          ? stock.list[0]._id
          : null,
          max_id: type === 'update'
          ? getters.media.list.slice(-1)[0]._id
          : null,
          count: count,
          exclude_replies: excludeReplies
        }
      })
      .then(res => {
        res.data.forEach(obj => {
          const media = mediaTemplate(obj, screenName)
          if (!media) return
          payload.mediaList.push(media)
        })
      })

      const mediaSaveFormat = {
        add: () => commit('addMedia', payload),
        update: async () => {
          if (!getters.media.refill[style].length) {
            await commit('addMediaRefill', payload)
          }
          await commit('setRefill', payload)
        }
      }

      await mediaSaveFormat[type]()
      commit('updateStock', payload)
    },
    async singleTweetSearch({ commit, getters }, { id }) {
      const payload = {
        sender: 'option:mix',
        mediaList: [],
        stock: {}
      }

      const stock = getters.stock.find(media => media.sender === payload.sender)
      payload.stock = stock || null

      await axios.get('/api/twitter/statuses/show', {
        params: {
          id
        }
      })
      .then(res => {
        const media = mediaTemplate(res.data)
        if (!media) return
        payload.mediaList.push(media)
      })

      commit('addMedia', payload)
      commit('updateStock', payload)
    },
    async multiTweetSearch({ getters, commit }, { type = 'add', query, count }) {
      const payload = {
        sender: '',
        mediaList: []
      }

      await axios.get('/api/twitter/search/tweets', {
        params: {
          q: query,
          count,
          max_id: type === 'update'
          ? getters.media.list.slice(-1)[0]._id
          : null
        }
      })
      .then(res => {
        res.data.statuses.forEach(obj => {
          const media = mediaTemplate(obj)
          if (!media) return
          payload.mediaList.push(media)
        })
      })

      const mediaSaveFormat = {
        add: () => commit('addMedia', payload),
        update: ()  => commit('updateMedia', payload)
      }

      mediaSaveFormat[type]()
    }
  }
})
