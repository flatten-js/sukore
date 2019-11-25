<template lang="pug">
  v-lazy-image.vary-standard-image(
    :class="propsClassGenerator"
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
    },
    standard: {
      type: String,
      default: 'width',
      validator(val) {
        return ['width', 'height'].includes(val)
      }
    }
  },
  computed: {
    propsClassGenerator() {
      const { standard } = this

      return {
        [`-standard-${standard}`]: standard
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .vary-standard-image {
    &.-standard-width {
      width: 100%;
      height: auto;
    }

    &.-standard-height {
      width: auto;
      height: 100%;
    }
  }
</style>
