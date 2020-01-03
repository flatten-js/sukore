<template lang="pug">
  photo-zoomable-area
    template(#return)
    template(#photo)
      img.photo(
        :style="zoomTransformStyle"
        :src="photo.src"
        )
    template(#controls)
      button(
        @click="zoomIn"
        ) +
      span {{ scale.now }}
      button(
        @click="zoomOut"
        ) -
</template>

<script>
import { mapGetters } from 'vuex'

import PhotoZoomableArea from '@/components/organisms/PhotoZoomableArea.vue'

export default {
  components: {
    PhotoZoomableArea
  },
  props: {
    id: {
      type: String,
      reqired: true
    },
    count: {
      type: String,
      reqired: true
    }
  },
  data() {
    return {
      browser: {
        w: window.innerWidth,
        h: window.innerHeight
      },
      scale: {
        min: 0,
        now: 0,
        max: 0
      },
      position: {
        x: 0,
        y: 0
      }
    }
  },
  computed: {
    ...mapGetters([
      'noMediaListDuplicate'
    ]),
    mediaFromId() {
      return this.noMediaListDuplicate.find(media => media.id == this.id)
    },
    photo() {
      const { count, mediaFromId } = this
      const media = mediaFromId.entities.media
      const i = count - 1

      return {
        src: media.src[i],
        w: media.sizes[i].w,
        h: media.sizes[i].h
      }
    },
    calculatePhotoSize() {
      const { scale, photo } = this

      return {
        w: scale.now * photo.w,
        h: scale.now * photo.h
      }
    },
    calculatePhotoPositionCenter() {
      const { browser, calculatePhotoSize } = this

      return {
        x: (browser.w - calculatePhotoSize.w) / 2,
        y: (browser.h - calculatePhotoSize.h) / 2
      }
    },
    zoomTransformStyle() {
      return {
        transform: `translateX(${this.position.x}px) translateY(${this.position.y}px) scale(${this.scale.now})`
      }
    }
  },
  mounted() {
    const initialScale = this.browser.w / this.photo.w

    this.scale = { min: initialScale, now: initialScale, max: initialScale * 2 ** 3 }
    this.position = { x: this.calculatePhotoPositionCenter.x, y: this.calculatePhotoPositionCenter.y }
  },
  methods: {
    zoomIn() {
      const { scale } = this
      if (scale.now >= scale.max) return

      this.scale = { ...scale, now: scale.now * 2 }
      this.position = { x: this.calculatePhotoPositionCenter.x, y: this.calculatePhotoPositionCenter.y }
    },
    zoomOut() {
      const { scale } = this
      if (scale.now <= scale.min) return

      this.scale = { ...scale, now: scale.now / 2 }
      this.position = { x: this.calculatePhotoPositionCenter.x, y: this.calculatePhotoPositionCenter.y }
    }
  }
}
</script>

<style scoped>
  .photo {
    transform-origin: top left;
  }
</style>
