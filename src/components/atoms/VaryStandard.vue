<template lang="pug">
  component.vary-standard(
    :is="tag"
    :src="src"
    :class="propsClassGenerator"
    v-bind="propsToggleAttribute"
    )
</template>

<script>
export default {
  props: {
    tag: {
      type: String,
      default: 'img',
      validator(val) {
        return ['img', 'video'].includes(val)
      }
    },
    type: {
      type: String,
      default: 'photo',
      validator(val) {
        return ['photo', 'video', 'animated_gif'].includes(val)
      }
    },
    src: {
      type: String,
      required: true
    },
    standard: {
      type: String,
      default: 'width',
      validator(val) {
        return ['width', 'height', 'all'].includes(val)
      }
    }
  },
  computed: {
    propsClassGenerator() {
      const { standard } = this

      return {
        [`-standard-${standard}`]: standard
      }
    },
    propsToggleAttribute() {
      const { type } = this

      return {
        'controls': type === 'video',
        'loop': type === 'animated_gif'
      }
    }
  },
  mounted() {
    if (this.type !== 'photo') {
      this.$el.muted = true
    }
  }
}
</script>

<style lang="scss" scoped>
  .vary-standard {
    background-color: #dfdfdf;

    &.-standard-width {
      width: 100%;
      height: auto;
    }

    &.-standard-height {
      width: auto;
      height: 100%;
    }

    &.-standard-all {
      width: 100%;
      height: 100%;
    }
  }
</style>
