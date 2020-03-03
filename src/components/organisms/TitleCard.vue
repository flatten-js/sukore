<template lang="pug">
  section.title-card
    .title-card__title
      slot(name="title")
    .title-card__content
      slot(name="content")
</template>

<style lang="scss" scoped>
  .title-card {
    background-color: white;
    border-bottom: 1px solid #dfdfdf;
  }
</style>
