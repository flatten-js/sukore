<template lang="pug">
  .navigation-controls
    .navigation-controls__go-back(
      @click="goBack"
      )
      svg-sprite(name="chevron-left")
</template>

<script>
import SvgSprite from '@/components/atoms/SvgSprite.vue'

export default {
  components: {
    SvgSprite
  },
  methods: {
    goBack() {
      this.$router.back()
    }
  }
}
</script>

<style lang="scss" scoped>
  .navigation-controls {
    &__go-back {
      display: inline-block;
      padding: .5rem;
      font-size: 0;
      border-radius: 50%;
      color: white;
      background-color: rgba(26, 26, 26, .75);
    }
  }
</style>
