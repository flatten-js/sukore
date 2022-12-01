<template lang="pug">
  div.foot-area
    .foot-area__content
      slot
</template>

<style lang="scss" scoped>
  .foot-area {
    height: 3.25rem;

    &__content {
      position: fixed;
      width: 100%;
      bottom: 0;
      background-color: white;
      border-top: 1px solid #dfdfdf;
      z-index: 10;
    }
  }
</style>
