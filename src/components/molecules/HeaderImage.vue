<template lang="pug">
  .header-image
    vary-background-image(
      :url="url"
      attachment="fixed"
      size="contain"
      )
</template>

<script>
import VaryBackgroundImage from '@/components/atoms/VaryBackgroundImage.vue'

export default {
  components: {
    VaryBackgroundImage
  },
  props: {
    url: [String, null]
  }
}
</script>

<style scoped>
  .header-image {
    width: 100%;
    height: 125px;
    background-color: #d1d1d1;
  }
</style>
