<template lang="pug">
  img.vary-image(
    :class="fitClassGeneration"
    :src="src"
    )
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true
    },
    fit: {
      type: [String, null],
      default: null,
      varidator(val) {
        return ['cover', null].includes(val)
      }
    }
  },
  computed: {
    fitClassGeneration() {
      const { fit } = this
      return fit ? `fit-${fit}` : null
    }
  }
}
</script>

<style lang="scss" scoped>
  .vary-image {
    width: 100%;
    height: 100%;

    &.fit-cover {
      object-fit: cover;
    }
  }
</style>
