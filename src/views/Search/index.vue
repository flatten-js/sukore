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
            @clickFavorite="clickFavorite"
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
              @clickFavorite="clickFavorite"
              )
</template>

<script>
import { mapGetters } from 'vuex'
import { FAVORITE } from '@/constants/graphql'

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
      favorites: []
    }
  },
  apollo: {
    favorites: FAVORITE.ALL
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
  async mounted() {
    this.$el.addEventListener('scroll', this.swaipToRefresh)

    await this.$store.dispatch('tweetsSearch', {
      query: this.query,
      count: 100
    })
    await this.$store.commit('initMediaListState', {
      favorites: this.favorites
    })
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
          favorites: this.favorites
        })
      }
    },
    clickFavorite(id) {
      const media = this.noMediaListDuplicate.find(media => media.id === id)

      this.$store.commit('updateMediaListState', { tid: media.id })

      if (media.state) {
        this.$apollo.mutate({
          mutation: FAVORITE.REMOVE,
          variables: {
            tid: media.id
          },
          update: (store) => {
            const data = store.readQuery({ query: FAVORITE.ALL })
            data.favorites = data.favorites.filter(fav => fav.tid !== media.id)
            store.writeQuery({ query: FAVORITE.ALL, data })
          },
          optimisticResponse: {
            __typename: 'Mutation',
            deleteManyFavorites: {
              __typename: 'Favorite',
              count: 0
            }
          }
        })
        .catch(err => {
          this.$store.commit('updateMediaListState', { tid: media.id })
        })
      } else {
        this.$apollo.mutate({
          mutation: FAVORITE.ADD,
          variables: {
            tid: media.id
          },
          update: (store, { data: { createFavorite } }) => {
            const data = store.readQuery({ query: FAVORITE.ALL })
            data.favorites.push({
              __typename: createFavorite.__typename,
              tid: createFavorite.tid
            })
            store.writeQuery({ query: FAVORITE.ALL, data })
          },
          optimisticResponse: {
            __typename: 'Mutation',
            createFavorite: {
              __typename: 'Favorite',
              tid: media.id
            }
          }
        })
        .catch(err => {
          this.$store.commit('updateMediaListState', { tid: media.id })
        })
      }
    }
  }
}
</script>
