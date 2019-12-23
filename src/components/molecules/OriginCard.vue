<template lang="pug">
  figure.origin-card
    .origin-card__content
      template(v-if="type !== 'photo'")
        vary-standard-component(
          tag="video"
          :type="type"
          :src="src"
          @click.native="videoPlayControl"
          )
      template(v-else)
        template(v-for="src in more")
          vary-standard-component(
            :src="src"
            )
      .image-more
        template(v-if="size > 1 && limit")
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
    src: {
      type: [Array, String],
      required: true
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
    size: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      limit: true,
      playing: true
    }
  },
  computed: {
    more() {
      return this.src.filter((src, index) => {
        return this.limit ? !index : true
      })
    }
  },
  methods: {
    videoPlayControl(e) {
      const video = e.target

      if (this.playing = !this.playing) {
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

      .vary-standard-component {
        &:not(:nth-last-child(2)) {
          margin: 0 0 1rem;
        }
      }
    }
  }

  .video-mask {

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
