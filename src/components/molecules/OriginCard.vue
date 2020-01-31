<template lang="pug">
  figure.origin-card
    .origin-card__content(
      :style="ratioBrowserHeightStyle"
      )
      template(v-if="type !== 'photo'")
        //- ToDo: controlsがついている動画にもクリックイベント付与
        vary-standard-component(
          tag="video"
          :type="type"
          :src="src"
          standard="all"
          @click.native="videoPlayControl"
          )
      template(v-else)
        template(v-for="(src, i) in more")
          router-link.origin-card-content__photo-link(
            :to="screenName | convertPhotoZoomablePath(id, i)"
            )
            vary-standard-component(
              :src="src"
              )
      .image-more
        template(v-if="length > 1 && limit")
          material-button(
            tag="a"
            href="#"
            vertical="short"
            horizon="long"
            size="small"
            state
            text="すべて見る"
            @click.native.prevent="limit = !limit"
            )
    figcaption.card-details
      .card-details__comment
        extract-text(
          :text="comment | convertLastUrlRemoval | convertCustomUrlText(urlList)"
          )
      .card-details__createdAt
        single-line-text(
          :text="created"
          size="small"
          brightness="2"
          )
</template>

<script>
import VaryStandardComponent from '@/components/atoms/VaryStandardComponent.vue'
import MaterialButton from '@/components/atoms/MaterialButton.vue'
import MultiLineText from '@/components/atoms/MultiLineText.vue'
import SingleLineText from '@/components/atoms/SingleLineText.vue'
import ExtractText from '@/components/atoms/ExtractText.vue'

export default {
  components: {
    VaryStandardComponent,
    MaterialButton,
    MultiLineText,
    SingleLineText,
    ExtractText
  },
  filters: {
    convertPhotoZoomablePath(screenName, id, i) {
      return `/${screenName}/media/${id}/photo/${i + 1}`
    },
    convertLastUrlRemoval(comment) {
      return comment.replace(/\s(?:https?:\/\/[\w/$?.+-:%#&~=@]+)(?=$)/, '')
    },
    convertCustomUrlText(comment, urlList) {
      return urlList.reduce((acc, cur) => {
        return acc.replace(cur.url, `${cur.expanded_url}::${cur.url}?amp=1::${cur.display_url}`)
      }, comment)
    }
  },
  props: {
    type: {
      type: String,
      default: 'photo',
      validator(val) {
        return ['photo', 'video', 'animated_gif'].includes(val)
      }
    },
    id: {
      type: String,
      reqired: true
    },
    screenName: {
      type: String,
      reqired: true
    },
    src: {
      type: [Array, String],
      required: true
    },
    srcSize: {
      type: Object,
      default: () => {}
    },
    urlList: {
      type: Array,
      default: () => []
    },
    comment: {
      type: String,
      required: true
    },
    created: {
      type: String,
      required: true
    },
    length: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      limit: true
    }
  },
  computed: {
    ratioBrowserHeightStyle() {
      if (!this.limit) return

      return {
        height: `${(window.innerWidth / this.srcSize.w) * this.srcSize.h}px`
      }
    },
    more() {
      return this.src.filter((src, index) => {
        return this.limit ? !index : true
      })
    }
  },
  methods: {
    videoPlayControl(e) {
      const video = e.target

      if (video.paused) {
        video.play()
      } else {
        video.pause()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .origin-card {
    margin: 0;

    &__content {
      position: relative;
      font-size: 0;
      background-color: #f7f7f7;
    }
  }

  .origin-card-content {
    &__photo-link {
      display: block;

      &:not(:nth-last-child(2)) {
        margin: 0 0 1rem;
      }
    }
  }

  .image-more {
    position: absolute;
    bottom: 1rem;
    left: 50%;
    transform: translateX(-50%);
  }

  .card-details {
    padding: 1rem;
    box-sizing: border-box;

    &__comment {
      margin: 0 0 .5rem;
    }
  }
</style>
