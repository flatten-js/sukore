import { twitter } from '@/utils.js'

export default {
  namespaced: true,

  state: {
    _user: {
      id: '',
      masthead: '',
      icon: '',
      name: '',
      screenName: '',
      description: '',
      fave: false,
      entities: {
        urls: [],
        descriptions: []
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
    user: {}
  },

  mutations: {
    init(state) {
      state.user = { ...state._user }
    },
    set(state, payload) {
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
    }
  },

  actions: {
    async search({ commit }, { screenName }) {
      const { data: user } = await twitter.get('users/show', { screenName })
      commit('set', { user })
    }
  },

  getters: {
    get: ({ user }) => user
  }
}
