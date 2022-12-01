<template lang="pug">
  .explore-layout
    .explore-layout__header-layer
      slot(name="header-layer")
    .explore-layout__suggest-layer
      slot(name="suggest-layer")
</template>

<style lang="scss" scoped>
  .explore-layout {
    $header-height: 3.25rem;

    &__header-layer {
      height: $header-height;
    }

    &__suggest-layer {
      position: fixed;
      width: 100%;
      top: $header-height;
      left: 0;
      max-height: calc(100vh - #{$header-height});
      overflow-x: hidden;
      overflow-y: scroll;
    }
  }
</style>
