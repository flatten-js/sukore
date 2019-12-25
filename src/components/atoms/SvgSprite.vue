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
    },
    shadow: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    propsClassGenerator() {
      const { size, shadow } = this

      return {
        [`-size-${size}`]: size,
        '-shadow': shadow
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

    &.-shadow {
      filter: drop-shadow(0 2px 5px rgba(26, 26, 26, .26));
    }
  }
</style>
