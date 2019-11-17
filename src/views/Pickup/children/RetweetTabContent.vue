<template lang="pug">
  thumbnail-box-grid
    template(v-for="media in retweetFilter")
      thumbnail-box(
        ref="calleeThumbnailBox"
        :key="media.id"
        :id="media.id"
        :src="media.src[0]"
        :screenName="media.screenName"
        :image-count="media.size"
        :state="media.state"
        animation="fade"
        @clickFavorite="clickFavorite"
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
    retweetFilter() {
      return this.$store.getters.retweetFilter
    }
  },
  methods: {
    clickFavorite(caller) {
      const index = this.$refs.calleeThumbnailBox.findIndex(callee => callee.$el === caller)
      const media = this.retweetFilter[index]

      if (media.state) {
        this.$store.dispatch('removeFavorite', media.id)
      } else {
        this.$store.dispatch('addFavorite', media.id)
      }
    }
  }
}
</script>
