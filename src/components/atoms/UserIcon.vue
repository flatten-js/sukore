<template lang="pug">
  .user-icon(
    :class="propsClassGenerator"
    :style="{ backgroundImage: `url(${url})` }"
    )
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      required: true
    },
    size: {
      type: String,
      default: 'default',
      validator(val) {
        return ['small', 'default'].includes(val)
      }
    },
    border: {
      type: Boolean,
      required: false
    }
  },
  computed: {
    propsClassGenerator() {
      const { size, border } = this

      return {
        [`-size-${size}`]: size,
        ['-border']: border
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .user-icon {
    border-radius: 50%;
    background-size: cover;
    background-color: #dfdfdf;
    box-sizing: border-box;

    &.-size-small {
      width: 2.125rem;
      height: 2.125rem;
    }

    &.-size-default {
      width: 5.5rem;
      height: 5.5rem;

      &.-border {
        border: 3px solid #fff;
      }
    }
  }
</style>
