<template lang="pug">
  section.suggest-area
    .suggest-area__history
      slot(name="history")
</template>

<style lang="scss" scoped>
  .suggest-area {
    height: calc(100vh - 3.25rem);
    background-color: #f7f7f7;
  }
</style>
