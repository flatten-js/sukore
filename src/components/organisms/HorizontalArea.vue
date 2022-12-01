<template lang="pug">
  .horizontal-area
    slot
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
  .horizontal-area {
    display: flex;
    padding: 1rem;
    align-items: center;
    border-bottom: 1px solid #dfdfdf;
    overflow-x: scroll;
    overflow-y: hidden;
  }
</style>
