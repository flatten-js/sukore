<template lang="pug">
  thumbnail-box-grid
    template(v-for="media in retweetFilter")
      thumbnail-box(
        :key="media.id"
        :id="media.id"
        :type="media.entities.type"
        :src="media.entities.thumbnail.src"
        :screenName="media.screenName"
        :image-count="media.size"
        :thumbnail-size="media.entities.thumbnail.size"
        :state="media.state"
        @like-click="updateLike"
        )
</template>

<script>
import { mapGetters } from 'vuex'
import { sharedUpdateLike } from '@/constants/shared'

import ThumbnailBoxGrid from '@/components/organisms/ThumbnailBoxGrid.vue'
import ThumbnailBox from '@/components/molecules/ThumbnailBox.vue'

export default {
  components: {
    ThumbnailBoxGrid,
    ThumbnailBox
  },
  computed: {
    ...mapGetters([
      'retweetFilter'
    ])
  },
  methods: {
    updateLike(id) {
      const media = this.retweetFilter.find(media => media.id === id)
      sharedUpdateLike(this.$store, this.$apollo, media)
    }
  }
}
</script>
