<template lang="pug">
  div.thumbnail-box(
    ref="thumbnailBox"
    :class="propsClassGenerator"
    )
    router-link.thumbnail-box-link(:to="id | pathConversion")
      vary-image(
        :src="src"
        fit="cover"
        @load="load"
        )
      template(v-if="size > 1")
        .thumbnail-size-badge
          .badge-icon
            material-icons(
              name="photo_library"
              size="custom"
              )
          inline-part(
            :part="size"
            color="white"
            )
      .thumbnail-fav
        material-icons(
          name="favorite"
          size="custom"
          )
</template>

<script>
import VaryImage from '@/components/atoms/VaryImage.vue'
import InlinePart from '@/components/atoms/InlinePart.vue'
import MaterialIcons from '@/components/atoms/MaterialIcons.vue'

export default {
  components: {
    VaryImage,
    InlinePart,
    MaterialIcons
  },
  props: {
    id: {
      type: Number,
      reqired: true
    },
    src: {
      type: String,
      reqired: true
    },
    size: {
      type: Number,
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
  filters: {
    pathConversion(val) {
      return `/${val}`
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

  .thumbnail-box-link {
    display: block;
    height: 100%;
  }

  .thumbnail-size-badge {
    display: flex;
    position: absolute;
    padding: .25rem .5rem;
    top: .5rem;
    right: .5rem;
    color: #fff;
    border-radius: 25px;
    background-color: rgba(26, 26, 26, .75);
    align-items: center;
    font-size: .75rem;
  }

  .badge-icon {
    margin: 0 .25rem 0 0;
    line-height: 0;
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
