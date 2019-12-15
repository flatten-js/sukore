<template lang="pug">
  lazy-component.relative-box-image(
    v-lazy-container="initVLazyContainer"
    @show="setDominant"
    )
    img.relative-box-image__body(
      :class="propsClassGenerator"
      :data-src="src | convertReduceSize"
      )
</template>

<script>
import ColorThief from 'colorthief'

export default {
  filters: {
    convertReduceSize(src) {
      return `${src}?format=jpg&name=thumb`
    }
  },
  props: {
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
    }
  },
  methods: {
    setDominant({ $el }) {
      const colorThief = new ColorThief()
      const image = new Image(150, 150)
      image.crossOrigin = 'Anonymous'

      image.addEventListener('load', () => {
        const dominant = colorThief.getColor(image)
        $el.style.backgroundColor = `rgb(${dominant})`
      })

      image.src = this.src
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
        transition: all ease-out .25s;
      }

      &[lazy=loaded] {
        &.-animation-fade {
          opacity: 1;
        }
      }
    }
  }
</style>
