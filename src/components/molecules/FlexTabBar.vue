<template lang="pug">
  nav.flex-tab-bar
    template(v-for="tab in tabItems")
      flex-tab-item(
        :to="tab.to"
        :text="tab.text"
        :match="match"
        )
</template>

<script>
import FlexTabItem from '@/components/atoms/FlexTabItem.vue'

export default {
  components: {
    FlexTabItem
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
  .flex-tab-bar {
    display: flex;
    background-color: #fff;
  }
</style>
