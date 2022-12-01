<template lang="pug">
  .navigation-tools
    .navigation-tools__back
      material-button(
        type="keep-alive"
        name="chevron-left"
        horizon="short"
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
