<template lang="pug">
  .user-icon
    vary-image(
      :src="src"
      fit="cover"
      )
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

<style scoped>
  .user-icon {
    width: 70px;
    height: 70px;
    border: 3px solid #fff;
    border-radius: 50%;
    box-sizing: border-box;
  }
</style>
