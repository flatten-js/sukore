<template lang="pug">
  pickup-detail-template
    template(#photo-zoomable-content)
      router-view
    template(#image-details-card)
      image-details-card
        template(#head)
          user-details-bar(
            :icon="mediaFromId.icon"
            :name="mediaFromId.name"
            :screen-name="mediaFromId.screenName"
            )
        template(#body)
          origin-card(
            :type="mediaFromId.entities.type"
            :id="mediaFromId.id"
            :screen-name="mediaFromId.screenName"
            :src="mediaFromId.entities.media.src"
            :size="mediaFromId.size"
            :url-list="mediaFromId.urlList"
            :comment="mediaFromId.text"
            :created="mediaFromId.created"
            )
</template>

<script>
import { mapGetters } from 'vuex'

import PickupDetailTemplate from '@/components/templates/PickupDetailTemplate.vue'
import ImageDetailsCard from '@/components/organisms/ImageDetailsCard.vue'
import UserDetailsBar from '@/components/molecules/UserDetailsBar.vue'
import OriginCard from '@/components/molecules/OriginCard.vue'

export default {
  components: {
    PickupDetailTemplate,
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
      return this.noMediaListDuplicate.find(media => media.id == this.id)
    }
  }
}
</script>
