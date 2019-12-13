<template lang="pug">
  img.vary-standard-image(
    :class="propsClassGenerator"
    :src="src"
    )
</template>

<script>
export default {
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
