<template lang="pug">
  .user-detail-bar
    .user-detail-icon
      slot(name="user-icon")
    .user-detail-name
      slot(name="user-name")
    .user-detail-twitter-link
      slot(name="user-twitter-link")
</template>

<style scoped>
  .user-detail-bar {
    display: flex;
    align-items: center;
    padding: .5rem 1rem;
    box-sizing: border-box;
  }

  .user-detail-icon {
    margin-right: .5rem;
  }

  .user-detail-name {
    flex: 1 1 100%;
    margin-right: 1rem;
    overflow: hidden;
  }
</style>
