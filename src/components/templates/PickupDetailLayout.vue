<template lang="pug">
  .pickup-detail-layout
    .pickup-detail-layout__photo-zoomable-content
      slot(name="photo-zoomable-content")
    .pickup-detail-layout__pickup-card
      slot(name="pickup-card")
</template>

<style lang="scss" scoped>
  .pickup-detail-layout {
    &__photo-zoomable-content {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1000;
    }
  }
</style>
