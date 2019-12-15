<template lang="pug">
  .image-count-badge
    svg.image-count-badge__icon
      use(xlink:href="/img/icons/symbol-defs.svg#icon-collections")
    .image-count-badge__text
      | {{ number }}
</template>

<script>
export default {
  props: {
    number: {
      type: Number,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
  .image-count-badge {
    display: flex;
    padding: .25rem .5rem;
    border-radius: 25px;
    background-color: rgba(26, 26, 26, .75);
    align-items: center;
    font-size: .75rem;
    color: #fff;

    &__icon {
      width: .75rem;
      height: .75rem;
      margin: 0 .25rem 0 0;
      fill: currentColor;
    }
  }
</style>
