<template lang="pug">
  .user-template
    .user-template__header-area
      slot(name="header-area")
    .user-template__user-details-catch
      slot(name="user-details-catch")
    .user-template__thumbnail-box-area
      slot(name="thumbnail-box-area")
</template>
