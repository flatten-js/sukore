<template lang="pug">
  thumbnail-box-grid
    template(v-for="media in tweetFilter")
      thumbnail-box(
        :key="media.id"
        :id="media.id"
        :src="media.src[0]"
        :size="media.size"
        animation="fade"
        )
</template>

<script>
import ThumbnailBoxGrid from '@/components/organisms/ThumbnailBoxGrid.vue'
import ThumbnailBox from '@/components/molecules/ThumbnailBox.vue'

export default {
  components: {
    ThumbnailBoxGrid,
    ThumbnailBox
  },
  computed: {
    tweetFilter() {
      return this.$store.getters.tweetFilter
    }
  }
}
</script>
