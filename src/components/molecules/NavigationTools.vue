<template lang="pug">
  .navigation-tools
    .navigation-tools__back(
      @click="back"
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
    back() {
      this.$router.back()
    }
  }
}
</script>

<style lang="scss" scoped>
  .navigation-tools {
    &__back {
      display: inline-block;
      padding: .5rem;
      font-size: 0;
      border-radius: 50%;
      color: white;
      background-color: rgba(26, 26, 26, .75);
    }
  }
</style>
