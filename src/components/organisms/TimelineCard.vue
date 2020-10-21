<template lang="pug">
  .timeline-card
    .timeline-card__head
      slot(name="head")
    figure.timeline-card__body
      slot(name="media")
      figcaption.timeline-card-body__details
        slot(name="details")
</template>

<style lang="scss" scoped>
  .timeline-card {
    background-color: white;

    &__head {
      border-top: 1px solid #dfdfdf;
    }

    &__body {
      margin: 0;
    }
  }
</style>
