<template lang="pug">
  .single-line-text(:class="propsClassGenerator")
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
        return ['small', 'default'].includes(val)
      }
    },
    brightness: {
      type: String,
      default: '1',
      validator(val) {
        return ['1', '2'].includes(val)
      }
    }
  },
  computed: {
    propsClassGenerator() {
      const { size, brightness } = this

      return {
        [`-size-${size}`]: size,
        [`-brightness-${brightness}`]: brightness
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .single-line-text {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;

    &.-size-default {
      font-size: 1rem;
    }

    &.-size-small {
      font-size: .875rem;
    }

    &.-brightness-1 {
      color: rgba(26, 26, 26, 1);
    }

    &.-brightness-2 {
      color: rgba(26, 26, 26, .75);
    }
  }
</style>
