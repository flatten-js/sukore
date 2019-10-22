<template lang="pug">
  a.v-anchor(
    :class="propsClassGenerator"
    :href="href"
    :target="target"
    ) {{ text }}
</template>

<script>
export default {
  props: {
    href: {
      type: String,
      reqired: true
    },
    text: {
      type: String,
      reqired: true
    },
    target: {
      type: String,
      default: '_blank',
      validator(val) {
        return ['_blank'].includes(val)
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
      const { size } = this

      return {
        [`size-${size}`]: size
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .v-anchor {
    display: inline-block;
    text-decoration: none;
    color: inherit;
    word-break: keep-all;

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
