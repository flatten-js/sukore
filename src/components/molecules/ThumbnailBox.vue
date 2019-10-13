<template lang="pug">
  div.thumbnail-box(
    ref="thumbnailBox"
    :class="propsClassGenerator"
    )
    vary-image(
      :src="src"
      fit="cover"
      @load="load"
      )
    .thumbnail-fav
      material-icons(
        name="favorite"
        size="custom"
        )
</template>

<script>
import VaryImage from '@/components/atoms/VaryImage.vue'
import MaterialIcons from '@/components/atoms/MaterialIcons.vue'

export default {
  components: {
    VaryImage,
    MaterialIcons
  },
  props: {
    src: {
      type: String,
      reqired: true
    },
    column: {
      type: String,
      default: '2',
      validator(val) {
        return ['2', '3'].includes(val)
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
      const { column, animation } = this

      return {
        [`column-${column}`]: column,
        [`animation-${animation}`]: animation
      }
    }
  },
  methods: {
    load: function() {
      if (!this.animation) return

      const { thumbnailBox } = this.$refs
      thumbnailBox.classList.add('thumbnail-loaded')
    }
  }
}
</script>

<style lang="scss" scoped>
  .thumbnail-box {
    position: relative;

    &.column-2 {
      width: 50vw;
      height: 50vw;
    }

    &.column-3 {
      width: 33.33vw;
      height: 33.33vw;
    }

    &.animation-fade-up {
      opacity: 0;
      transform: translate3d(0, 1rem, 0);
      transition: all ease-out .4s;
    }
  }

  .thumbnail-loaded {
    &.animation-fade-up {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }

  .thumbnail-fav {
    position: absolute;
    padding: .5rem;
    bottom: 0;
    right: 0;
    color: rgba(255, 255, 255, .95);
    font-size: 1.8rem;
    line-height: 0;
    text-shadow: 0 2px 5px rgba(26, 26, 26, .26);
  }
</style>
