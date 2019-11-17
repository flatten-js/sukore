<template lang="pug">
  v-lazy-image.box-image(
    :class="propsClassGenerator"
    :src="src"
    @load="load"
    )
</template>

<script>
import VLazyImage from 'v-lazy-image'

export default {
  components: {
    VLazyImage
  },
  props: {
    src: {
      type: String,
      required: true
    },
    column: {
      type: String,
      default: '2',
      validator(val) {
        return ['2'].includes(val)
      }
    }
  },
  computed: {
    propsClassGenerator() {
      const { column } = this

      return {
        [`-column-${column}`]: column
      }
    }
  },
  methods: {
    load() {
      this.$emit('loadingComplete')
    }
  }
}
</script>

<style lang="scss" scoped>
  .box-image {
    object-fit: cover;
    
    &.-column-2 {
      width: 50vw;
      height: 50vw;
    }
  }
</style>
