<template lang="pug">
  .user-layout
    .user-layout__header-area
      slot(name="header-area")
    .user-layout__profile-area
      slot(name="profile-area")
    .user-layout__thumbnail-box-area
      slot(name="thumbnail-box-area")
    .user-layout__update-area
      slot(name="update-area")
    .user-layout-options-area
      .user-layout-options-area__menu-popup
        slot(name="option-menu-popup")
</template>

<style lang="scss" scoped>
  .user-layout-options-area {
    position: fixed;
    width: 100%;
    height: auto;
    top: 0;
    left: 0;
    z-index: 9999;
  }
</style>
