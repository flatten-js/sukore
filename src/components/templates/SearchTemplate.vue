<template lang="pug">
  .search-template
    .search-template__thumbnail-area
      slot
</template>

<style scoped>
  .search-template {
    height: 100vh;
    overflow-x: hidden;
    overflow-y: scroll;
  }
</style>
