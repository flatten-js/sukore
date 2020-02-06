<template lang="pug">
  home-template
    template(#timeline)
      timeline-stream
        template(v-for="media in noMediaListDuplicate")
          timeline-card
            template(#head)
              user-details-bar(
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

import HomeTemplate from '@/components/templates/HomeTemplate.vue'
import TimelineStream from '@/components/organisms/TimelineStream.vue'
import TimelineCard from '@/components/organisms/TimelineCard.vue'
import UserDetailsBar from '@/components/molecules/UserDetailsBar.vue'
import CardThumbnailBox from '@/components/molecules/CardThumbnailBox.vue'
import CardDetails from '@/components/molecules/CardDetails.vue'

export default {
  components: {
    HomeTemplate,
    TimelineStream,
    TimelineCard,
    CardThumbnailBox,
    UserDetailsBar,
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
      result({ data }, key) {
        this.queryInitReady(key)
        this.initHomeMediaData(100, true, data.likes)
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
    }
  }
}
</script>
