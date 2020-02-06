<template lang="pug">
  .card-details-box(
    :style="preloadImageHeightStyle"
    )
    template(v-if="type !== 'photo'")
      vary-standard-component(
        tag="video"
        :type="type"
        :src="src[0]"
        standard="all"
        @click.native="videoPlayControl"
        )
    template(v-else)
      template(v-for="(src, i) in more")
        router-link.card-details-box__link(
          :to="screenName | convertPhotoZoomablePath(id, i)"
          )
          vary-standard-component(
            :src="src"
            )
    .card-details-box__badge
      template(v-if="length > 1 && limit")
        text-badge(
          :text="length | convertImageLength"
          size="small"
          )
    .card-details-box__more
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
</template>

<script>
import VaryStandardComponent from '@/components/atoms/VaryStandardComponent.vue'
import TextBadge from '@/components/atoms/TextBadge.vue'
import MaterialButton from '@/components/atoms/MaterialButton.vue'

export default {
  components: {
    VaryStandardComponent,
    TextBadge,
    MaterialButton
  },
  filters: {
    convertImageLength(length) {
      return `1 / ${length}`
    },
    convertPhotoZoomablePath(screenName, id, i) {
      return `/${screenName}/media/${id}/photo/${i + 1}`
    },
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
      type: Array,
      default: () => []
    },
    srcSize: {
      type: Object,
      default: () => {}
    },
    length: {
      type: Number,
      reqired: true
    }
  },
  data() {
    return {
      limit: true
    }
  },
  computed: {
    preloadImageHeightStyle() {
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
  .card-details-box {
    position: relative;
    font-size: 0;
    background-color: #f7f7f7;

    &__link {
      display: block;

      &:not(:last-of-type) {
        margin: 0 0 1rem;
      }
    }

    &__badge {
      position: absolute;
      top: 1rem;
      right: 1rem;
    }

    &__more {
      position: absolute;
      bottom: 1rem;
      left: 50%;
      transform: translateX(-50%);
    }
  }
</style>
