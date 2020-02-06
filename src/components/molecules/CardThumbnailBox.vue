<template lang="pug">
  .card-thumbnail-box
    router-link.card-thumbnail-box-link(
      :to="id | convertDetailsPath(screenName)"
      )
      .card-thumbnail-box-link__media
        relative-box-component(
          :type="type"
          :src="src[0]"
          animation="fade"
          )
    .card-thumbnail-box__photo
      template(v-if="length > 1")
        text-badge(
          name="collections"
          :text="length"
          size="small"
          )
    .card-thumbnail-box__gif
      template(v-if="type === 'gif'")
        text-badge(
          name="gif"
          )
</template>

<script>
import RelativeBoxComponent from '@/components/atoms/RelativeBoxComponent.vue'
import TextBadge from '@/components/atoms/TextBadge.vue'

export default {
  components: {
    RelativeBoxComponent,
    TextBadge
  },
  filters: {
    convertDetailsPath(id, screenName) {
      return `/${screenName}/media/${id}`
    }
  },
  props: {
    id: {
      type: String,
      reqired: true
    },
    screenName: {
      type: String,
      reqired: true
    },
    type: {
      type: String,
      default: 'photo',
      validator(val) {
        return ['photo', 'video', 'animated_gif'].includes(val)
      }
    },
    src: {
      type: Array,
      default: () => []
    },
    length: {
      type: Number,
      reqired: true
    }
  }
}
</script>

<style lang="scss" scoped>
  .card-thumbnail-box {
    position: relative;

    &__photo {
      position: absolute;
      top: 1rem;
      right: 1rem;
    }

    &__gif {
      position: absolute;
      bottom: 1rem;
      left: 1rem;
    }
  }
</style>
