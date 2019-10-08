<template lang="pug">
  .vary-background-image(
    :class="attachmentClassGenerator"
    :style="{ backgroundImage: `url(${url})` }"
    )
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      required: true
    },
    attachment: {
      type: [String, null],
      default: null,
      validator(val) {
        return ['fixed'].includes(val)
      }
    }
  },
  computed: {
    attachmentClassGenerator() {
      const { attachment } = this
      return attachment ? `background-attachment-${attachment}` : null
    }
  }
}
</script>

<style lang="scss" scoped>
  .vary-background-image {
    width: 100%;
    height: 100%;

    &.background-attachment-fixed {
      background-attachment: fixed;
    }
  }
</style>
