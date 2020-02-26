<template lang="pug">
  .pickup-area
    .pickup-area__loading
      slot(name="loading")
    .pickup-area__card
      slot(name="card")
</template>
