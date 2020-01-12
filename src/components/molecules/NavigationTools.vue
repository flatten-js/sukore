<template lang="pug">
  .navigation-tools
    .navigation-tools__back
      material-button(
        tag="svg"
        name="chevron-left"
        horizon="short"
        brightness="2"
        :state="true"
        @click.native="back"
        )
</template>

<script>
import MaterialButton from '@/components/atoms/MaterialButton.vue'

export default {
  components: {
    MaterialButton
  },
  methods: {
    back() {
      this.$router.back()
    }
  }
}
</script>
