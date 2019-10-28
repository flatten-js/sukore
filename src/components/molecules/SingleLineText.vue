<template lang="pug">
  .single-line-text
    block-text(
      :text="text"
      :size="size"
      :weight="weight"
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
    size: String,
    weight: String
  }
}
</script>

<style scoped>
  .single-line-text > .block-text {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
</style>
