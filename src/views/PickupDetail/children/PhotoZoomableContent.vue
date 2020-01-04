<template lang="pug">
  photo-zoomable-area
    template(#return)
      navigation-controls
    template(#photo)
      .zoomable-area(
        @touchstart="touchstart"
        @touchmove="touchmove"
        @touchend="touchend"
        )
        img.zoomable-area__photo(
          :style="zoomTransformStyle"
          :src="photo.src"
          )
    template(#controls)
      zoomable-controls(
        :number="scale.now"
        @zoomOut="zoomOut"
        @zoomIn="zoomIn"
        )
</template>

<script>
import { mapGetters } from 'vuex'

import PhotoZoomableArea from '@/components/organisms/PhotoZoomableArea.vue'
import NavigationControls from '@/components/molecules/NavigationControls.vue'
import ZoomableControls from '@/components/molecules/ZoomableControls.vue'

export default {
  components: {
    PhotoZoomableArea,
    NavigationControls,
    ZoomableControls
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
      touched: {
        x: 0,
        y: 0
      },
      moved: {
        x: 0,
        y: 0
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
    calculatePhotoPosition() {
      return {
        x: this.position.x + this.moved.x,
        y: this.position.y + this.moved.y
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
        transform: `translateX(${this.calculatePhotoPosition.x}px) translateY(${this.calculatePhotoPosition.y}px) scale(${this.scale.now})`
      }
    }
  },
  mounted() {
    const initialScale = this.browser.w / this.photo.w

    this.scale = { min: initialScale, now: initialScale, max: initialScale * 2 ** 3 }
    this.position = { x: this.calculatePhotoPositionCenter.x, y: this.calculatePhotoPositionCenter.y }
  },
  methods: {
    touchstart(e) {
      this.touched = {
        x: e.touches[0].pageX,
        y: e.touches[0].pageY
      }
    },
    touchmove(e) {
      this.moved = {
        x: e.touches[0].pageX - this.touched.x,
        y: e.touches[0].pageY - this.touched.y
      }
    },
    touchend(e) {
      this.position = { ...this.calculatePhotoPosition }
      this.moved = { x: 0, y: 0 }
    },
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

<style lang="scss" scoped>
  .zoomable-area {
    width: 100%;
    height: 100%;

    &__photo {
      transform-origin: top left;
    }
  }
</style>
