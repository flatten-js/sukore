<template lang="pug">
  .relative-box-component
    template(v-if="type !== 'photo'")
      video.relative-box-component__video(
        ref="video"
        v-bind="mediaTypeAttribute"
        :src="src"
        )
    template(v-else)
      lazy-component.relative-box-component-body(
        v-lazy-container="initVLazyContainer"
        )
        img.relative-box-component-body__image(
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
    type: {
      type: String,
      default: 'photo',
      validator(val) {
        return ['photo', 'video', 'animated_gif'].includes(val)
      }
    },
    src: {
      type: String,
      required: true
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
    },
    mediaTypeAttribute() {
      const { type } = this

      return {
        'autoplay': type !== 'photo',
        'muted': type !== 'photo',
        'controls': type === 'video',
        'loop': type === 'animated_gif'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .relative-box-component {
    position: relative;

    &::before {
      content: "";
      display: block;
      padding: 100% 0 0;
    }

    &__video {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
    }
  }

  .relative-box-component-body {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;

    &__image {
      width: 100%;
      height: 100%;
      object-fit: cover;

      &.-animation-fade {
        opacity: 0;
        transition: all ease-out .2s;
      }

      &[lazy=loaded] {
        &.-animation-fade {
          opacity: 1;
        }
      }
    }
  }
</style>
