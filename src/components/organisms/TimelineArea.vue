<template lang="pug">
  .timeline-area
    .timeline-area__loading
      slot(name="loading")
    .timeline-area__stream
      slot(name="stream")
</template>
