<template lang="pug">
  explore-layout
    template(#search-area)
      search-area
        search-form(
          v-model="inputText"
          @enter-submit="search"
          @clear-click="clear"
          )
</template>

<script>
import ExploreLayout from '@/components/templates/ExploreLayout.vue'
import SearchArea from '@/components/organisms/SearchArea.vue'
import SearchForm from '@/components/molecules/SearchForm.vue'

export default {
  components: {
    ExploreLayout,
    SearchArea,
    SearchForm
  },
  data() {
    return {
      inputText: ''
    }
  },
  methods: {
    search() {
      const { inputText } = this
      if (!inputText) return

      if (inputText.match(/^@.+?/)) {
        this.$router.push({ path: `/${inputText.replace('@', '')}` })
      } else {
        this.$router.push({ path: `/search/${encodeURIComponent(inputText)}` })
      }
    },
    clear() {
      this.inputText = ''
    }
  }
}
</script>
