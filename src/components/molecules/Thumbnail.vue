<template lang="pug">
  .thumbnail
    vary-image(:src="src")
</template>

<script>
import VaryImage from '@/components/atoms/VaryImage.vue'

export default {
  components: {
    VaryImage
  },
  props: {
    src: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
  .thumbnail {
    width: 100%;
    line-height: 0;

    .vary-image {
      height: auto;
    }
  }
</style>
