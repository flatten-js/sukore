<template lang="pug">
  .masthead(
    :class="propsClassGenerator"
    :style="{ backgroundImage: `url(${url})` }"
    )
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'header',
      validator(val) {
        return ['header', 'thumbnail'].includes(val)
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
  .masthead {
    width: 100%;
    background-repeat: no-repeat;
    background-color: #d1d1d1;

    &.-type-header {
      padding-bottom: 33.3333%;
      background-size: contain;
      background-attachment: fixed;
    }

    &.-type-thumbnail {
      height: 150px;
      background-size: cover;
      background-position: center;
    }
  }
</style>
