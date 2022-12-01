<template lang="pug">
  .user-layout
    .user-layout__header-layer
      slot(name="header-layer")
    .user-layout__profile-layer
      slot(name="profile-layer")
    .user-layout__thumbnail-box-layer
      slot(name="thumbnail-box-layer")
    .user-layout__update-layer
      slot(name="update-layer")
    .user-layout__popup-layer
      slot(name="popup-layer")
</template>

<style lang="scss" scoped>
  .user-layout {
    &__popup-layer {
      position: fixed;
      width: 100%;
      height: auto;
      top: 0;
      left: 0;
      z-index: 9999;
    }
  }
</style>
