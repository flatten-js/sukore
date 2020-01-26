<template lang="pug">
  thumbnail-box-grid
    template(v-for="media in tweetFilter")
      thumbnail-box(
        :key="media.id"
        :id="media.id"
        :type="media.entities.type"
        :src="media.entities.thumbnail.src"
        :screenName="media.screenName"
        :image-count="media.entities.length"
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
      'auth',
      'tweetFilter'
    ])
  },
  methods: {
    updateLike(id) {
      const media = this.tweetFilter.find(media => media.id === id)
      sharedUpdateLike(this.$store, this.$apollo, this.auth.screenName, media)
    }
  }
}
</script>
