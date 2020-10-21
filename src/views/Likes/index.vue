<template lang="pug">
  likes-layout
    template(#thumbnail-box-layer)
      thumbnail-box-grid
        template(v-for="media in uniqMediaList")
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

import LikesLayout from '@/components/templates/LikesLayout.vue'
import ThumbnailBoxGrid from '@/components/organisms/ThumbnailBoxGrid.vue'
import ThumbnailBox from '@/components/molecules/ThumbnailBox.vue'

export default {
  components: {
    LikesLayout,
    ThumbnailBoxGrid,
    ThumbnailBox
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
      skip() {
        return this.init.likes
      },
      async result({ data }, key) {
        this.init = { ...this.init, [key]: true }
        const mediaListFormat = data.likes.map(like => like.data)

        await this.$nextTick()
        await this.initLikesMediaData(mediaListFormat, data.likes)
      }
    }
  },
  computed: {
    ...mapGetters([
      'oauth',
      'uniqMediaList'
    ])
  },
  created() {
    this.$store.commit('initMedia')
  },
  methods: {
    async initLikesMediaData(mediaList, likes) {
      await this.$store.commit('addMedia', { mediaList })
      await this.$store.commit('initMediaListState', { likes })
    },
    updateLike(id) {
      const media = this.uniqMediaList.find(media => media.id === id)
      shareUpdateLike(this.$store, this.$apollo, this.oauth.iid, media)
    }
  }
}
</script>
