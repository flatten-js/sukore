<template lang="pug">
  pickup-template
    template(v-slot:user-detail)
      user-detail
        template(v-slot:header)
          header-image(:url="user.headerImage")
        template(v-slot:user-icon)
          user-icon(
            :url="user.userIcon"
            size="large"
            border="default"
            )
        template(v-slot:user-profile-body)
          user-profile-text(
            :name="user.name"
            :screenName="user.screenName"
            :descripstion="user.description"
            :follow="user.follow"
            :followers="user.followers"
            )
    template(v-slot:nav-tabs)
      nav-tabs
        template(v-for="tab in navTabsData")
          tab-item(
            :to="tab.to"
            :text="tab.text"
            )
    template(v-slot:tabs-content)
      transition
        keep-alive
          router-view
</template>

<script>
import PickupTemplate from '@/components/templates/PickupTemplate.vue'
import UserDetail from '@/components/organisms/UserDetail.vue'
import HeaderImage from '@/components/molecules/HeaderImage.vue'
import UserIcon from '@/components/molecules/UserIcon.vue'
import UserProfileText from '@/components/molecules/UserProfileText.vue'
import NavTabs from '@/components/organisms/NavTabs.vue'
import TabItem from '@/components/molecules/TabItem.vue'
import ThumbnailBoxGrid from '@/components/organisms/ThumbnailBoxGrid.vue'
import ThumbnailBox from '@/components/molecules/ThumbnailBox.vue'

export default {
  components: {
    PickupTemplate,
    UserDetail,
    HeaderImage,
    UserIcon,
    UserProfileText,
    NavTabs,
    TabItem,
    ThumbnailBoxGrid,
    ThumbnailBox
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
    navTabsData() {
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
