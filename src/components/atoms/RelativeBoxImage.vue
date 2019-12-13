<template lang="pug">
  .relative-box-image
    v-lazy-image.relative-box-image__body(
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
    column: {
      type: String,
      default: '2',
      validator(val) {
        return ['2'].includes(val)
      }
    }
  },
  computed: {
    propsClassGenerator() {
      const { column } = this

      return {
        [`-column-${column}`]: column
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .relative-box-image {
    position: relative;

    &::before {
      content: "";
      display: block;
      padding: 100% 0 0;
    }

    &__body {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      object-fit: cover;
    }
  }
</style>
