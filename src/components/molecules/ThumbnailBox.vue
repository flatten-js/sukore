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
          animation="fade"
          )
      .thumbnail-box-link__badge
        template(v-if="imageCount > 1")
            image-count-badge(:number="imageCount")
      .thumbnail-box-link__fav(
        :class="{ '-favorite': state }"
        @click.prevent="clickFavorite"
        )
        material-icons(
          name="favorite"
          size="custom"
          )
</template>

<script>
import RelativeBoxImage from '@/components/atoms/RelativeBoxImage.vue'
import ImageCountBadge from '@/components/atoms/ImageCountBadge.vue'
import MaterialIcons from '@/components/atoms/MaterialIcons.vue'

export default {
  components: {
    RelativeBoxImage,
    ImageCountBadge,
    MaterialIcons
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
    line-height: 0;

    &__badge {
      position: absolute;
      top: .5rem;
      right: .5rem;
      border-radius: 25px;
      box-shadow: 0 2px 5px rgba(26, 26, 26, 0.26);
    }

    &__fav {
      position: absolute;
      padding: .5rem;
      bottom: 0;
      right: 0;
      color: rgba(255, 255, 255, .95);
      font-size: 1.8rem;
      line-height: 0;
      text-shadow: 0 2px 5px rgba(26, 26, 26, .26);

      &.-favorite {
        color: #FF4063;
      }
    }
  }
</style>
