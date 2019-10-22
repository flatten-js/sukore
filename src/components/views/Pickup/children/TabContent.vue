<template lang="pug">
  thumbnail-box-grid
    template(v-for="media in changeMediaWithState")
      thumbnail-box(
        :key="media.id"
        :id="media.id"
        :src="media.src[0]"
        :size="media.size"
        animation="fade-up"
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
  props: {
    state: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    tweetFilter() {
      return this.$store.getters.tweetFilter
    },
    retweetFilter() {
      return this.$store.getters.retweetFilter
    },
    changeMediaWithState() {
      const { state, tweetFilter, retweetFilter } = this
      return state ? tweetFilter : retweetFilter
    }
  }
}
</script>
