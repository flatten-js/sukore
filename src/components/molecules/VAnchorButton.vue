<template lang="pug">
  .v-anchor-button(:class="propsClassGenerator")
    v-anchor(
      :text="text"
      :href="href"
      :size="fontSize"
      )
</template>

<script>
import VAnchor from '@/components/atoms/VAnchor.vue'

export default {
  components: {
    VAnchor
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
    fontSize: String,
    size: {
      type: String,
      default: 'default',
      validator(val) {
        return ['default', 'large'].includes(val)
      }
    }
  },
  computed: {
    propsClassGenerator() {
      const { type, size } = this

      return {
        [`type-${type}`]: type,
        [`size-${size}`]: size
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .v-anchor-button {
    border-radius: 25px;

    &.type-default {
      background-color: #1a1a1a;
      color: white;
    }

    &.type-twitter {
      background-color: #1DA1F2;
      color: white;
    }

    &.size-default {
      padding: .35rem 1rem;
    }

    &.size-large {
      padding: .35rem 2.5rem;
    }
  }
</style>
