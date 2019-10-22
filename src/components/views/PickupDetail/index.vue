<template lang="pug">
  pickup-detail-template
    template(v-slot:user-detail-bar)
      user-detail-bar
        template(v-slot:user-icon)
          user-icon(:src="mediaFromId.icon")
        template(v-slot:user-name)
          no-break-text(
            :text="mediaFromId.name"
            size="small"
            weight="bold"
            )
        template(v-slot:user-twitter-link)
          outside-link-button(
            type="twitter"
            :href="mediaFromId.screenName | twitterPathConversion"
            text="Twitterを見る"
            size="small"
            )
    template(v-slot:thumbnail-detail)
      thumbnail-detail
        thumbnail-figure(
          :src="mediaFromId.src[0]"
          :text="mediaFromId.text"
          :created="mediaFromId.created"
          )
</template>

<script>
import { mapGetters } from 'vuex'

import PickupDetailTemplate from '@/components/templates/PickupDetailTemplate.vue'
import UserDetailBar from '@/components/organisms/UserDetailBar.vue'
import UserIcon from '@/components/molecules/UserIcon.vue'
import NoBreakText from '@/components/molecules/NoBreakText.vue'
import OutsideLinkButton from '@/components/molecules/OutsideLinkButton.vue'
import ThumbnailDetail from '@/components/organisms/ThumbnailDetail.vue'
import ThumbnailFigure from '@/components/molecules/ThumbnailFigure.vue'

export default {
  components: {
    PickupDetailTemplate,
    UserDetailBar,
    UserIcon,
    NoBreakText,
    OutsideLinkButton,
    ThumbnailDetail,
    ThumbnailFigure
  },
  props: {
    id: {
      type: String,
      reqired: true
    }
  },
  filters: {
    twitterPathConversion(val) {
      return `https://twitter.com/${val}`
    }
  },
  computed: {
    ...mapGetters([
      'mediaListDuplicateNo'
    ]),
    mediaFromId() {
      const { mediaListDuplicateNo, id } = this
      const index = mediaListDuplicateNo.findIndex(media => media.id == id)

      return mediaListDuplicateNo[index]
    }
  }
}
</script>
