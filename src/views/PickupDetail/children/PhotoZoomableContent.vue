<template lang="pug">
  photo-zoomable-area
    template(#return)
    template(#photo)
      img.photo(
        :style="zoomTransformStyle"
        :src="photo.src"
        )
    template(#controls)
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
    zoomTransformStyle() {
      return {
        transform: `translateX(${this.position.x}px) translateY(${this.position.y}px) scale(${this.scale.now})`
      }
    }
  },
  mounted() {
    const { browser, photo } = this
    const initialScale = browser.w / photo.w

    this.scale = { min: initialScale, now: initialScale, max: initialScale * 2 ** 3 }
    this.position = { x: (browser.w - (initialScale * photo.w )) / 2, y: (browser.h - (initialScale * photo.h)) / 2 }
  }
}
</script>

<style scoped>
  .photo {
    transform-origin: top left;
  }
</style>
