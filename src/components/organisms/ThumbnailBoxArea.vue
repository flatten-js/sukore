<template lang="pug">
  section.thumbnail-box-area
    .thumbnail-box-area__navigation
      slot(name="navigation")
    .thumbnail-box-area__contents
      slot(name="contents")
</template>

<style lang="scss" scoped>
  .thumbnail-box-area {
    &__navigation {
      border-bottom: .5px solid rgba(26, 26, 26, .2);
      background-color: #fff;
    }
  }
</style>
