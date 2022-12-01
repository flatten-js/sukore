<template lang="pug">
  .multi-line-text(:class="propsClassGenerator")
    | {{ text }}
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: 'black',
      validator(val) {
        return ['black', 'white'].includes(val)
      }
    },
    size: {
      type: String,
      default: 'default',
      validator(val) {
        return ['small', 'default', 'large', 'xl'].includes(val)
      }
    },
    weight: {
      type: String,
      default: 'normal',
      validator(val) {
        return ['normal', 'bold', 'xb'].includes(val)
      }
    }
  },
  computed: {
    propsClassGenerator() {
      const { color, size, weight } = this

      return {
        [`-color-${color}`]: color,
        [`-size-${size}`]: size,
        [`-weight-${weight}`]: weight
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .multi-line-text {
    &.-color-black {
      color: #1a1a1a;
    }

    &.-color-white {
      color: #fff;
    }

    &.-size-small {
      font-size: .875rem;
    }

    &.-size-default {
      font-size: 1rem;
    }

    &.-size-large {
      font-size: 1.125rem;
    }

    &.-size-xl {
      font-size: 1.25rem;
    }

    &.-weight-normal {
      font-weight: normal;
    }

    &.-weight-bold {
      font-weight: bold;
    }

    &.-weight-xb {
      font-weight: 900;
    }
  }
</style>
