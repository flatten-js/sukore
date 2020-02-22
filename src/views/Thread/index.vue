<template lang="pug">
  thread-layout
    template(#header-area)
      header-area
        user-details-bar(
          type="simple"
          name="スレッド"
          option="none"
          )
    template(#pickup-card)
      pickup-card
        template(#head)
          user-details-bar(
            :icon="foundMedia.icon"
            :name="foundMedia.name"
            :screen-name="foundMedia.screenName"
            )
        template(#media)
          card-details-box(
            :id="foundMedia.id"
            :screenName="foundMedia.screenName"
            :type="foundMedia.entities.type"
            :src="foundMedia.entities.src"
            :src-size="foundMedia.entities.thumbnail.size"
            :length="foundMedia.entities.length"
            )
        template(#details)
          card-details(
            :id="foundMedia.id"
            :comment="foundMedia.text"
            :url-list="foundMedia.urlList"
            :created="foundMedia.created"
            :state="foundMedia.state"
            @like-click="updateLike"
            )
    template(#photo-zoomable-content)
      router-view
</template>

<script>
import { mapGetters } from 'vuex'
import { shareUpdateLike } from '@/apollo/graphql/used/shares'

import ThreadLayout from '@/components/templates/ThreadLayout.vue'
import HeaderArea from '@/components/organisms/HeaderArea.vue'
import UserDetailsBar from '@/components/molecules/UserDetailsBar.vue'
import PickupCard from '@/components/organisms/PickupCard.vue'
import CardDetailsBox from '@/components/molecules/CardDetailsBox.vue'
import CardDetails from '@/components/molecules/CardDetails.vue'

export default {
  components: {
    ThreadLayout,
    HeaderArea,
    UserDetailsBar,
    PickupCard,
    CardDetailsBox,
    CardDetails
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
