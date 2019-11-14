<template lang="pug">
  span.individuality(:class="propsClassGenerator")
    | {{ text }}
</template>

<script>
export default {
  props: {
    text: {
      type: [String, Number],
      required: true
    },
    color: {
      type: String,
      default: 'black',
      validator(val) {
        return ['black', 'white'].includes(val)
      }
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
    }
  },
  computed: {
    propsClassGenerator() {
      const { color, weight, mr, brightness } = this

      return {
        [`-color-${color}`]: color,
        [`-weight-${weight}`]: weight,
        [`-mr-${mr}`]: mr,
        [`-brightness-${brightness}`]: brightness && color
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .individuality {
    &.-weight-normal {
      font-weight: normal;
    }

    &.-weight-bold {
      font-weight: bold;
    }

    &.-mr-025 {
      margin: 0 .25rem 0 0;
    }

    &.-mr-05 {
      margin: 0 .5rem 0 0;
    }

    &.-mr-1 {
      margin: 0 1rem 0 0;
    }

    &.-color-black {
      color: #1a1a1a;

      &.-brightness-1 {
        color: rgba(26, 26, 26, 1);
      }

      &.-brightness-2 {
        color: rgba(26, 26, 26, .75);
      }

      &.-brightness-3 {
        color: rgba(26, 26, 26, .5);
      }

      &.-brightness-4 {
        color: rgba(26, 26, 26, .25);
      }
    }
  }
</style>
