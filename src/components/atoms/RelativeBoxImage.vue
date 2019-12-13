<template lang="pug">
  lazy-component.relative-box-image(
    @show="setDominant"
    )
    img.relative-box-image__body(
      :src="src"
      )
</template>

<script>
import * as Vibrant from 'node-vibrant'

export default {
  props: {
    src: {
      type: String,
      required: true
    }
  },
  methods: {
    setDominant({ $el }) {
      const vibrant = new Vibrant(this.src)
      vibrant.getPalette()
      .then(({ Vibrant }) => {
        const dominant = Vibrant.rgb
        $el.style.backgroundColor = `rgb(${dominant})`
      })
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
    }
  }
</style>
