<template lang="pug">
  .user-icon(:class="propsClassGenerator")
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
    },
    size: {
      type: String,
      default: 'medium',
      validator(val) {
        return ['medium', 'large'].includes(val)
      }
    }
  },
  computed: {
    propsClassGenerator() {
      const { size } = this

      return {
        [`size-${size}`]: size
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .user-icon {
    border: 3px solid #fff;
    border-radius: 50%;
    box-sizing: border-box;

    &.size-medium {
      width: 40px;
      height: 40px;
    }

    &.size-large {
      width: 70px;
      height: 70px;
    }
  }
</style>
