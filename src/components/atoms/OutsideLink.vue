<template lang="pug">
  a.outside-link(
    :class="propsClassGenerator"
    :href="href"
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
  .outside-link {
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
