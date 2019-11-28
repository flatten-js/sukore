<template lang="pug">
  user-pickup-template
    template(v-slot:user-details-catch)
      user-details-catch
        user-details(
          :masthead="user.headerImage"
          :icon="user.userIcon"
          :name="user.name"
          :screen-name="user.screenName"
          :description="user.description"
          :url-list="user.urlList"
          :following="user.follow"
          :followers="user.followers"
          :location="user.location"
          )
    template(v-slot:thumbnail-box-area)
      thumbnail-box-area
        template(v-slot:navigation)
          flex-tab-bar(
            :tab-items="tabItemsInit"
            )
        template(v-slot:contents)
          transition
            keep-alive
              router-view
</template>

<script>
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
  mounted() {
    this.initUserPickupData(this.screenName, 50)
  },
  computed: {
    user() {
      return this.$store.getters.user
    },
    tabItemsInit() {
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
    initUserPickupData(screenName, count, excludeReplies = true) {
      const { dispatch } = this.$store

      dispatch('userSearch', { screenName })
      dispatch('userTimelineSearch', {
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
    transform: translate3d(0, 1rem, 0);
    opacity: 0;
  }
  .v-enter-to {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
  .v-enter-active {
    transition: all ease-out .4s;
  }
</style>
