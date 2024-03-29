<template lang="pug">
  thread-layout
    template(#header-layer)
      head-area
        details-bar(
          name="スレッド"
          option="none"
          )
    template(#pickup-layer)
      pickup-area
        template(#loading)
          template(v-if="loading.likes")
            loading
        template(#card)
          template(v-if="findMedia")
            pickup-card
              template(#head)
                details-bar(
                  icon-type="user"
                  content-type="user"
                  :icon="findMedia.icon"
                  :name="findMedia.name"
                  :screen-name="findMedia.screenName"
                  )
              template(#media)
                card-details-box(
                  :id="findMedia.id"
                  :screenName="findMedia.screenName"
                  :type="findMedia.entities.type"
                  :src="findMedia.entities.src"
                  :src-size="findMedia.entities.thumbnail.size"
                  :length="findMedia.entities.length"
                  )
              template(#details)
                card-details(
                  :id="findMedia.id"
                  :comment="findMedia.text"
                  :url-list="findMedia.urlList"
                  :created="findMedia.created"
                  :state="findMedia.state"
                  @like-click="updateLike"
                  )
    template(#photo-zoomable-layer)
      router-view
</template>

<script>
import { mapGetters } from 'vuex'
import { LIKE } from '@/apollo/graphql'
import { shareUpdateLike } from '@/apollo/graphql/used/shares'

import ThreadLayout from '@/components/templates/ThreadLayout.vue'
import HeadArea from '@/components/organisms/HeadArea.vue'
import DetailsBar from '@/components/molecules/DetailsBar.vue'
import PickupArea from '@/components/organisms/PickupArea.vue'
import Loading from '@/components/molecules/Loading.vue'
import PickupCard from '@/components/organisms/PickupCard.vue'
import CardDetailsBox from '@/components/molecules/CardDetailsBox.vue'
import CardDetails from '@/components/molecules/CardDetails.vue'

export default {
  components: {
    ThreadLayout,
    HeadArea,
    DetailsBar,
    PickupArea,
    Loading,
    PickupCard,
    CardDetailsBox,
    CardDetails
  },
  props: {
    id: {
      type: String,
      reqired: true
    }
  },
  data() {
    return {
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
        return this.findMedia || this.init.likes
      },
      async result({ data }, key) {
        this.init = { [key]: true }

        await this.initThreadMediaData(this.id, data.likes)
        this.loading = { [key]: false }
      }
    }
  },
  computed: {
    ...mapGetters([
      'oauth',
      'uniqMediaList',
      'stockAllMediaList'
    ]),
    findMedia() {
      const handle = media => media.id == this.id
      const media = this.uniqMediaList.find(handle)
      const stock = this.stockAllMediaList.find(handle)
      return media || stock
    }
  },
  watch: {
    '$route'(to) {
      if (to.path.match(/photo\/\d$/)) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = ''
      }
    }
  },
  created() {
    if (!this.findMedia) return
    window.scrollTo(0, 0)
    this.queryInitReady('likes')
    this.queryLoadingReady('likes')
  },
  methods: {
    async initThreadMediaData(id, likes) {
      await this.$store.dispatch('singleTweetSearch', { id })
      await this.$store.commit('initMediaListState', { likes })
    },
    updateLike(id) {
      const media = this.uniqMediaList.find(media => media.id === id)
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
