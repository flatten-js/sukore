<template lang="pug">
  .photo-zoomable-area
    .photo-zoomable-area__return
      slot(name="return")
    .photo-zoomable-area__photo
      slot(name="photo")
    .photo-zoomable-area__zoom-controls
      slot(name="controls")
</template>

<style lang="scss" scoped>
  .photo-zoomable-area {
    position: relative;

    &__return {
      position: absolute;
      top: 1rem;
      left: 1rem;
    }

    &__zoom-controls {
      position: absolute;
      left: 0;
      bottom: 0;
    }
  }
</style>
