<template lang="pug">
  .explore-layout
    .explore-layout__header-area
      slot(name="header-area")
    .explore-layout__suggest-area
      slot(name="suggest-area")
</template>

<style lang="scss" scoped>
  .explore-layout {
    $header-height: 3.25rem;
    position: relative;

    &__header-area {
      height: $header-height;
    }

    &__suggest-area {
      position: absolute;
      width: 100%;
      top: $header-height;
      left: 0;
      max-height: calc(100vh - #{$header-height});
      overflow-x: hidden;
      overflow-y: scroll;
    }
  }
</style>
