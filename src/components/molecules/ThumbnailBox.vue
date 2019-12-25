<template lang="pug">
  .thumbnail-box(
    :class="propsClassGenerator"
    )
    router-link.thumbnail-box-link(
      :to="id | convertDetailsPath(screenName)"
      )
      .thumbnail-box-link__thumbnail
        relative-box-image(
          :src="src"
          :sizes="thumbnailSize"
          animation="fade"
          )
      template(v-if="type === 'photo'")
        .thumbnail-box-link__photo
          template(v-if="imageCount > 1")
            text-badge(
              name="collections"
              :text="imageCount"
              )
      template(v-else-if="type === 'animated_gif'")
        .thumbnail-box-link__animated-gif
          text-badge(
            text="GIF"
            )
      .thumbnail-box-link__fav(
        :class="{ '-favorite': state }"
        @click.prevent="clickFavorite"
        )
        space-expand-icon(
          name="favorite"
          shadow
          )
</template>

<script>
import RelativeBoxImage from '@/components/atoms/RelativeBoxImage.vue'
import TextBadge from '@/components/atoms/TextBadge.vue'
import SpaceExpandIcon from '@/components/atoms/SpaceExpandIcon.vue'

export default {
  components: {
    RelativeBoxImage,
    TextBadge,
    SpaceExpandIcon
  },
  filters: {
    convertDetailsPath(id, screenName) {
      return `/${screenName}/media/${id}`
    }
  },
  props: {
    id: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'photo',
      validator(val) {
        return ['photo', 'video', 'animated_gif'].includes(val)
      }
    },
    screenName: {
      type: String,
      required: true
    },
    src: {
      type: String,
      required: true
    },
    imageCount: {
      type: Number,
      required: true
    },
    thumbnailSize: {
      type: Object,
      default: () => ({
        w: '',
        h: '',
        resize: ''
      })
    },
    state: {
      type: Boolean,
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
    clickFavorite() {
      this.$emit('clickFavorite', this.id)
    }
  }
}
</script>

<style lang="scss" scoped>
  .thumbnail-box {
    position: relative;

    &.-column-2 {
      width: 50%;
    }

    &.-animation-fade {
      opacity: 0;
      transition: all ease-out .4s;
    }

    &.-loading-complete {
      &.-animation-fade {
        opacity: 1;
      }
    }
  }

  .thumbnail-box-link {
    display: block;
    height: 100%;

    &__photo {
      position: absolute;
      top: .5rem;
      right: .5rem;
      border-radius: 25px;
      box-shadow: 0 2px 5px rgba(26, 26, 26, 0.26);
    }

    &__animated-gif {
      position: absolute;
      left: .5rem;
      bottom: .5rem;
    }

    &__fav {
      position: absolute;
      bottom: 0;
      right: 0;
      color: rgba(255, 255, 255, .9);

      &.-favorite {
        color: #FF4063;
      }
    }
  }
</style>
