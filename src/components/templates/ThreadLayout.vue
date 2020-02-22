<template lang="pug">
  .thread-layout
    .thread-layout__header-area
      slot(name="header-area")
    .thread-layout__pickup-card
      slot(name="pickup-card")
    .thread-layout__photo-zoomable-content
      slot(name="photo-zoomable-content")
</template>

<style lang="scss" scoped>
  .thread-layout {
    &__photo-zoomable-content {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1000;
    }
  }
</style>
