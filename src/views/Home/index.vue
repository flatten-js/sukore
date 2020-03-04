<template lang="pug">
  home-layout
    template(#timeline-layer)
      timeline-area
        template(#loading)
          template(v-if="loading.likes")
            absolute-territory
        template(#stream)
          template(v-for="media in noMediaListDuplicate")
            timeline-card
              template(#head)
                details-bar(
                  icon-type="user"
                  content-type="user"
                  :icon="media.icon"
                  :name="media.name"
                  :screen-name="media.screenName"
                  )
              template(#media)
                card-thumbnail-box(
                  :type="media.entities.type"
                  :id="media.id"
                  :screen-name="media.screenName"
                  :src="media.entities.src"
                  :length="media.entities.length"
                  )
              template(#details)
                card-details(
                  :id="media.id"
                  :comment="media.text"
                  :url-list="media.urlList"
                  :created="media.created"
                  :state="media.state"
                  @like-click="updateLike"
                  )
</template>

<script>
import { mapGetters } from 'vuex'
import { LIKE } from '@/apollo/graphql'
import { shareUpdateLike } from '@/apollo/graphql/used/shares'

import HomeLayout from '@/components/templates/HomeLayout.vue'
import TimelineArea from '@/components/organisms/TimelineArea.vue'
import AbsoluteTerritory from '@/components/molecules/AbsoluteTerritory.vue'
import TimelineCard from '@/components/organisms/TimelineCard.vue'
import DetailsBar from '@/components/molecules/DetailsBar.vue'
import CardThumbnailBox from '@/components/molecules/CardThumbnailBox.vue'
import CardDetails from '@/components/molecules/CardDetails.vue'

export default {
  components: {
    HomeLayout,
    TimelineArea,
    AbsoluteTerritory,
    TimelineCard,
    CardThumbnailBox,
    DetailsBar,
    CardDetails
  },
  data() {
    return {
      lifecycle: {
        created: true
      },
      init: {
        likes: false
      },
      loading: {
        likes: true
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
        return this.lifecycle.created || this.init.likes
      },
      async result({ data }, key) {
        this.queryInitReady(key)

        await this.initHomeMediaData(100, true, data.likes)
        this.queryLoadingReady(key)
      }
    }
  },
  computed: {
    ...mapGetters([
      'oauth',
      'media',
      'noMediaListDuplicate'
    ])
  },
  created() {
    this.lifecycle = { created: false }

    if (this.media.sender === 'home') {
      this.queryInitReady('likes')
      this.queryLoadingReady('likes')
      return
    }

    this.$store.commit('initMedia')
  },
  methods: {
    async initHomeMediaData(count, excludeReplies, likes) {
      await this.$store.dispatch('homeTimelineSearch', { count, excludeReplies })
      await this.$store.commit('initMediaListState', { likes })
    },
    updateLike(id) {
      const media = this.noMediaListDuplicate.find(media => media.id === id)
      shareUpdateLike(this.$store, this.$apollo, this.oauth.iid, media)
    },
    queryInitReady(key) {
      this.init = { [key]: true }
    },
    queryLoadingReady(key) {
      this.loading = { [key]: false }
    }
  }
}
</script>
