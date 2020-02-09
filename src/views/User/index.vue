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
          text-tab-bar(:tab-items="userTabItems")
        template(#loading)
          template(v-if="loading.likes")
            loader-box
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
import TextTabBar from '@/components/molecules/TextTabBar.vue'
import LoaderBox from '@/components/molecules/LoaderBox.vue'

export default {
  components: {
    UserTemplate,
    UserDetailsCatch,
    UserDetails,
    ThumbnailBoxArea,
    TextTabBar,
    LoaderBox
  },
  props: {
    screenName: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      lifecycle: {
        created: true
      },
      init: {
        faves: false,
        likes: false
      },
      loading: {
        likes: true
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
          iid: this.oauth.iid
        }
      },
      skip() {
        return this.init.faves
      },
      result({ data }, key) {
        this.queryInitReady(key)
        this.initUserData(this.screenName, data.faves)
      }
    },
    likes: {
      query: LIKE.ALL,
      variables() {
        return {
          iid: this.oauth.iid
        }
      },
      skip() {
        return this.lifecycle.created || this.init.likes
      },
      async result({ data }, key) {
        this.queryInitReady(key)

        await this.initUserMediaData(this.screenName, 200, true, data.likes)
        this.queryLoadingReady(key)
      }
    }
  },
  computed: {
    ...mapGetters([
      'oauth',
      'user',
      'media'
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
    this.lifecycle = { created: false }

    if (this.media.sender === this.screenName) {
      this.queryInitReady('likes')
      this.queryLoadingReady('likes')
      return
    }

    this.$store.commit('initMedia')
  },
  methods: {
    async initUserData(screenName, faves) {
      await this.$store.dispatch('userSearch', { screenName })
      await this.$store.commit('initFave', { faves })
    },
    async initUserMediaData(screenName, count, excludeReplies, likes) {
      await this.$store.dispatch('userTimelineSearch', { screenName, count, excludeReplies })
      await this.$store.commit('initMediaListState', { likes })
    },
    updateFave() {
      shareUpdateFave(this.$store, this.$apollo, this.oauth.iid, this.user)
    },
    queryInitReady(key) {
      this.init = { ...this.init, [key]: true }
    },
    queryLoadingReady(key) {
      this.loading = { [key]: false }
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
