<template lang="pug">
  .absolute-territory
    .absolute-territory__expose
      template(v-if="type === 'button'")
        material-button(
          type="simple"
          :text="text"
          color="twitter"
          size="small"
          state
          )
      template(v-else)
        loader
</template>

<script>
import MaterialButton from '@/components/atoms/MaterialButton.vue'
import Loader from '@/components/atoms/Loader.vue'

export default {
  components: {
    MaterialButton,
    Loader
  },
  props: {
    type: {
      type: String,
      default: 'loading',
      validator(val) {
        return ['loading', 'button'].includes(val)
      }
    },
    text: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
  .absolute-territory {
    display: flex;
    height: 96px;
    align-items: center;
    justify-content: center;
  }
</style>
