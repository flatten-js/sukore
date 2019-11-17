<template lang="pug">
  .image-count-badge
    .image-count-badge__icon
      i.material-icons photo_library
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
      margin: 0 .25rem 0 0;
      line-height: 0;
    }
  }

  .material-icons {
    font-size: inherit;
  }
</style>
