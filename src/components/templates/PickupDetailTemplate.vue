<template lang="pug">
  .pickup-detail-template
    .pickup-detail-template__photo-zoomable-content
      slot(name="photo-zoomable-content")
    .pickup-detail-template__image-details-card
      slot(name="image-details-card")
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
