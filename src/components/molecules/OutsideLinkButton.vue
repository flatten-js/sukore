<template lang="pug">
  .outside-link-button(:class="propsClassGenerator")
    outside-link(
      :text="text"
      :href="href"
      :size="size"
      )
</template>

<script>
import OutsideLink from '@/components/atoms/OutsideLink.vue'

export default {
  components: {
    OutsideLink
  },
  props: {
    text: {
      type: String,
      reqired: true
    },
    href: {
      type: String,
      reqired: true
    },
    type: {
      type: String,
      default: 'default',
      validator(val) {
        return ['default', 'twitter'].includes(val)
      }
    },
    size: String
  },
  computed: {
    propsClassGenerator() {
      const { type } = this

      return {
        [`type-${type}`]: type
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .outside-link-button {
    padding: .35rem 1rem;
    border-radius: 25px;

    &.type-default {
      background-color: #1a1a1a;
      color: white;
    }

    &.type-twitter {
      background-color: #1DA1F2;
      color: white;
    }
  }
</style>
