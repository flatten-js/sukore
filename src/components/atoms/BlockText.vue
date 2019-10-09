<template lang="pug">
  .block-text(:class="propsClassGenerator") {{ text }}
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    },
    brightness: {
      type: String,
      default: '1',
      validator(val) {
        return ['1', '2', '3', '4'].includes(val)
      }
    },
    size: {
      type: String,
      default: 'medium',
      validator(val) {
        return ['medium', 'small', 'xs'].includes(val)
      }
    }
  },
  computed: {
    propsClassGenerator() {
      const { brightness, size } = this

      return {
        [`brightness-${brightness}`]: brightness,
        [`size-${size}`]: size
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .block-text {
    font-size: 1rem;

    &.brightness-1 {
      color: rgba(26, 26, 26, 1);
    }

    &.brightness-2 {
      color: rgba(26, 26, 26, .75);
    }

    &.brightness-3 {
      color: rgba(26, 26, 26, .5);
    }

    &.brightness-4 {
      color: rgba(26, 26, 26, .25);
    }

    &.size-medium {
      font-size: 1rem;
    }

    &.size-small {
      font-size: .875rem;
    }

    &.size-xs {
      font-size: .75rem;
    }
  }
</style>
