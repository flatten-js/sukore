<template lang="pug">
  #app
    router-view
    foot-area
      navigation(
        :items="navs"
        size="large"
        )
</template>

<script>
import FootArea from '@/components/organisms/FootArea.vue'
import Navigation from '@/components/molecules/Navigation.vue'

export default {
  components: {
    FootArea,
    Navigation
  },
  data() {
    return {
      navs: [
        {
          to: '/',
          name: 'home'
        },
        {
          to: '/explore',
          name: 'search'
        },
        {
          to: '/i/likes',
          name: 'like'
        }
      ]
    }
  },
  created() {
    this.$store.dispatch('initialize')
  }
}
</script>

<style scoped>
  #app {
    min-height: 100vh;
    background-color: #f7f7f7;
    overflow-x: hidden;
  }
</style>
