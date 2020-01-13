<template lang="pug">
  photo-zoomable-area
    template(#return)
      navigation-tools
    template(#photo)
      .zoomable-area(
        @touchstart="touchstart"
        @touchmove="touchmove"
        @touchend="touchend"
        )
        img.zoomable-area__photo(
          ref="photo"
          :style="zoomTransformStyle"
          :src="photo.src"
          @transitionend="zoomingTransitionEnd"
          )
    template(#controls)
      zoom-controls(
        :number="scale.now"
        @zoomWidth="zoomWidth"
        @zoomHeight="zoomHeight"
        @zoomOut="zoomOut"
        @zoomIn="zoomIn"
        )
</template>

<script>
import { mapGetters } from 'vuex'

import PhotoZoomableArea from '@/components/organisms/PhotoZoomableArea.vue'
import NavigationTools from '@/components/molecules/NavigationTools.vue'
import ZoomControls from '@/components/molecules/ZoomControls.vue'

export default {
  components: {
    PhotoZoomableArea,
    NavigationTools,
    ZoomControls
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
      el: {
        photo: null
      },
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
    calcPhotoSize() {
      const { scale, photo } = this

      return {
        w: scale.now * photo.w,
        h: scale.now * photo.h
      }
    },
    calcPhotoInitScale() {
      const { browser, photo } = this

      return {
        x: this.browser.w / this.photo.w,
        y: this.browser.h / this.photo.h
      }
    },
    calcPhotoPosition() {
      const { position, moved } = this

      return {
        x: position.x + moved.x,
        y: position.y + moved.y
      }
    },
    calcPhotoPositionCenter() {
      const { browser, calcPhotoSize } = this

      return {
        x: (browser.w - calcPhotoSize.w) / 2,
        y: (browser.h - calcPhotoSize.h) / 2
      }
    },
    calcPhotoInitPositionOverlap() {
      const { calcPhotoPosition, calcPhotoPositionCenter } = this

      return Object.keys(calcPhotoPosition).every(point => {
        return calcPhotoPosition[point] === calcPhotoPositionCenter[point]
      })
    },
    calcPhotoScaleInitialState() {
      const { scale, calcPhotoInitScale } = this

      return {
        x: scale.min === calcPhotoInitScale.x && scale.min === scale.now,
        y: scale.min === calcPhotoInitScale.y && scale.min === scale.now
      }
    },
    zoomTransformStyle() {
      return {
        transform: `translateX(${this.calcPhotoPosition.x}px) translateY(${this.calcPhotoPosition.y}px) scale(${this.scale.now})`
      }
    }
  },
  mounted() {
    const { calcPhotoInitScale } = this

    this.el = { photo: this.$refs.photo }
    this.scale = { min: calcPhotoInitScale.x, now: calcPhotoInitScale.x, max: calcPhotoInitScale.x * 2 ** 3 }
    this.position = { x: this.calcPhotoPositionCenter.x, y: this.calcPhotoPositionCenter.y }
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
      this.position = this.calcPhotoPosition
      this.moved = { x: 0, y: 0 }
    },
    zoomWidth() {
      const { scale, el, calcPhotoInitScale, calcPhotoInitPositionOverlap, calcPhotoScaleInitialState } = this
      if (calcPhotoScaleInitialState.x && calcPhotoInitPositionOverlap) return

      el.photo.classList.add('-zooming')

      this.scale = { min: calcPhotoInitScale.x, now: calcPhotoInitScale.x, max: calcPhotoInitScale.x * 2 ** 3 }
      this.position = this.calcPhotoPositionCenter
    },
    zoomHeight() {
      const { scale, el, calcPhotoInitScale, calcPhotoInitPositionOverlap, calcPhotoScaleInitialState } = this
      if (calcPhotoScaleInitialState.y && calcPhotoInitPositionOverlap) return

      el.photo.classList.add('-zooming')

      this.scale = { min: calcPhotoInitScale.y, now: calcPhotoInitScale.y, max: calcPhotoInitScale.y * 2 ** 3 }
      this.position = this.calcPhotoPositionCenter
    },
    zoomIn() {
      const { scale, el, browser, calcPhotoPosition } = this
      if (scale.now >= scale.max) return

      el.photo.classList.add('-zooming')

      this.scale = { ...scale, now: scale.now * 2 }
      this.position = {
        x: (calcPhotoPosition.x * 2) - (browser.w / 2),
        y: (calcPhotoPosition.y * 2) - (browser.h / 2)
      }
    },
    zoomOut() {
      const { scale, el, browser, calcPhotoPosition } = this
      if (scale.now <= scale.min) return

      el.photo.classList.add('-zooming')

      this.scale = { ...scale, now: scale.now / 2 }
      this.position = {
        x: (calcPhotoPosition.x + (browser.w / 2)) / 2,
        y: (calcPhotoPosition.y + (browser.h / 2)) / 2
      }
    },
    zoomingTransitionEnd() {
      this.el.photo.classList.remove('-zooming')
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

      &.-zooming {
        transition: all .3s;
      }
    }
  }
</style>
