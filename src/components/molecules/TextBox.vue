<template lang="pug">
  .text-box(:class="propsClassGenerator")
    template(v-if="type === 'multi'")
      multi-line-text(
        v-bind="{ text, color, size, weight }"
        )
    template(v-else)
      single-line-text(
        v-bind="{ text, tag, size, weight, brightness }"
        )
</template>

<script>
import SingleLineText from '@/components/atoms/SingleLineText.vue'
import MultiLineText from '@/components/atoms/MultiLineText.vue'

export default {
  components: {
    SingleLineText,
    MultiLineText
  },
  props: {
    type: {
      type: String,
      default: 'single',
      validator(val) {
        return ['single', 'multi'].includes(val)
      }
    },
    align: {
      type: String,
      validator(val) {
        return ['left', 'center', 'right'].includes(val)
      }
    },
    text: {
      type: String,
      required: true
    },
    color: String,
    size: String,
    weight: String,
    tag: String,
    brightness: String
  },
  computed: {
    propsClassGenerator() {
      const { align } = this

      return {
        [`-align-${align}`]: align
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.text-box {
  padding: 1rem;

  &.-align-left {
    text-align: left;
  }

  &.-align-center {
    text-align: center;
  }

  &.-align-right {
    text-align: right;
  }
}
</style>
