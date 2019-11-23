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
    size: {
      type: String,
      default: 'default',
      validator(val) {
        return ['default', 'large'].includes(val)
      }
    },
    weight: {
      type: String,
      default: 'normal',
      validator(val) {
        return ['normal', 'bold'].includes(val)
      }
    }
  },
  computed: {
    propsClassGenerator() {
      const { size, weight } = this

      return {
        [`-size-${size}`]: size,
        [`-weight-${weight}`]: weight
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .multi-line-text {
    color: #1a1a1a;
    
    &.-size-default {
      font-size: 1rem;
    }

    &.-size-large {
      font-size: 1.125rem;
    }

    &.-weight-normal {
      font-weight: normal;
    }

    &.-weight-bold {
      font-weight: bold;
    }
  }
</style>
