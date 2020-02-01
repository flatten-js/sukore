<template lang="pug">
  .loader-box
    loader
</template>

<script>
import Loader from '@/components/atoms/Loader.vue'

export default {
  components: {
    Loader
  }
}
</script>

<style scoped>
  .loader-box {
    display: flex;
    padding: 1.5rem 0;
    align-items: center;
    justify-content: center;
  }
</style>
