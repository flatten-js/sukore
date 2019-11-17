<template lang="pug">
  v-lazy-image.width-standard-image(
    :src="src"
    )
</template>

<script>
import VLazyImage from 'v-lazy-image'

export default {
  components: {
    VLazyImage
  },
  props: {
    src: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
  .width-standard-image {
    width: 100%;
    height: auto;
    background-color: #dcdcdc;
  }
</style>
