<template lang="pug">
  a.anchor-button(
    :class="propsClassGenerator"
    :href="href"
    )
    | {{ text }}
</template>

<script>
export default {
  props: {
    href: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'twitter',
      validator(val) {
        return ['twitter'].includes(val)
      }
    },
    size: {
      type: String,
      default: 'small',
      validator(val) {
        return ['small'].includes(val)
      }
    }
  },
  computed: {
    propsClassGenerator() {
      const { type, size } = this

      return {
        [`-type-${type}`]: type,
        [`-size-${size}`]: size
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .anchor-button {
    text-decoration: none;
    border-radius: 25px;

    &.-size-small {
      font-size: .875rem;
      padding: .35rem 1rem;
    }

    &.-type-twitter {
      background-color: #1DA1F2;
      color: white;
    }
  }
</style>
