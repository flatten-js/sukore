<template lang="pug">
  .block-heading {{ text }}
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
  .block-heading {
    font-size: 1.125rem;
    font-weight: bold;
  }
</style>
