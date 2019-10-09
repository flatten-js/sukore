<template lang="pug">
  .vary-background-image(
    :class="propsClassGenerator"
    :style="propsStyleGenerator"
    )
</template>

<script>
export default {
  props: {
    url: [String, null],
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
    propsClassGenerator() {
      const { attachment, size } = this

      return {
        [`background-attachment-${attachment}`]: attachment,
        [`background-size-${size}`]: size
      }
    },
    propsStyleGenerator() {
      const { url } = this

      return {
        backgroundImage: url && `url(${url})`
      }
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
