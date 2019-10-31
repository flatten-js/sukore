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
