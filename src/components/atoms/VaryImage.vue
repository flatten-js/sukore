<template lang="pug">
  v-lazy-image.vary-image(
    :class="propsClassGenerator"
    :src="src"
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
    },
    animation: {
      type: [String, null],
      default: null,
      validator(val) {
        return ['fade-up'].includes(val)
      }
    }
  },
  computed: {
    propsClassGenerator() {
      const { fit, animation } = this

      return {
        [`fit-${fit}`]: fit,
        [`animation-${animation}`]: animation
      }
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


  .v-lazy-image {
    &.animation-fade-up {
      opacity: 0;
      transform: translate3d(0, 1rem, 0);
      transition: all ease-out .4s;
    }
  }

  .v-lazy-image-loaded {
    &.animation-fade-up {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }
</style>
