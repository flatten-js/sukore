<template lang="pug">
  thumbnail-box-grid
    template(v-for="media in tweetMedia")
      thumbnail-box(
        :key="media.id"
        :src="media.src"
        )
</template>

<script>
import ThumbnailBoxGrid from '@/components/organisms/ThumbnailBoxGrid.vue'
import ThumbnailBox from '@/components/molecules/ThumbnailBox.vue'

export default  {
  components: {
    ThumbnailBoxGrid,
    ThumbnailBox
  },
  computed: {
    tweetMedia() {
      return this.$store.getters.tweetFilter
    }
  }
}
</script>
