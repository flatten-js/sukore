<template lang="pug">
  .search-layout
    .search-layout__header-area
      slot(name="header-area")
    .search-layout__thumbnail-area
      slot
</template>

<style scoped>
  .search-layout {
    height: 100vh;
    overflow-x: hidden;
    overflow-y: scroll;
  }
</style>
