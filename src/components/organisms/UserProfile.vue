<template lang="pug">
  .user-profile
    .user-header-image
      slot(name="header-image")
    .user-profile-body
      .user-profile-icon
        slot(name="user-icon")
      slot(name="user-profile-text")
</template>

<style scoped>
  .user-profile-body {
    padding: 0 1rem 1rem 1rem;
    border-bottom: 1px solid rgba(26, 26, 26, .1);
    box-sizing: border-box;
  }

  .user-profile-icon {
    display: inline-block;
    margin: -35px 0 1rem;
  }
</style>
