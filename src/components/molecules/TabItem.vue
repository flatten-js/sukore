<template lang="pug">
  .tab-item(:class="propsClassGenerator")
    v-router-link(
      :to="to"
      :text="text"
      size="small"
      p="1"
      exact
      )
</template>

<script>
import VRouterLink from '@/components/atoms/VRouterLink.vue'

export default {
  components: {
    VRouterLink
  },
  props: {
    to: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: 'default',
      validator(val) {
        return ['default'].includes(val)
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
  .tab-item {
    display: inline-block;

    &.color-default {
      color: rgba(26, 26, 26, .5);

      & > .router-link-active {
        color: rgba(26, 26, 26, 1);
        border-bottom: 3px solid rgba(26, 26, 26, 1);
      }

      & > :not(.router-link-active) {
        border-bottom: 3px solid rgba(26, 26, 26, 0);
      }
    }
  }
</style>
