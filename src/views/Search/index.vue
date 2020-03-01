<template lang="pug">
  search-layout
    template(#header-area)
      header-area
        details-bar(
          content-type="search"
          v-model="inputText"
          )
    thumbnail-area
      template(#loading)
        template(v-if="loading.likes")
          absolute-territory
      template(#masthead)
        //- ToDo: ifを使わず初期化処理
        template(v-if="searchMedia.masthead")
          thumbnail-head(
            :id="searchMedia.masthead.id"
            :url="searchMedia.masthead.entities.thumbnail.src"
            :screenName="searchMedia.masthead.screenName"
            :query="query"
            :text="searchMedia.masthead.text"
            :image-count="searchMedia.masthead.entities.length"
            :state="searchMedia.masthead.state"
            @like-click="updateLike"
            )
      template(#contents)
        thumbnail-box-grid
          template(v-for="media in searchMedia.body")
            thumbnail-box(
              :key="media.id"
              :id="media.id"
              :type="media.entities.type"
              :src="media.entities.thumbnail.src"
              :screenName="media.screenName"
              :image-count="media.entities.length"
              :thumbnail-size="media.entities.thumbnail.size"
              :state="media.state"
              @like-click="updateLike"
              )
</template>

<script>
import { mapGetters } from 'vuex'
import { LIKE } from '@/apollo/graphql'
import { shareUpdateLike } from '@/apollo/graphql/used/shares'

import SearchLayout from '@/components/templates/SearchLayout.vue'
import HeaderArea from '@/components/organisms/HeaderArea.vue'
import DetailsBar from '@/components/molecules/DetailsBar.vue'
import AbsoluteTerritory from '@/components/molecules/AbsoluteTerritory.vue'
import ThumbnailArea from '@/components/organisms/ThumbnailArea.vue'
import ThumbnailHead from '@/components/molecules/ThumbnailHead.vue'
import ThumbnailBoxGrid from '@/components/organisms/ThumbnailBoxGrid.vue'
import ThumbnailBox from '@/components/molecules/ThumbnailBox.vue'

export default {
  components: {
    SearchLayout,
    HeaderArea,
    DetailsBar,
    AbsoluteTerritory,
    ThumbnailArea,
    ThumbnailHead,
    ThumbnailBoxGrid,
    ThumbnailBox
  },
  props: {
    query: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      init: {
        likes: false
      },
      loading: {
        likes: true
      },
      likes: [],
      inputText: ''
    }
  },
  apollo: {
    likes: {
      query: LIKE.ALL,
      variables() {
        return {
          iid: this.oauth.iid
        }
      },
      skip() {
        return this.init.likes
      },
      async result({ data }, key) {
        this.queryInitReady(key)
        await this.initSearchMediaData({
          query: this.query,
          count: 100,
          likes: data.likes
        })
        this.queryLoadingReady(key)
      }
    }
  },
  computed: {
    ...mapGetters([
      'oauth',
      'noMediaListDuplicate'
    ]),
    searchMedia() {
      const [masthead, ...body] = this.noMediaListDuplicate

      return {
        masthead,
        body
      }
    }
  },
  watch: {
    async '$route.params.query'(to, from) {
      if (to === from) return

      this.queryLoadingReady('likes')
      this.$store.commit('initMedia')
      await this.initSearchMediaData({
        query: to,
        count: 100,
        likes: this.likes
      })
      this.queryLoadingReady('likes')
    }
  },
  created() {
    this.inputText = this.query
    this.$store.commit('initMedia')
  },
  mounted() {
    this.$el.addEventListener('scroll', this.swaipToRefresh)
  },
  methods: {
    async initSearchMediaData({ type, query, count, likes }) {
      await this.$store.dispatch('multiTweetSearch', { type, query, count })
      await this.$store.commit('initMediaListState', { likes })
    },
    queryInitReady(key) {
      this.init = { [key]: !this.init[key] }
    },
    queryLoadingReady(key) {
      this.loading = { [key]: !this.loading[key] }
    },
    async swaipToRefresh() {
      const el = this.$el,
            elHeight = el.scrollHeight,
            windowHeight = el.clientHeight,
            scrollY = el.scrollTop

      if (elHeight === Math.round(windowHeight + scrollY)) {
        this.initSearchMediaData({
          type: 'update',
          query: this.query,
          count: 100,
          likes: this.likes
        })
      }
    },
    updateLike(id) {
      const media = this.noMediaListDuplicate.find(media => media.id === id)
      shareUpdateLike(this.$store, this.$apollo, this.oauth.iid, media)
    }
  }
}
</script>
