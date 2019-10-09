<template lang="pug">
  .pickup-template
    section.user-detail-section
      slot(name="user-detail")
    section.thumbnail-box-section
      slot(name="thumbnail-box")
</template>
