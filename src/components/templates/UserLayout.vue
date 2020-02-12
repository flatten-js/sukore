<template lang="pug">
  .user-layout
    .user-layout__header-area
      slot(name="header-area")
    .user-layout__user-details-area
      slot(name="user-details-area")
    .user-layout__thumbnail-box-area
      slot(name="thumbnail-box-area")
</template>
