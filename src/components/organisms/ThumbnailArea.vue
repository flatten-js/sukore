<template lang="pug">
  .thumbnail-area
    .thumbnail-area__masthead
      slot(name="masthead")
    .thumbnail-area__contents
      slot(name="contents")
</template>
