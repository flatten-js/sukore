<template lang="pug">
  section.thumbnail-area
    .thumbnail-area__loading
      slot(name="loading")
    .thumbnail-area__masthead
      slot(name="masthead")
    .thumbnail-area__contents
      slot(name="contents")
</template>
