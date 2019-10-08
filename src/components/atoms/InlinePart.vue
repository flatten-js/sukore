<template lang="pug">
  span.inline-part(:class="[weightClassGenerator, mrClassGenerator]") {{ part }}
</template>

<script>
export default {
  props: {
    part: {
      type: String,
      required: true
    },
    weight: {
      type: [String, null],
      default: null,
      validator(val) {
        return ['normal', 'bold'].includes(val)
      }
    },
    mr: {
      type: [String, null],
      default: null,
      validator(val) {
        return ['05', '1'].includes(val)
      }
    }
  },
  computed: {
    weightClassGenerator() {
      const { weight } = this
      return `weight-${weight}`
    },
    mrClassGenerator() {
      const { mr } = this
      return `mr-${mr}`
    }
  }
}
</script>

<style lang="scss" scoped>
  .inline-part {

    &.weight-normal {
      font-weight: normal;
    }

    &.weight-bold {
      font-weight: bold;
    }

    &.mr-05 {
      margin: 0 .5rem 0 0;
    }

    &.mr-1 {
      margin: 0 1rem 0 0;
    }
  }
</style>
