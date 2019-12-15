<template lang="pug">
  span.inline-icon-text(:class="propsClassGenerator")
    i.inline-icon-text__icon.material-icons
      | {{ name }}
    span
      | {{ text }}
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    text: {
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
  .inline-icon-text {
    &.-size-default {
      font-size: 1rem;
    }

    &.-brightness-1 {
      color: rgba(26, 26, 26, 1);
    }

    &.-brightness-2 {
      color: rgba(26, 26, 26, .75);
    }

    &__icon {
      margin-right: .25rem;
      font-size: inherit;
      vertical-align: top;
    }
  }
</style>
