<template lang="pug">
  lazy-component.relative-box-image
    img.relative-box-image__body(
      :src="src"
      )
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
  .relative-box-image {
    position: relative;

    &::before {
      content: "";
      display: block;
      padding: 100% 0 0;
    }

    &__body {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      object-fit: cover;
    }
  }
</style>
