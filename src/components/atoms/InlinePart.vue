<template lang="pug">
  span.inline-part(:class="propsClassGenerator") {{ part }}
</template>

<script>
export default {
  props: {
    part: {
      type: [String, Number],
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
        return ['025', '05', '1'].includes(val)
      }
    },
    brightness: {
      type: String,
      default: '1',
      validator(val) {
        return ['1', '2', '3', '4'].includes(val)
      }
    },
  },
  computed: {
    propsClassGenerator() {
      const { weight, mr, brightness } = this

      return {
        [`weight-${weight}`]: weight,
        [`mr-${mr}`]: mr,
        [`brightness-${brightness}`]: brightness
      }
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

    &.mr-025 {
      margin: 0 .25rem 0 0;
    }

    &.mr-05 {
      margin: 0 .5rem 0 0;
    }

    &.mr-1 {
      margin: 0 1rem 0 0;
    }

    &.brightness-1 {
      color: rgba(26, 26, 26, 1);
    }

    &.brightness-2 {
      color: rgba(26, 26, 26, .75);
    }

    &.brightness-3 {
      color: rgba(26, 26, 26, .5);
    }

    &.brightness-4 {
      color: rgba(26, 26, 26, .25);
    }
  }
</style>
