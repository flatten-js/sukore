<template lang="pug">
  section.thumbnail-box-mvp
    .thumbnail-box-mvp__navigation
      slot(name="navigation")
    .thumbnail-box-mvp__loading
      slot(name="loading")
    .thumbnail-box-mvp__content
      slot(name="content")
</template>

<style lang="scss" scoped>
  .thumbnail-box-mvp {
    &__navigation {
      border-bottom: 1px solid rgba(26, 26, 26, .2);
      background-color: #fff;
    }

    &__content {
      position: relative;
    }
  }
</style>
