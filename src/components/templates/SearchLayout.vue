<template lang="pug">
  .search-layout
    .search-layout__header-layer
      slot(name="header-layer")
    .search-layout__thumbnail-layer
      slot(name="thumbnail-layer")
    .search-layout__update-layer
      slot(name="update-layer")
</template>
