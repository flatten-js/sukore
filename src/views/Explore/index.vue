<template lang="pug">
  explore-layout
    template(#header-area)
      header-area
        details-bar(
          :icon-type="test"
          content-type="search"
          v-model="inputText"
          :icon="oauth.icon"
          @focus-input-text="focus"
          @click-custom-back="back"
          custom-event
          )
    template(#suggest-area)
      suggest-area(v-show="opened")
        template(#history)
          title-card(v-show="historys.length")
            template(#title)
              title-line(
                tag="h3"
                title="検索履歴"
                size="large"
                option="text"
                text="すべて消去"
                @click-option-text="clearSearchHistory"
                )
            template(#content)
              template(v-for="history in historys")
                title-line(
                  :title="history"
                  size="small"
                  name="clear"
                  trigger
                  @click-this="searchFromHistory"
                  @click-option-icon="updateSearchHistory"
                  )
</template>

<script>
import { mapGetters } from 'vuex'

import ExploreLayout from '@/components/templates/ExploreLayout.vue'
import HeaderArea from '@/components/organisms/HeaderArea.vue'
import DetailsBar from '@/components/molecules/DetailsBar.vue'
import SuggestArea from '@/components/organisms/SuggestArea.vue'
import TitleCard from '@/components/organisms/TitleCard.vue'
import TitleLine from '@/components/molecules/TitleLine.vue'

export default {
  components: {
    ExploreLayout,
    HeaderArea,
    DetailsBar,
    SuggestArea,
    TitleCard,
    TitleLine
  },
  data() {
    return {
      inputText: '',
      opened: false,
      historys: []
    }
  },
  computed: {
    ...mapGetters([
      'oauth'
    ]),
    test() {
      return this.opened ? 'default' : 'user'
    }
  },
  created() {
    this.historys = JSON.parse(localStorage.getItem('search_historys')) || []
  },
  methods: {
    focus() {
      this.opened = true
    },
    back() {
      this.opened = false
    },
    searchFromHistory(title) {
      if (title.match(/^@.+?/)) {
        this.$router.push({ path: `/${title.replace('@', '')}` })
      } else {
        this.$router.push({ path: `/search/${encodeURIComponent(title)}` })
      }
    },
    clearSearchHistory() {
      this.historys = []
      localStorage.removeItem('search_historys')
    },
    updateSearchHistory(title) {
      this.historys = this.historys.filter(history => history !== title)
      localStorage.setItem('search_historys', JSON.stringify(this.historys))
    }
  }
}
</script>
