<template lang="pug">
  search-layout
    template(#header-area)
      header-area
        details-bar(
          content-type="search"
          v-model="inputText"
          )
    template(#thumbnail-area)
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
    template(#update-area)
      update-area(ref="updateArea")
        template(v-if="!loading.likes")
          absolute-territory
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
import UpdateArea from '@/components/organisms/UpdateArea.vue'

export default {
  components: {
    SearchLayout,
    HeaderArea,
    DetailsBar,
    AbsoluteTerritory,
    ThumbnailArea,
    ThumbnailHead,
    ThumbnailBoxGrid,
    ThumbnailBox,
    UpdateArea
  },
  props: {
    query: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      el: {
        height: 0
      },
      init: {
        likes: false
      },
      loading: {
        likes: true
      },
      offset: {
        updateArea: 0
      },
      likes: [],
      inputText: '',
      updating: false
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
      result({ data }, key) {
        this.queryInitReady(key)
        this.addSearchMediaDataSet({
          query: this.query,
          count: 100,
          likes: data.likes,
          key
        })
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
    '$route.params.query': {
      handler: function(to, from) {
        if (to === from) return

        this.inputText = to
        this.$store.commit('initMedia')

        if (from) {
          document.activeElement.blur()
          this.queryLoadingReady('likes')
          this.addSearchMediaDataSet({
            query: to,
            count: 100,
            likes: this.likes,
            key: 'likes'
          })
        }
      },
      immediate: true
    },
    'el.height'() {
      this.offset = { updateArea: this.$refs.updateArea.$el.offsetTop }
    }
  },
  beforeMount() {
    window.addEventListener('scroll', this.swaipToRefresh, { passive: true })
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.swaipToRefresh, { passive: true })
  },
  methods: {
    async initSearchMediaData({ type, query, count, likes }) {
      await this.$store.dispatch('multiTweetSearch', { type, query, count })
      await this.$store.commit('initMediaListState', { likes })
      await this.fetchElHeight()
    },
    async addSearchMediaDataSet({ query, count, likes, key }) {
      await this.initSearchMediaData({ query, count, likes })
      await this.queryLoadingReady(key)
    },
    queryInitReady(key) {
      this.init = { [key]: !this.init[key] }
    },
    queryLoadingReady(key) {
      this.loading = { [key]: !this.loading[key] }
    },
    fetchElHeight() {
      this.el = { height: this.$el.clientHeight }
    },
    async swaipToRefresh() {
      let ticking = false

      const update = async () => {
        ticking = false

        if (this.loading.likes) return
        if (this.updating) return

        if (window.pageYOffset + window.innerHeight > this.offset.updateArea - 250) {
          this.updating = true
          await this.initSearchMediaData({
            type: 'update',
            query: this.query,
            count: 100,
            likes: this.likes
          })
          this.updating = false
        }
      }

      if (!ticking) {
        requestAnimationFrame(update)
        ticking = true
      }
    },
    updateLike(id) {
      const media = this.noMediaListDuplicate.find(media => media.id === id)
      shareUpdateLike(this.$store, this.$apollo, this.oauth.iid, media)
    }
  }
}
</script>
