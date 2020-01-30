<template lang="pug">
  lazy-component.relative-box-image(
    v-lazy-container="initVLazyContainer"
    )
    img.relative-box-image__body(
      :class="propsClassGenerator"
      :data-src="src | convertReduceSize"
      )
</template>

<script>
export default {
  filters: {
    convertReduceSize(src) {
      return `${src}?format=jpg&name=small`
    }
  },
  props: {
    src: {
      type: String,
      required: true
    },
    sizes: {
      type: Object,
      default: () => ({
        w: 0,
        h: 0,
        resize: ''
      })
    },
    animation: {
      type: String,
      default: null,
      validator(val) {
        return ['fade'].includes(val)
      }
    }
  },
  data() {
    return {
      initVLazyContainer: {
        selector: 'img',
        loading: '/img/loading_placeholder.png'
      }
    }
  },
  computed: {
    propsClassGenerator() {
      const { animation } = this

      return {
        [`-animation-${animation}`]: animation
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .relative-box-image {
    position: relative;

    &::before {
      content: "";
      display: block;
      padding: 100% 0 0;
    }

    &__body {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      object-fit: cover;

      &.-animation-fade {
        opacity: 0;
        transition: all ease-out .4s;
      }

      &[lazy=loaded] {
        &.-animation-fade {
          opacity: 1;
        }
      }
    }
  }
</style>
