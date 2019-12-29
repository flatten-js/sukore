<template lang="pug">
  user-template
    template(#user-details-catch)
      user-details-catch
        user-details(
          v-bind="user"
          @clickMaterialButton="updateUserHome"
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
        favorites: false,
        likes: false,
        homeUsers: false
      },
      favorites: [],
      likes: [],
      homeUsers: []
    }
  },
  apollo: {
    likes: {
      query: LIKE.GET.ALL,
      async result({ data }, key) {
        if (this.init[key]) return
        this.init = { ...this.init, [key]: true }

        await this.initUserPickupData(this.screenName, 100)
        await this.$store.commit('initMediaListState', { likes: data.likes })
      }
    },
    homeUsers: {
      query: HOME_USER.ALL,
      result({ data }, key) {
        if (this.init[key]) return
        this.init = { ...this.init, [key]: true }

        this.$store.commit('initUserHome', {
          homeUsers: data.homeUsers,
          screenName: this.screenName
        })
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
  methods: {
    async initUserPickupData(screenName, count, excludeReplies = true) {
      await this.$store.dispatch('userSearch', { screenName })
      await this.$store.dispatch('userTimelineSearch', {
        screenName,
        count,
        excludeReplies
      })
    },
    updateUserHome() {
      const { screenName } = this

      this.$store.commit('updateUserHome')

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
          this.$store.commit('updateUserHome')
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
          this.$store.commit('updateUserHome')
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
