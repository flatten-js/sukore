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
            @clickLikeIcon="updateLike"
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
              @clickLikeIcon="updateLike"
              )
</template>

<script>
import { mapGetters } from 'vuex'
import { LIKE } from '@/constants/graphql'

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
      async result({ data }, key) {
        if (this.init[key]) return
        this.init = { ...this.init, [key]: true }

        await this.$store.dispatch('tweetsSearch', {
          query: this.query,
          count: 100
        })
        await this.$store.commit('initMediaListState', { likes: this.likes })
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
