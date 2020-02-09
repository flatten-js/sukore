<template lang="pug">
  nav.text-tab-bar
    template(v-for="tab in tabItems")
      text-tab-item(
        :to="tab.to"
        :text="tab.text"
        :match="match"
        )
</template>

<script>
import TextTabItem from '@/components/atoms/TextTabItem.vue'

export default {
  components: {
    TextTabItem
  },
  props: {
    tabItems: {
      type: Array,
      required: true
    },
    match: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
  .text-tab-bar {
    display: flex;
    background-color: #fff;
  }
</style>
