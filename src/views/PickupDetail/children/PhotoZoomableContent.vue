<template lang="pug">
  photo-zoomable-area
    template(#return)
    template(#photo)
    template(#controls)
</template>

<script>
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
  }
}
</script>
