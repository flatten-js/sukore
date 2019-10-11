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
import axios from 'axios'

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
  data() {
    return {
      user: null,
      mediaList: []
    }
  },
  mounted() {
    this.userTimelineSearch('kq89nju2')
  },
  methods: {
    userTimelineSearch: function(screenName, count = 25, excludeReplies = true) {
      const { mediaList } = this
      axios.get(`http://localhost:3000/api/twitter/search?screen_name=${screenName}&count=${count}&excludeReplies=${excludeReplies}`)
      .then(res => {
        res.data.map(obj => {
          if (!this.user) {
            this.user = {
              headerImage: obj.user.profile_banner_url,
              userIcon: obj.user.profile_image_url_https.replace('normal', '400x400'),
              name: obj.user.name,
              screenName: obj.user.screen_name,
              description: obj.user.description,
              follow: obj.user.friends_count,
              followers: obj.user.followers_count
            }
          }

          obj.extended_entities.media.map(media => {
            mediaList.push({
              id: media.id,
              src: media.media_url_https
            })
          })
        })
      })
    }
  }
}
</script>
