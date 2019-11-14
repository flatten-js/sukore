<template lang="pug" functional>
  .multi-line-heading {{ props.text }}
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
  .multi-line-heading {
    font-size: 1.125rem;
    font-weight: bold;
    color: #1a1a1a;
  }
</style>
