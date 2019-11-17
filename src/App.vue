<template lang="pug">
  #app
    router-view
</template>

<script>
export default {
  created() {
    this.$store.dispatch('allFavorite')
  }
}
</script>

<style scoped>
  #app {
    min-height: 100vh;
    background-color: #f7f7f7;
  }
</style>
