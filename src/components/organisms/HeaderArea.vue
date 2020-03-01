<template lang="pug">
  header.header-area
    .header-area__content
      slot
</template>

<style lang="scss" scoped>
  .header-area {
    height: 3.25rem;

    &__content {
      position: fixed;
      width: 100%;
      top: 0;
      background-color: white;
      border-bottom: 1px solid #dfdfdf;
      z-index: 10;
    }
  }
</style>
