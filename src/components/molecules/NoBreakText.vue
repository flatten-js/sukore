<template lang="pug">
  .no-break-text
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
    text: {
      type: String,
      reqired: true
    },
    size: String,
    weight: String
  }
}
</script>

<style scoped>
  .no-break-text > .block-text {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
</style>
