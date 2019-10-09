<template lang="pug">
  img.vary-image(
    :class="propsClassGenerator"
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
      validator(val) {
        return ['cover', null].includes(val)
      }
    }
  },
  computed: {
    propsClassGenerator() {
      const { fit } = this

      return {
        [`fit-${fit}`]: fit
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .vary-image {
    width: 100%;
    height: 100%;
    border-radius: inherit;

    &.fit-cover {
      object-fit: cover;
    }
  }
</style>
