<template lang="pug">
  explore-layout
    template(#header-area)
      header-area
        details-bar(
          icon-type="user"
          content-type="search"
          v-model="inputText"
          :icon="oauth.icon"
          )
</template>

<script>
import { mapGetters } from 'vuex'

import ExploreLayout from '@/components/templates/ExploreLayout.vue'
import HeaderArea from '@/components/organisms/HeaderArea.vue'
import DetailsBar from '@/components/molecules/DetailsBar.vue'

export default {
  components: {
    ExploreLayout,
    HeaderArea,
    DetailsBar
  },
  data() {
    return {
      inputText: ''
    }
  },
  computed: {
    ...mapGetters([
      'oauth'
    ])
  }
}
</script>
