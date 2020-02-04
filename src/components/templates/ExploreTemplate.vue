<template lang="pug">
  .explore-template
    .explore-template__search-area
      slot(name="search-area")
</template>

<style lang="scss" scoped>
  .explore-template {
    background-color: white;
    
    &__search-area {
      padding: 1rem;
    }
  }
</style>
