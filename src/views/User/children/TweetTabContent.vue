<template lang="pug">
  thumbnail-box-grid
    template(v-for="media in tweetFilter")
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
import { shareUpdateLike } from '@/apollo/graphql/used/shares'

import ThumbnailBoxGrid from '@/components/organisms/ThumbnailBoxGrid.vue'
import ThumbnailBox from '@/components/molecules/ThumbnailBox.vue'

export default {
  components: {
    ThumbnailBoxGrid,
    ThumbnailBox
  },
  computed: {
    ...mapGetters([
      'oauth',
      'tweetFilter'
    ])
  },
  methods: {
    updateLike(id) {
      const media = this.tweetFilter.find(media => media.id === id)
      shareUpdateLike(this.$store, this.$apollo, this.oauth.iid, media)
    }
  }
}
</script>
