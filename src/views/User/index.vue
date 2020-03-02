<template lang="pug">
  user-layout
    template(#header-area)
      header-area
        details-bar(
          :name="user.name"
          :screen-name="user.screenName"
          option="fave"
          :fave="user.fave"
          :adjust="isFaveOverlap"
          @fave-click="updateFave"
          )
    template(#user-details-area)
      user-details-area
        user-details(
          v-bind="user"
          @fave-offset-pass="fetchFaveOffset"
          @menu-click="graduallyPopup('start')"
          @fave-click="updateFave"
          )
    template(#thumbnail-box-area)
      thumbnail-box-area
        template(#navigation)
          text-tab-bar(:tab-items="userTabItems")
        template(#loading)
          template(v-if="loading.likes")
            absolute-territory
        template(#content)
          transition(
            :name="transitionName"
            @enter="callTabTransitionHook"
            @after-leave="callTabTransitionHook"
            )
            keep-alive
              router-view
    template(#update-area)
      update-area(ref="updateArea")
        template(v-if="!loading.likes && !tabTransition")
          template(v-if="scrollable")
            absolute-territory
          template(v-else)
            absolute-territory(
              type="button"
              text="さらに前のメディアを表示"
              @click.native="updateUserMediaData"
              )
    template(#option-menu-popup)
      transition(
        name="fade"
        @enter="graduallyPopup('content')"
        )
        template(v-if="popup.start")
          popup(
            @click.native.self="graduallyPopup('content')"
            )
            template(#content)
              transition(
                name="slide"
                @leave="graduallyPopup('start')"
                )
                template(v-if="popup.content")
                  popup-content(
                    :items="options"
                    @cancel-click="graduallyPopup('content')"
                    )
</template>

<script>
import { mapGetters } from 'vuex'
import { FAVE, LIKE } from '@/apollo/graphql'
import { shareUpdateFave } from '@/apollo/graphql/used/shares'

import UserLayout from '@/components/templates/UserLayout.vue'
import HeaderArea from '@/components/organisms/HeaderArea.vue'
import DetailsBar from '@/components/molecules/DetailsBar.vue'
import UserDetailsArea from '@/components/organisms/UserDetailsArea.vue'
import UserDetails from '@/components/molecules/UserDetails.vue'
import ThumbnailBoxArea from '@/components/organisms/ThumbnailBoxArea.vue'
import TextTabBar from '@/components/molecules/TextTabBar.vue'
import AbsoluteTerritory from '@/components/molecules/AbsoluteTerritory.vue'
import UpdateArea from '@/components/organisms/UpdateArea.vue'
import Popup from '@/components/organisms/Popup.vue'
import PopupContent from '@/components/molecules/PopupContent.vue'

export default {
  components: {
    UserLayout,
    HeaderArea,
    DetailsBar,
    UserDetailsArea,
    UserDetails,
    ThumbnailBoxArea,
    TextTabBar,
    AbsoluteTerritory,
    UpdateArea,
    Popup,
    PopupContent
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
      window: {
        height: 0
      },
      el: {
        height: ''
      },
      init: {
        faves: false,
        likes: false
      },
      loading: {
        likes: true
      },
      offset: {
        page: 0,
        fave: 0
      },
      faves: [],
      likes: [],
      style: '',
      updating: false,
      transitionName: '',
      tabTransition: false,
      popup: {
        start: false,
        content: false
      }
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
        this.addUserMediaData({
          style: this.style,
          screenName: this.screenName,
          count: 100,
          likes: data.likes,
          key
        })
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
    },
    options() {
      const { screenName } = this

      return [
        {
          name: 'world',
          href: `https://twitter.com/${screenName}`,
          text: `@${screenName}さんのTwitterを表示`
        }
      ]
    },
    isFaveOverlap() {
      return this.offset.page > this.offset.fave
    },
    scrollable() {
      // 96: Height of AbsoluteTerritory
      return (this.el.height - 96) > window.innerHeight
    }
  },
  watch: {
    '$route.path': {
      handler: function(to, from) {
        const toDepth = to.split('/')
        this.style = toDepth.length > 2 ? 'retweet' : 'tweet'

        if (from) {
          const fromDepth = from.split('/')
          this.transitionName = toDepth > fromDepth ? 'left-parry' : 'right-parry'
        }
      },
      immediate: true
     },
    '$route.params.screenName': {
      handler: async function(to, from) {
        if (to === from) return

        this.$store.commit('initMedia')

        if (from) {
          this.queryLoadingReady('likes')
          this.initUserData(to, this.faves)
          this.addUserMediaData({
            style: this.style,
            screenName: to,
            count: 100,
            likes: this.likes,
            key: 'likes'
          })
        }
      },
      immediate: true
    },
    'el.height'() {
      this.updateOffset('updateArea', this.$refs.updateArea.$el.offsetTop)
    },
    'popup.start'(to) {
      document.body.style.overflow = to ? 'hidden' : ''
    }
  },
  created() {
    this.lifecycle = { created: false }
    this.window = { height: window.innerHeight }

    if (this.media.sender === this.screenName) {
      this.queryInitReady('likes')
      this.queryLoadingReady('likes')
      return
    }
  },
  beforeMount() {
    window.addEventListener('scroll', this.scroll, { passive: true })
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.scroll, { passive: true })
  },
  methods: {
    async initUserData(screenName, faves) {
      await this.$store.dispatch('userSearch', { screenName })
      await this.$store.commit('initFave', { faves })
    },
    async initUserMediaData({ type, style, screenName, count, excludeReplies, likes }) {
      await this.$store.dispatch('userTimelineSearch', { type, style, screenName, count, excludeReplies })
      await this.$store.commit('initMediaListState', { likes })
      await this.fetchElHeight()
    },
    async addUserMediaData({ style, screenName, count, likes, key }) {
      await this.initUserMediaData({ style, screenName, count, likes })
      await this.queryLoadingReady(key)
    },
    async updateUserMediaData() {
      await this.initUserMediaData({
        type: 'update',
        style: this.style,
        screenName: this.screenName,
        count: 200,
        likes: this.likes
      })
    },
    updateFave() {
      shareUpdateFave(this.$store, this.$apollo, this.oauth.iid, this.user)
    },
    queryInitReady(key) {
      this.init = { ...this.init, [key]: true }
    },
    queryLoadingReady(key) {
      this.loading = { [key]: !this.loading[key] }
    },
    updateOffset(key, val) {
      this.offset = { ...this.offset, [key]: val }
    },
    fetchFaveOffset(offset) {
      this.updateOffset('fave', offset)
    },
    async scroll() {
      let ticking = false

      const update = async () => {
        ticking = false

        this.updateOffset('page', window.pageYOffset)

        if (!this.scrollable) return
        if (this.updating) return

        // 250: preload
        if (this.offset.page + this.window.height > this.offset.updateArea - 250) {
          this.updating = true
          await this.updateUserMediaData()
          this.updating = false
        }
      }

      if (!ticking) {
        requestAnimationFrame(update)
        ticking = true
      }
    },
    fetchElHeight() {
      this.el = { height: this.$el.clientHeight }
    },
    callTabTransitionHook() {
      if (!this.tabTransition) {
        this.fetchElHeight()
      }
      this.tabTransition = !this.tabTransition
    },
    graduallyPopup(key) {
      this.popup = { ...this.popup, [key]: !this.popup[key] }
    }
  }
}
</script>

<style lang="scss" scoped>
  @mixin parry-transition($type, $orders: ()) {
    $leaves: 'leave', 'leave-to';

    @each $e, $order in $orders {
      .#{$type}-parry-#{$e} {
        @if index($leaves, $e) != null {
          position: absolute;
        }
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

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
  }

  .slide-enter, .slide-leave-to {
    transform: translateY(100%);
  }

  .slide-enter-to, .slide-leave {
    transform: translateY(0);
  }

  .slide-enter-active, .slide-leave-active {
    transition: transform .3s;
  }
</style>
