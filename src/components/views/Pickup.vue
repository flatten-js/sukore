<template lang="pug">
  pickup-template
    template(v-slot:user-detail)
      template(v-if="user")
        user-detail
          template(v-slot:header)
            header-image(:url="user.headerImage")
          template(v-slot:user-icon)
            user-icon(:src="user.userIcon")
          template(v-slot:user-profile-body)
            user-profile-text(
              :name="user.name"
              :screenName="`@${user.screenName}`"
              :descripstion="user.description"
              :follow="user.follow"
              :followers="user.followers"
              )
    template(v-slot:thumbnail-box)
      thumbnail-box-grid
        template(v-for="media in mediaList")
          thumbnail-box(
            :key="media.id"
            :src="media.src"
            )
</template>

<script>
import PickupTemplate from '@/components/templates/PickupTemplate.vue'
import UserDetail from '@/components/organisms/UserDetail.vue'
import HeaderImage from '@/components/molecules/HeaderImage.vue'
import UserIcon from '@/components/molecules/UserIcon.vue'
import UserProfileText from '@/components/molecules/UserProfileText.vue'
import ThumbnailBoxGrid from '@/components/organisms/ThumbnailBoxGrid.vue'
import ThumbnailBox from '@/components/molecules/ThumbnailBox.vue'

export default {
  components: {
    PickupTemplate,
    UserDetail,
    HeaderImage,
    UserIcon,
    UserProfileText,
    ThumbnailBoxGrid,
    ThumbnailBox
  },
  mounted() {
    this.userTimelineSearch('reoenl')
  },
  computed: {
    user() {
      return this.$store.state.user
    },
    mediaList() {
      return this.$store.state.mediaList
    }
  },
  methods: {
    userTimelineSearch: function(screenName, count = 25, excludeReplies = true) {
      this.$store.dispatch('userTimelineSearch', { screenName, count, excludeReplies })
    }
  }
}
</script>
