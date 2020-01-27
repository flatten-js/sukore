<template lang="pug">
  user-template
    template(#user-details-catch)
      user-details-catch
        user-details(
          v-bind="user"
          @fave-click="updateFave"
          )
    template(#thumbnail-box-area)
      thumbnail-box-area
        template(#navigation)
          flex-tab-bar(:tab-items="userTabItems")
        template(#content)
          transition(:name="transitionName")
            keep-alive
              router-view
</template>

<script>
import { mapGetters } from 'vuex'
import { FAVE, LIKE } from '@/apollo/graphql'
import { shareUpdateFave } from '@/apollo/graphql/used/shares'

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
    faves: {
      query: FAVE.ALL,
      variables() {
        return {
          screenName: this.auth.screenName
        }
      },
      result({ data }, key) {
        if (this.init[key]) return
        this.init = { ...this.init, [key]: true }

        this.initUserData(this.screenName, data.faves)
      }
    },
    likes: {
      query: LIKE.ALL,
      variables() {
        return {
          screenName: this.auth.screenName
        }
      },
      result({ data }, key) {
        if (this.init[key]) return
        this.init = { ...this.init, [key]: true }

        this.initUserMediaData(this.screenName, 100, true, data.likes)
      }
    }
  },
  computed: {
    ...mapGetters([
      'auth',
      'user'
    ]),
    userTabItems() {
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

      this.initUserData(to, this.faves)
      this.initUserMediaData(to, 100, true, this.likes)
    }
  },
  created() {
    this.$store.commit('initMediaList')
  },
  methods: {
    async initUserData(screenName, faves) {
      await this.$store.dispatch('userSearch', { screenName })
      await this.$store.commit('initFave', { uid: this.user.id, faves })
    },
    async initUserMediaData(screenName, count, excludeReplies, likes) {
      await this.$store.dispatch('userTimelineSearch', { screenName, count, excludeReplies })
      await this.$store.commit('initMediaListState', { likes })
    },
    updateFave() {
      shareUpdateFave(this.$store, this.$apollo, this.auth.screenName, this.user)
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
