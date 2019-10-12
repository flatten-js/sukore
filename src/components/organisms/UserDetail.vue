<template lang="pug">
  .user-detail
    .user-header
      slot(name="header")
    .user-profile
      .user-profile-icon
        slot(name="user-icon")
      .user-profile-body
        slot(name="user-profile-body")
</template>

<style scoped>
  .user-header {
    background-color: rgb(26, 26, 26, .25);
  }

  .user-profile {
    padding: 0 1rem 1rem 1rem;
    box-sizing: border-box;
  }

  .user-profile-icon {
    display: inline-block;
    margin: -35px 0 1rem;
  }
</style>
