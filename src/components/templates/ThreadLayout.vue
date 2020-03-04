<template lang="pug">
  .thread-layout
    .thread-layout__header-layer
      slot(name="header-layer")
    .thread-layout__pickup-layer
      slot(name="pickup-layer")
    .thread-layout__photo-zoomable-layer
      slot(name="photo-zoomable-layer")
</template>

<style lang="scss" scoped>
  .thread-layout {
    &__photo-zoomable-layer {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1000;
    }
  }
</style>
