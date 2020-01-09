<template lang="pug">
  user-template
    template(#user-details-catch)
      user-details-catch
        user-details(
          v-bind="user"
          @clickFaveSetting="updateFave"
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
import { FAVE, LIKE } from '@/constants/graphql'

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
        faves: false,
        likes: false
      },
      faves: [],
      likes: [],
      transitionName: ''
    }
  },
  apollo: {
    likes: {
      query: LIKE.ALL,
      result({ data }, key) {
        if (this.init[key]) return
        this.init = { ...this.init, [key]: true }

        this.initUser(this.screenName, 100, true, data.likes)
      }
    },
    faves: {
      query: FAVE.ALL,
      result({ data }, key) {
        if (this.init[key]) return
        this.init = { ...this.init, [key]: true }

        this.initFave(this.screenName, data.faves)
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
      this.initFave(to, this.faves)
    }
  },
  methods: {
    async initUser(screenName, count, excludeReplies, likes) {
      this.$store.commit('initMediaList')
      this.$store.dispatch('userSearch', { screenName: this.screenName })
      await this.$store.dispatch('userTimelineSearch', { screenName, count, excludeReplies })
      await this.$store.commit('initMediaListState', { likes })
    },
    initFave(screenName, faves) {
      this.$store.commit('initFave', { screenName, faves })
    },
    updateFave() {
      const { screenName, user } = this

      this.$store.commit('updateFave')

      if (user.fave) {
        this.$apollo.mutate({
          mutation: FAVE.REMOVE,
          variables: {
            screenName: screenName
          },
          update: (store) => {
            const data = store.readQuery({ query: FAVE.ALL })
            data.faves = data.faves.filter(fave => fave.screenName !== screenName)
            store.writeQuery({ query: FAVE.ALL, data })
          },
          optimisticResponse: {
            __typename: 'Mutation',
            deleteManyFaves: {
              __typename: 'Fave',
              count: 0
            }
          }
        })
        .catch(() => {
          this.$store.commit('updateFave')
        })
      } else {
        this.$apollo.mutate({
          mutation: FAVE.ADD,
          variables: {
            screenName: screenName
          },
          update: (store, { data: { createFave } }) => {
            const data = store.readQuery({ query: FAVE.ALL })
            data.faves.push(createFave)
            store.writeQuery({ query: FAVE.ALL, data })
          },
          optimisticResponse: {
            __typename: 'Mutation',
            createFave: {
              __typename: 'Fave',
              screenName: screenName
            }
          }
        })
        .catch(() => {
          this.$store.commit('updateFave')
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @mixin parry-transition($type, $orders: ()) {
    @each $e, $order in $orders {
      .#{$type}-parry-#{$e} {
        position: absolute;
        width: 100%;
        @extend %#{$order};
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

  $left-orders: (
    'enter': 'right-out',
    'enter-to': 'in',
    'leave': 'in',
    'leave-to': 'left-out'
  );

  @include parry-transition('left', $orders: $left-orders)

  $right-orders: (
    'enter': 'left-out',
    'enter-to': 'in',
    'leave': 'in',
    'leave-to': 'right-out'
  );

  @include parry-transition('right', $orders: $right-orders)

  .left-parry-enter-active,
  .left-parry-leave-active,
  .right-parry-enter-active,
  .right-parry-leave-active {
    transition: transform .4s;
  }
</style>
