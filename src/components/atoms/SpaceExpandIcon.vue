<template lang="pug">
  svg.space-expand-icon(:class="propsClassGenerator")
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
      required: true
    },
    size: {
      type: String,
      default: 'default',
      validator(val) {
        return ['default'].includes(val)
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
  .space-expand-icon {
    padding: .5rem;
    fill: currentColor;

    &.-size-default {
      width: 1.8rem;
      height: 1.8rem;
    }

    &.-shadow {
      filter: drop-shadow(0 2px 5px rgba(26, 26, 26, .26));
    }
  }
</style>
