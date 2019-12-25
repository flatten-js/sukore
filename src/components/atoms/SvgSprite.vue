<template lang="pug">
  svg.svg-sprite(
    :class="propsClassGenerator"
    )
    use(:xlink:href="name | convertSymbolPath")
</template>

<script>
export default {
  filters: {
    convertSymbolPath(name) {
      return `/img/icons/symbol-defs.svg#icon-${name}`
    }
  },
  props: {
    name: {
      type: String,
      reqired: true
    },
    size: {
      type: String,
      default: 'default',
      validator(val) {
        return ['default', 'large'].includes(val)
      }
    }
  },
  computed: {
    propsClassGenerator() {
      const { size } = this

      return {
        [`-size-${size}`]: size
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .svg-sprite {
    fill: currentColor;

    &.-size-default {
      width: 1rem;
      height: 1rem;
    }

    &.-size-large {
      width: 1.5rem;
      height: 1.5rem;
    }
  }
</style>
