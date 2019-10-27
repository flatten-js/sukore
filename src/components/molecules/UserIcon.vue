<template lang="pug">
  .user-icon(:class="propsClassGenerator")
    vary-background-image(
      :url="url"
      size="cover"
      )
</template>

<script>
import VaryImage from '@/components/atoms/VaryImage.vue'
import VaryBackgroundImage from '@/components/atoms/VaryBackgroundImage.vue'

export default {
  components: {
    VaryImage,
    VaryBackgroundImage
  },
  props: {
    url: {
      type: String,
      required: true
    },
    size: {
      type: String,
      default: 'medium',
      validator(val) {
        return ['medium', 'large'].includes(val)
      }
    },
    border: {
      type: [String, null],
      default: null,
      validator(val) {
        return ['default'].includes(val)
      }
    }
  },
  computed: {
    propsClassGenerator() {
      const { size, border } = this

      return {
        [`size-${size}`]: size,
        [`border-${border}`]: border
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .user-icon {
    border-radius: 50%;
    box-sizing: border-box;
    background-color: #dcdcdc;

    &.size-medium {
      width: 40px;
      height: 40px;
    }

    &.size-large {
      width: 70px;
      height: 70px;
    }

    &.border-default {
      border: 3px solid #fff;
    }
  }
</style>
