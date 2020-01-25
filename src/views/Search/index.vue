<template lang="pug">
  search-template
    thumbnail-area
      template(#masthead)
        //- ToDo: ifを使わず初期化処理
        template(v-if="searchResult.masthead")
          thumbnail-masthead(
            :url="searchResult.masthead.src[0]"
            :id="searchResult.masthead.id"
            :query="query"
            :text="searchResult.masthead.text"
            :image-count="searchResult.masthead.size"
            :state="searchResult.masthead.state"
            @click-like="updateLike"
            )
      template(#contents)
        thumbnail-box-grid
          template(v-for="media in searchResult.body")
            thumbnail-box(
              :key="media.id"
              :id="media.id"
              :src="media.src[0]"
              :screenName="media.screenName"
              :image-count="media.size"
              :thumbnail-size="media.thumbnailSize"
              :state="media.state"
              @like-click="updateLike"
              )
</template>

<script>
import { mapGetters } from 'vuex'
import { LIKE } from '@/apollo/graphql'
import { sharedUpdateLike } from '@/constants/shared'

import SearchTemplate from '@/components/templates/SearchTemplate.vue'
import ThumbnailArea from '@/components/organisms/ThumbnailArea.vue'
import ThumbnailMasthead from '@/components/molecules/ThumbnailMasthead.vue'
import ThumbnailBoxGrid from '@/components/organisms/ThumbnailBoxGrid.vue'
import ThumbnailBox from '@/components/molecules/ThumbnailBox.vue'

export default {
  components: {
    SearchTemplate,
    ThumbnailArea,
    ThumbnailMasthead,
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
      likes: []
    }
  },
  apollo: {
    likes: {
      query: LIKE.GET.ALL,
      async result({ data }, key) {
        if (this.init[key]) return
        this.init = { ...this.init, [key]: true }

        await this.$store.dispatch('tweetsSearch', {
          query: this.query,
          count: 100
        })
        await this.$store.commit('initMediaListState', { likes: data.likes })
      }
    }
  },
  computed: {
    ...mapGetters([
      'noMediaListDuplicate',
      'currentId'
    ]),
    searchResult() {
      const [masthead, ...body] = this.noMediaListDuplicate

      return {
        masthead,
        body
      }
    }
  },
  mounted() {
    this.$el.addEventListener('scroll', this.swaipToRefresh)
  },
  methods: {
    async swaipToRefresh() {
      const el = this.$el,
            elHeight = el.scrollHeight,
            windowHeight = el.clientHeight,
            scrollY = el.scrollTop

      if (elHeight === Math.round(windowHeight + scrollY)) {
        await this.$store.dispatch('tweetsSearch', {
          type: 'add',
          query: this.query,
          count: 200,
          maxId: this.currentId
        })
        await this.$store.commit('initMediaListState', {
          likes: this.likes
        })
      }
    },
    updateLike(id) {
      const media = this.noMediaListDuplicate.find(media => media.id === id)
      sharedUpdateLike(this.$store, this.$apollo, media)
    }
  }
}
</script>
