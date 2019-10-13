<template lang="pug">
  .pickup-template
    section.user-detail-section
      slot(name="user-detail")
    section.nav-tabs-section
      slot(name="nav-tabs")
      .tabs-content
        slot(name="tabs-content")
</template>
