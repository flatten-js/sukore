<template lang="pug">
  component.single-line-text(
    :is="tag"
    :class="propsClassGenerator"
    )
    | {{ text }}
</template>

<script>
export default {
  props: {
    tag: {
      type: String,
      default: 'div',
      validator(val) {
        return ['div', 'h1', 'h2'].includes(val)
      }
    },
    text: {
      type: String,
      required: true
    },
    size: {
      type: String,
      default: 'default',
      validator(val) {
        return ['small', 'default', 'large'].includes(val)
      }
    },
    weight: {
      type: String,
      default: 'normal',
      validator(val) {
        return ['normal', 'bold'].includes(val)
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
      const { size, weight, brightness } = this

      return {
        [`-size-${size}`]: size,
        [`-weight-${weight}`]: weight,
        [`-brightness-${brightness}`]: brightness
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .single-line-text {
    margin: 0;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;

    &.-size-small {
      font-size: .875rem;
    }

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

    &.-brightness-1 {
      color: rgba(26, 26, 26, 1);
    }

    &.-brightness-2 {
      color: rgba(26, 26, 26, .75);
    }
  }
</style>
