<template lang="pug">
  .text-badge
    template(v-if="name")
      svg.text-badge__icon
        use(:xlink:href="name | convertSymbolPath")
    .text-badge__text
      | {{ text }}
</template>

<script>
export default {
  filters: {
    convertSymbolPath(name) {
      return `/img/icons/symbol-defs.svg#icon-${name}`
    }
  },
  props: {
    name: String,
    text: {
      type: [String, Number],
      reqired: true
    }
  }
}
</script>

<style lang="scss" scoped>
  .text-badge {
    display: flex;
    padding: .25rem .5rem;
    border-radius: 25px;
    background-color: rgba(26, 26, 26, .75);
    align-items: center;
    font-size: .75rem;
    color: #fff;
    box-shadow: 0 2px 5px rgba(26, 26, 26, 0.26);

    &__icon {
      width: .75rem;
      height: .75rem;
      margin: 0 .25rem 0 0;
      fill: currentColor;
    }
  }
</style>
