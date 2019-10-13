<template lang="pug">
  v-lazy-image.vary-image(
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
    fit: {
      type: [String, null],
      default: null,
      validator(val) {
        return ['cover'].includes(val)
      }
    }
  },
  computed: {
    propsClassGenerator() {
      const { fit } = this

      return {
        [`fit-${fit}`]: fit
      }
    }
  },
  methods: {
    load: function() {
      this.$emit('load')
    }
  }
}
</script>

<style lang="scss" scoped>
  .vary-image {
    width: 100%;
    height: 100%;
    border-radius: inherit;

    &.fit-cover {
      object-fit: cover;
    }
  }
</style>
