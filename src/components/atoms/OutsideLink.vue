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
    color: {
      type: String,
      default: 'black',
      validator(val) {
        return ['black', 'white'].includes(val)
      }
    }
  },
  computed: {
    propsClassGenerator() {
      const { color } = this

      return {
        [`color-${color}`]: color
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .outside-link {
    display: inline-block;
    text-decoration: none;

    &.color-black {
      color: #1a1a1a;
    }

    &.color-white {
      color: #fff;
    }
  }
</style>
