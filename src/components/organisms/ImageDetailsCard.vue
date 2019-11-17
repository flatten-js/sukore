<template lang="pug">
  section.image-details-card
    .image-details-card__head
      slot(name="head")
    .image-details-card__body
      slot(name="body")
</template>

<style lang="scss" scoped>
  .image-details-card {
    background-color: #fff;
    
    %common-style {
      border-bottom: 1px solid rgba(26, 26, 26, .2);
    }

    &__head {
      @extend %common-style;
    }

    &__body {
      @extend %common-style;
    }
  }
</style>
