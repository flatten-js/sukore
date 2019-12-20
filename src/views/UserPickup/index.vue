<template lang="pug">
  user-pickup-template
    template(#user-details-catch)
      user-details-catch
        user-details(
          v-bind="user"
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
import { FAVORITE } from '@/constants/graphql'

import UserPickupTemplate from '@/components/templates/UserPickupTemplate.vue'
import UserDetailsCatch from '@/components/organisms/UserDetailsCatch.vue'
import UserDetails from '@/components/molecules/UserDetails.vue'
import ThumbnailBoxArea from '@/components/organisms/ThumbnailBoxArea.vue'
import FlexTabBar from '@/components/molecules/FlexTabBar.vue'

export default {
  components: {
    UserPickupTemplate,
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
      favorites: []
    }
  },
  apollo: {
    favorites: FAVORITE.ALL
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
    '$route.params.screenName': {
      handler: async function(newScreenName, oldScreenName) {
        if (newScreenName === oldScreenName) return

        await this.initUserPickupData(newScreenName, 200)
        await this.$store.commit('initMediaListState', { favorites: this.favorites })
      },
      immediate: true
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
