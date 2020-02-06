<template lang="pug">
  pickup-detail-template
    template(#photo-zoomable-content)
      router-view
    template(#image-details-card)
      image-details-card
        template(#head)
          user-details-bar(
            :icon="foundMedia.icon"
            :name="foundMedia.name"
            :screen-name="foundMedia.screenName"
            )
        template(#body)
          origin-card(
            :type="foundMedia.entities.type"
            :id="foundMedia.id"
            :screen-name="foundMedia.screenName"
            :src="foundMedia.entities.src"
            :src-size="foundMedia.entities.sizes[0].medium"
            :length="foundMedia.entities.length"
            :url-list="foundMedia.urlList"
            :state="foundMedia.state"
            :comment="foundMedia.text"
            :created="foundMedia.created"
            @like-click="updateLike"
            )
</template>

<script>
import { mapGetters } from 'vuex'
import { shareUpdateLike } from '@/apollo/graphql/used/shares'

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
      'oauth',
      'noMediaListDuplicate'
    ]),
    foundMedia() {
      return this.noMediaListDuplicate.find(media => media.id == this.id)
    }
  },
  watch: {
    '$route'(to) {
      if (to.path.match(/photo\/\d$/)) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = ''
      }
    }
  },
  methods: {
    updateLike(id) {
      const media = this.noMediaListDuplicate.find(media => media.id === id)
      shareUpdateLike(this.$store, this.$apollo, this.oauth.iid, media)
    }
  }
}
</script>
