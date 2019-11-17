<template lang="pug">
  pickup-detail-template
    template(v-slot:image-details-card)
      image-details-card
        template(v-slot:head)
          user-details-bar(
            :icon="mediaFromId.icon"
            :name="mediaFromId.name"
            :screen-name="mediaFromId.screenName"
            )
        template(v-slot:body)
          origin-card(
            :src-list="mediaFromId.src"
            :size="mediaFromId.size"
            :comment="mediaFromId.text"
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

import ImageDetailsCard from '@/components/organisms/ImageDetailsCard.vue'

import UserDetailsBar from '@/components/molecules/UserDetailsBar.vue'
import OriginCard from '@/components/molecules/OriginCard.vue'

export default {
  components: {
    PickupDetailTemplate,
    UserDetailBar,
    UserIcon,
    SingleLineText,
    VAnchorButton,
    ThumbnailDetail,
    Thumbnail,
    ThumbnailCaption,
    ImageDetailsCard,
    UserDetailsBar,
    OriginCard
  },
  props: {
    id: {
      type: String,
      reqired: true
    }
  },
  computed: {
    ...mapGetters([
      'noMediaListDuplicate'
    ]),
    mediaFromId() {
      const { noMediaListDuplicate, id } = this
      const index = noMediaListDuplicate.findIndex(media => media.id == id)

      return noMediaListDuplicate[index]
    }
  }
}
</script>
