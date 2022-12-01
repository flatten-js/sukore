<template lang="pug">
  .pickup-card
    .pickup-card__head
      slot(name="head")
    figure.pickup-card__body
      slot(name="media")
      figcaption.pickup-card-body__details
        slot(name="details")
</template>

<style lang="scss" scoped>
  .pickup-card {
    background-color: white;

    &__body {
      margin: 0;
      border-bottom: 1px solid #dfdfdf;
    }
  }
</style>
