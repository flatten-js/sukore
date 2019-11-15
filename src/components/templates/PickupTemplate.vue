<template lang="pug">
  .pickup-template
    .pickup-template__user-details-catch
      slot(name="user-details-catch")
    .pickup-template__thumbnail-box-area
      slot(name="thumbnail-box-area")
</template>

<style scoped>
  .pickup-template {
    min-height: 100vh;
    background-color: #f1f1f1;
  }
</style>
