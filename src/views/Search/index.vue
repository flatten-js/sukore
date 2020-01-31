<template lang="pug">
  search-template
    thumbnail-area
      template(#masthead)
        //- ToDo: ifを使わず初期化処理
        template(v-if="searchMedia.masthead")
          thumbnail-masthead(
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
      query: LIKE.ALL,
      variables() {
        return {
          iid: this.oauth.iid
        }
      },
      async result({ data }, key) {
        if (this.init[key]) return
        this.init = { ...this.init, [key]: true }

        await this.$nextTick()
        await this.initTweetMediaLisDatat(this.query, 100, data.likes)
      }
    }
  },
  computed: {
    ...mapGetters([
      'oauth',
      'noMediaListDuplicate',
      'currentId'
    ]),
    searchMedia() {
      const [masthead, ...body] = this.noMediaListDuplicate

      return {
        masthead,
        body
      }
    }
  },
  created() {
    this.$store.commit('initMediaList')
  },
  mounted() {
    this.$el.addEventListener('scroll', this.swaipToRefresh)
  },
  methods: {
    async initTweetMediaLisDatat(query, count, likes) {
      await this.$store.dispatch('tweetsSearch', { query, count })
      await this.$store.commit('initMediaListState', { likes })
    },
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
      shareUpdateLike(this.$store, this.$apollo, this.oauth.iid, media)
    }
  }
}
</script>
