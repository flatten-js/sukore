<template lang="pug">
  .thumbnail-caption
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
import BlockText from '@/components/atoms/BlockText.vue'

export default {
  components: {
    BlockText
  },
  props: {
    text: String,
    created: String
  }
}
</script>

<style scoped>
  .caption-text {
    margin: 0 0 .5rem;
  }
</style>
