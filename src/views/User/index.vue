<template lang="pug">
  user-template
    template(#user-details-catch)
      user-details-catch
        user-details(
          v-bind="user"
          @clickHomeSetting="updateHomeUser"
          )
    template(#thumbnail-box-area)
      thumbnail-box-area
        template(#navigation)
          flex-tab-bar(
            :tab-items="initTabItems"
            )
        template(#content)
          transition
            keep-alive
              router-view
</template>

<script>
import { mapGetters } from 'vuex'
import { FAVORITE, LIKE, HOME_USER } from '@/constants/graphql'

import UserTemplate from '@/components/templates/UserTemplate.vue'
import UserDetailsCatch from '@/components/organisms/UserDetailsCatch.vue'
import UserDetails from '@/components/molecules/UserDetails.vue'
import ThumbnailBoxArea from '@/components/organisms/ThumbnailBoxArea.vue'
import FlexTabBar from '@/components/molecules/FlexTabBar.vue'

export default {
  components: {
    UserTemplate,
    UserDetailsCatch,
    UserDetails,
    ThumbnailBoxArea,
    FlexTabBar
  },
  props: {
    screenName: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      init: {
        likes: false,
        homeUsers: false
      },
      likes: [],
      homeUsers: []
    }
  },
  apollo: {
    likes: {
      query: LIKE.GET.ALL,
      result({ data }, key) {
        if (this.init[key]) return
        this.init = { ...this.init, [key]: true }

        this.initUser(this.screenName, 100, true, data.likes)
      }
    },
    homeUsers: {
      query: HOME_USER.ALL,
      result({ data }, key) {
        if (this.init[key]) return
        this.init = { ...this.init, [key]: true }

        this.initHomeSetting(this.screenName, data.homeUsers)
      }
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ]),
    initTabItems() {
      const { screenName } = this

      return [
        {
          to: `/${screenName}`,
          text: 'ツイート'
        },
        {
          to: `/${screenName}/retweet`,
          text: 'リツイート'
        }
      ]
    }
  },
  watch: {
    '$route'(to, from) {
      this.initUser(to.params.screenName, 100, true, this.likes)
      this.initHomeSetting(to.params.screenName, this.homeUsers)
    }
  },
  methods: {
    async initUser(screenName, count, excludeReplies, likes) {
      await this.$store.dispatch('userSearch', { screenName })
      await this.$store.dispatch('userTimelineSearch', { screenName, count, excludeReplies })
      await this.$store.commit('initMediaListState', { likes })
    },
    initHomeSetting(screenName, homeUsers) {
      this.$store.commit('initHomeSetting', { screenName, homeUsers })
    },
    updateHomeUser() {
      const { screenName } = this

      this.$store.commit('updateHomeUser')

      if (this.user.home) {
        this.$apollo.mutate({
          mutation: HOME_USER.ADD,
          variables: {
            screenName: screenName
          },
          update: (store, { data: { createHomeUser } }) => {
            const data = store.readQuery({ query: HOME_USER.ALL })
            data.homeUsers.push(createHomeUser)
            store.writeQuery({ query: HOME_USER.ALL, data })
          },
          optimisticResponse: {
            __typename: 'Mutation',
            createHomeUser: {
              __typename: 'HomeUser',
              screenName: screenName
            }
          }
        })
        .catch(err => {
          this.$store.commit('updateHomeUser')
        })
      } else {
        this.$apollo.mutate({
          mutation: HOME_USER.REMOVE,
          variables: {
            screenName: screenName
          },
          update: (store) => {
            const data = store.readQuery({ query: HOME_USER.ALL })
            data.homeUsers = data.homeUsers.filter(user => user.screenName !== screenName)
            store.writeQuery({ query: HOME_USER.ALL, data })
          },
          optimisticResponse: {
            __typename: 'Mutation',
            deleteManyHomeUsers: {
              __typename: 'HomeUser',
              count: 0
            }
          }
        })
        .catch(err => {
          this.$store.commit('updateHomeUser')
        })
      }
    }
  }
}
</script>

<style scoped>
  .v-enter {
    opacity: 0;
  }

  .v-enter-to {
    opacity: 1;
  }

  .v-enter-active {
    transition: all ease-out .4s;
  }
</style>
