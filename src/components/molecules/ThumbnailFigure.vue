<template lang="pug">
  figure.thumbnail-figure
    .thumbnail
      vary-image(
        :src="src"
        )
    figcaption.thumbnail-figure-caption
      .caption-text
        block-text(
          :text="text"
          )
      .caption-created
        block-text(
          :text="created"
          size="small"
          brightness="2"
          )
</template>

<script>
import VaryImage from '@/components/atoms/VaryImage.vue'
import BlockText from '@/components/atoms/BlockText.vue'

export default {
  components: {
    VaryImage,
    BlockText
  },
  props: {
    src: String,
    text: String,
    created: String
  }
}
</script>

<style lang="scss" scoped>
  .thumbnail-figure {
    width: 100%;
    margin: 0;
  }

  .thumbnail {
    width: 100%;

    .vary-image {
      height: auto;
    }
  }

  .thumbnail-figure-caption {
    padding: 1rem;
    box-sizing: border-box;
  }

  .caption-text {
    margin: 0 0 .5rem; 
  }
</style>
