<template lang="pug">
  figure.origin-card
    .origin-card-content(
      :style="ratioBrowserHeightStyle"
      )
      .origin-card-content__badge
        template(v-if="length > 1 && limit")
          text-badge(
            :text="length | convertImageLength"
            size="small"
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
    figcaption.origin-card-details
      .origin-card-details-body
        .origin-card-details-body__comment
          extract-text(
            :text="comment | convertLastUrlRemoval | convertCustomUrlText(urlList)"
            )
        .origin-card-details-body__createdAt
          single-line-text(
            :text="created"
            size="small"
            brightness="2"
            )
      .origin-card-details__like(
        @click.prevent="emittingLike"
        )
        material-button(
          type="othello"
          tag="svg"
          name="like"
          color="like"
          horizon="short"
          :state="state"
          )
</template>

<script>
import TextBadge from '@/components/atoms/TextBadge.vue'
import VaryStandardComponent from '@/components/atoms/VaryStandardComponent.vue'
import MaterialButton from '@/components/atoms/MaterialButton.vue'
import MultiLineText from '@/components/atoms/MultiLineText.vue'
import SingleLineText from '@/components/atoms/SingleLineText.vue'
import ExtractText from '@/components/atoms/ExtractText.vue'

export default {
  components: {
    TextBadge,
    VaryStandardComponent,
    MaterialButton,
    MultiLineText,
    SingleLineText,
    ExtractText
  },
  filters: {
    convertImageLength(length) {
      return `1 / ${length}`
    },
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
    },
    state: {
      type: Boolean,
      reqired: true
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
    emittingLike() {
      this.$emit('like-click', this.id)
    },
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
  }

  .origin-card-content {
    position: relative;
    font-size: 0;
    background-color: #f7f7f7;

    &__badge {
      position: absolute;
      top: 1rem;
      right: 1rem;
    }

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

  .origin-card-details {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding: 1rem;
    box-sizing: border-box;

    &__like {
      margin-left: .5rem;
    }
  }

  .origin-card-details-body {
    &__comment {
      margin: 0 0 .5rem;
    }
  }
</style>
