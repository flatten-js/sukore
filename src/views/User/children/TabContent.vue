<template lang="pug">
  thumbnail-box-grid
    template(v-for="media in typeContent")
      thumbnail-box(
        :key="media.id"
        :id="media.id"
        :type="media.entities.type"
        :src="media.entities.thumbnail.src"
        :screenName="media.screenName"
        :image-count="media.size"
        :thumbnail-size="media.entities.thumbnail.size"
        :state="media.state"
        @clickLikeIcon="updateLike"
        )
</template>

<script>
import { mapGetters } from 'vuex'
import { FAVORITE, LIKE } from '@/constants/graphql'

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
    updateLike(id) {
      const media = this.noMediaListDuplicate.find(media => media.id === id)

      this.$store.commit('updateMediaListState', { tid: media.id })

      if (media.state) {
        this.$apollo.mutate({
          mutation: LIKE.REMOVE,
          variables: {
            tid: media.id
          },
          update: (store) => {
            const data = store.readQuery({ query: LIKE.ALL })
            data.likes = data.likes.filter(like => like.tid !== media.id)
            store.writeQuery({ query: LIKE.ALL, data })
          },
          optimisticResponse: {
            __typename: 'Mutation',
            deleteManyLikes: {
              __typename: 'Like',
              count: 0
            }
          }
        })
        .catch(() => {
          this.$store.commit('updateMediaListState', { tid: media.id })
        })
      } else {
        this.$apollo.mutate({
          mutation: LIKE.ADD,
          variables: {
            tid: media.id
          },
          update: (store, { data: { createLike } }) => {
            const data = store.readQuery({ query: LIKE.ALL })
            data.likes.push({
              __typename: createLike.__typename,
              tid: createLike.tid
            })
            store.writeQuery({ query: LIKE.ALL, data })
          },
          optimisticResponse: {
            __typename: 'Mutation',
            createLike: {
              __typename: 'Like',
              tid: media.id
            }
          }
        })
        .catch(() => {
          this.$store.commit('updateMediaListState', { tid: media.id })
        })
      }
    }
  }
}
</script>
