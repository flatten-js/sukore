<template lang="pug">
  div.thumbnail-box(:class="columnClassGenerator")
    vary-image(
      :src="src"
      fit="cover"
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
    }
  },
  computed: {
    columnClassGenerator() {
      const { column } = this
      return `column-${column}`
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
  }

  .thumbnail-fav {
    position: absolute;
    padding: .5rem;
    bottom: 0;
    right: 0;
    color: rgba(255, 255, 255, .95);
    font-size: 1.8rem;
    line-height: 0;
    text-shadow: 0 0 3px rgba(26, 26, 26, .2);
  }
</style>
