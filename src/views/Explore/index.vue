<template lang="pug">
  explore-layout
    template(#header-layer)
      head-area
        details-bar(
          :icon-type="iconType"
          content-type="search"
          v-model="inputText"
          :icon="oauth.icon"
          custom-event
          @focus-input-text="focus"
          @click-custom-back="back"
          )
    template(#suggest-layer)
      suggest-area(v-show="opened")
        template(#message)
          text-box(
            v-show="!(history.users.length || history.words.length)"
            type="multi"
            text="アカウント、トピック、キーワードで検索してみましょう"
            align="center"
            )
        template(#history)
          title-card(
            v-show="history.users.length || history.words.length"
            )
            template(#title)
              title-line(
                title="最近の検索"
                size="large"
                option="text"
                text="すべて消去"
                @click-option="clearSearchHistory"
                )
            template(#content)
              template(v-if="history.users.length")
                horizontal-area
                  template(v-for="user in history.users")
                    user-box(
                      :icon="user.icon"
                      :name="user.name"
                      :screen-name="user.screenName"
                      @click-this="searchFromHistory"
                      )
              template(v-for="word in history.words")
                title-line(
                  :title="word"
                  size="small"
                  name="clear"
                  clickable
                  @click-this="searchFromHistory"
                  @click-option="updateSearchHistory"
                  )
</template>

<script>
import { mapGetters } from 'vuex'

import ExploreLayout from '@/components/templates/ExploreLayout.vue'
import HeadArea from '@/components/organisms/HeadArea.vue'
import DetailsBar from '@/components/molecules/DetailsBar.vue'
import SuggestArea from '@/components/organisms/SuggestArea.vue'
import TextBox from '@/components/molecules/TextBox.vue'
import TitleCard from '@/components/organisms/TitleCard.vue'
import TitleLine from '@/components/molecules/TitleLine.vue'
import HorizontalArea from '@/components/organisms/HorizontalArea.vue'
import UserBox from '@/components/molecules/UserBox.vue'

export default {
  components: {
    ExploreLayout,
    HeadArea,
    DetailsBar,
    SuggestArea,
    TextBox,
    TitleCard,
    TitleLine,
    HorizontalArea,
    UserBox
  },
  data() {
    return {
      inputText: '',
      opened: false,
      history: { users: [], words: [] }
    }
  },
  computed: {
    ...mapGetters([
      'oauth'
    ]),
    iconType() {
      return this.opened ? 'default' : 'user'
    }
  },
  created() {
    this.history = JSON.parse(localStorage.getItem('search_history')) || { users: [], words: [] }
  },
  methods: {
    focus() {
      this.opened = true
    },
    back() {
      this.opened = false
    },
    async searchFromHistory(title) {
      if (/^@/.test(title)) {
        await this.$router.push({
          path: `/${title.replace('@', '')}`,
          query: { src: 'recent_search_click' }
        })
        const user = this.history.users.find(user => user.screenName === title)
        this.history = {
          ...this.history,
          users: [user, ...this.history.users].filter((set => {
            return v => !set.has(v.screenName) && set.add(v.screenName)
          })(new Set))
        }
      } else {
        await this.$router.push({ path: `/search/${encodeURIComponent(title)}` })
        this.history = {
          ...this.history,
          words: [...new Set([title, ...this.history.words])]
        }
      }
      localStorage.setItem('search_history', JSON.stringify(this.history))
    },
    clearSearchHistory() {
      this.history = { users: [], words: [] }
      localStorage.setItem('search_history', JSON.stringify(this.history))
    },
    updateSearchHistory(title) {
      this.history = {
        ...this.history,
        words: this.history.words.filter(history => history !== title)
      }
      localStorage.setItem('search_history', JSON.stringify(this.history))
    }
  }
}
</script>

<style lang="scss" scoped>
  /deep/ .head-area {
    &__content {
      border-bottom: none !important;
    }
  }
</style>
