<template lang="pug">
  section.popup
    .popup__content
      slot(name="content")
</template>

<style lang="scss" scoped>
  .popup {
    position: relative;
    height: 100vh;
    background-color: rgba(26, 26, 26, .5);

    &__content {
      position: absolute;
      width: 100%;
      bottom: 0;
      left: 0;
    }
  }
</style>
