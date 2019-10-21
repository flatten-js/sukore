<template lang="pug">
  .pickup-detail-template
    section.user-detail-bar-section
      slot(name="user-detail-bar")
    section.thumbnail-detail-section
      slot(name="thumbnail-detail")
</template>

<style scoped>
  .user-detail-bar-section, .thumbnail-detail-section {
    border-bottom: 1px solid rgba(26, 26, 26, .2);
  }
</style>
