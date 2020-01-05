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
    width: 100vw;
    height: 100vh;
    background-color: white;

    &__return {
      position: absolute;
      top: 1rem;
      left: 1rem;
      z-index: 2;
    }

    &__photo {
      width: 100%;
      height: 100%;
    }

    &__zoom-controls {
      position: absolute;
      width: 100%;
      left: 0;
      bottom: 0;
      z-index: 2;
    }
  }
</style>
