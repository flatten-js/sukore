<template lang="pug">
  pickup-detail-template
    template(v-slot:user-detail-bar)
      user-detail-bar
        template(v-slot:user-icon)
          user-icon(:url="mediaFromId.icon")
        template(v-slot:user-name)
          single-line-text(
            :text="mediaFromId.name"
            size="small"
            weight="bold"
            )
        template(v-slot:user-twitter-link)
          v-anchor-button(
            type="twitter"
            :href="mediaFromId.screenName | twitterPathConversion"
            text="Twitterを見る"
            fontSize="small"
            )
    template(v-slot:thumbnail-detail)
      thumbnail-detail
        template(v-slot:thumbnail)
          template(v-for="src in thumbnailView")
            thumbnail(:src="src")
        template(v-slot:more)
          template(v-if="mediaFromId.size > 1 && limit")
            v-anchor-button(
              text="すべて見る"
              fontSize="small"
              size="large"
              @click.native="limit = !limit"
              )
        template(v-slot:caption)
          thumbnail-caption(
            :text="mediaFromId.text"
            :created="mediaFromId.created"
            )
</template>

<script>
import { mapGetters } from 'vuex'

import PickupDetailTemplate from '@/components/templates/PickupDetailTemplate.vue'
import UserDetailBar from '@/components/organisms/UserDetailBar.vue'
import UserIcon from '@/components/molecules/UserIcon.vue'
import SingleLineText from '@/components/molecules/SingleLineText.vue'
import VAnchorButton from '@/components/molecules/VAnchorButton.vue'
import ThumbnailDetail from '@/components/organisms/ThumbnailDetail.vue'
import Thumbnail from '@/components/molecules/Thumbnail.vue'
import ThumbnailCaption from '@/components/molecules/ThumbnailCaption.vue'

export default {
  components: {
    PickupDetailTemplate,
    UserDetailBar,
    UserIcon,
    SingleLineText,
    VAnchorButton,
    ThumbnailDetail,
    Thumbnail,
    ThumbnailCaption
  },
  props: {
    id: {
      type: String,
      reqired: true
    }
  },
  data() {
    return {
      limit: true
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
    },
    thumbnailView() {
      const { mediaFromId, limit } = this

      return mediaFromId['src'].filter((src, index) => {
        return limit ? !index : true
      })
    }
  }
}
</script>
