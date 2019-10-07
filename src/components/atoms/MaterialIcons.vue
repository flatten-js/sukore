<template lang="pug">
i.material-icons(:class="sizeClassGeneration") {{ name }}
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: 'medium',
      varidator(val) {
        return ['small', 'medium', 'large', 'xl', 'custom'].includes(val)
      }
    },
    name: {
      type: String,
      reqired: true
    }
  },
  computed: {
    sizeClassGeneration() {
      const { size } = this
      return `icon-${size}`
    }
  }
}
</script>

<style lang="scss" scoped>
  .material-icons {
    &.icon-small {
      font-size: 18px;
    }

    &.icon-medium {
      font-size: 24px;
    }

    &.icon-large {
      font-size: 36px;
    }

    &.icon-xl {
      font-size: 48px;
    }

    &.icon-custom {
      font-size: inherit;
    }
  }
</style>
