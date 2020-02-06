<template lang="pug">
  .pickup-detail-template
    .pickup-detail-template__photo-zoomable-content
      slot(name="photo-zoomable-content")
    .pickup-detail-template__pickup-card
      slot(name="pickup-card")
</template>

<style lang="scss" scoped>
  .pickup-detail-template {
    &__photo-zoomable-content {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1000;
    }
  }
</style>
