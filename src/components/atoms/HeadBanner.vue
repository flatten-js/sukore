<template lang="pug">
  .head-banner(
    :class="propsClassGenerator"
    :style="{ backgroundImage: `url(${url})` }"
    )
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'default',
      validator(val) {
        return ['default', 'thumbnail'].includes(val)
      }
    },
    url: [String, null]
  },
  computed: {
    propsClassGenerator() {
      const { type } = this

      return {
        [`-type-${type}`]: type
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .head-banner {
    width: 100%;
    background-repeat: no-repeat;
    background-color: #eee;

    &.-type-default {
      padding-bottom: 33.3333%;
      background-size: cover;
    }

    &.-type-thumbnail {
      height: 150px;
      background-size: cover;
      background-position: center;
    }
  }
</style>
