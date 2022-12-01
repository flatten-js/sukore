<template lang="pug">
  section.suggest-area
    .suggest-area__message
      slot(name="message")
    .suggest-area__history
      slot(name="history")
</template>

<style lang="scss" scoped>
  .suggest-area {
    height: calc(100vh - 3.25rem);
    background-color: #F7F7F7;
  }
</style>
