<template lang="pug">
  .search-layout
    .search-layout__header-area
      slot(name="header-area")
    .search-layout__thumbnail-area
      slot(name="thumbnail-area")
    .search-layout__update-area
      slot(name="update-area")
</template>
