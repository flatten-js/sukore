<template lang="pug">
  thumbnail-box-grid
    template(v-for="media in typeContent")
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

import ThumbnailBoxGrid from '@/components/organisms/ThumbnailBoxGrid.vue'
import ThumbnailBox from '@/components/molecules/ThumbnailBox.vue'

export default {
  components: {
    ThumbnailBoxGrid,
    ThumbnailBox
  },
  props: {
    type: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters([
      'tweetFilter',
      'retweetFilter',
      'noMediaListDuplicate'
    ]),
    typeContent() {
      switch (this.type) {
        case 'tweet':
        return this.tweetFilter
        case 'retweet':
        return this.retweetFilter
      }
    }
  },
  methods: {
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
