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
          transition(:name="transitionName")
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
      homeUsers: [],
      transitionName: ''
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
    '$route.path'(to, from) {
      const toDepth = to.split('/')
      const fromDepth = from.split('/')
      this.transitionName = toDepth > fromDepth ? 'left-parry' : 'right-parry'
    },
    '$route.params.screenName'(to, from) {
      if (to === from) return

      this.initUser(to, 100, true, this.likes)
      this.initHomeSetting(to, this.homeUsers)
    }
  },
  methods: {
    async initUser(screenName, count, excludeReplies, likes) {
      this.$store.commit('initMediaList')
      this.$store.dispatch('userSearch', { screenName: this.screenName })
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

<style lang="scss" scoped>
  @mixin parry-transition($type, $order: ()) {
    @each $e, $val in $order {
      .#{$type}-parry-#{$e} {
        @extend %#{$val};
      }
    }
  }

  %in {
    transform: translateX(0);
  }

  %left-out {
    transform: translateX(-100%);
  }

  %right-out {
    transform: translateX(100%);
  }

  $left-order: (
    'enter': 'right-out',
    'enter-to': 'in',
    'leave': 'in',
    'leave-to': 'left-out'
  );

  @include parry-transition('left', $order: $left-order)

  $right-order: (
    'enter': 'left-out',
    'enter-to': 'in',
    'leave': 'in',
    'leave-to': 'right-out'
  );

  @include parry-transition('right', $order: $right-order)

  .left-parry-enter-active,
  .left-parry-leave-active,
  .right-parry-enter-active,
  .right-parry-leave-active {
    transition: transform .4s;
  }
</style>
