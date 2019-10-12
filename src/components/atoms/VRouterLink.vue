<template lang="pug">
  router-link.v-router-link(
    :class="propsClassGenerator"
    :to="to"
    ) {{ text }}
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    size: {
      type: String,
      default: 'medium',
      validator(val) {
        return ['medium', 'small', 'xs'].includes(val)
      }
    },
    p: {
      type: [String, null],
      default: null,
      validator(val) {
        return ['1'].includes(val)
      }
    }
  },
  computed: {
    propsClassGenerator() {
      const { size, p } = this

      return {
        [`size-${size}`]: size,
        [`p-${p}`]: p
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .v-router-link {
    display: inline-block;
    text-decoration: none;
    color: inherit;
    box-sizing: border-box;

    &.size-medium {
      font-size: 1rem;
    }

    &.size-small {
      font-size: .875rem;
    }

    &.size-xs {
      font-size: .75rem;
    }

    &.p-1 {
      padding: 1rem;
    }
  }
</style>
