<template lang="pug">
  pickup-template
    template(v-slot:user-details-catch)
      user-details-catch
        user-details(
          :masthead="user.headerImage"
          :icon="user.userIcon"
          :name="user.name"
          :screen-name="user.screenName"
          :description="user.description"
          :following="user.follow"
          :followers="user.followers"
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
import PickupTemplate from '@/components/templates/PickupTemplate.vue'
import UserDetailsCatch from '@/components/organisms/UserDetailsCatch.vue'
import UserDetails from '@/components/molecules/UserDetails.vue'
import UserProfileText from '@/components/molecules/UserProfileText.vue'
import NavTabs from '@/components/organisms/NavTabs.vue'
import TabItem from '@/components/molecules/TabItem.vue'
import ThumbnailBoxGrid from '@/components/organisms/ThumbnailBoxGrid.vue'
import ThumbnailBox from '@/components/molecules/ThumbnailBox.vue'
import SimpleTabItem from '@/components/molecules/SimpleTabItem.vue'
import FlexTabBar from '@/components/molecules/FlexTabBar.vue'
import ThumbnailBoxArea from '@/components/organisms/ThumbnailBoxArea.vue'

export default {
  components: {
    PickupTemplate,
    UserDetailsCatch,
    UserDetails,
    UserProfileText,
    NavTabs,
    TabItem,
    ThumbnailBoxGrid,
    ThumbnailBox,
    SimpleTabItem,
    FlexTabBar,
    ThumbnailBoxArea
  },
  props: {
    screenName: {
      type: String,
      required: true
    }
  },
  mounted() {
    this.userTimelineSearch(this.screenName, 50)
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
    userTimelineSearch: function(screenName, count = 25, excludeReplies = true) {
      this.$store.dispatch('userTimelineSearch', { screenName, count, excludeReplies })
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
