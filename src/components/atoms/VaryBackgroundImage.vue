<template lang="pug">
  .vary-background-image(
    :class="[attachmentClassGenerator, sizeClassGenerator]"
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
    },
    size: {
      type: String,
      default: 'auto',
      validator(val) {
        return ['auto', 'cover', 'contain', 'custom'].includes(val)
      }
    }
  },
  computed: {
    attachmentClassGenerator() {
      const { attachment } = this
      return attachment ? `background-attachment-${attachment}` : null
    },
    sizeClassGenerator() {
      const { size } = this
      return `background-size-${size}`
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

    &.background-size-auto {
      background-size: auto;
    }

    &.background-size-cover {
      background-size: cover;
    }

    &.background-size-contain {
      background-size: contain;
    }

    &.background-size-custom {
      background-size: inherit;
    }
  }
</style>
