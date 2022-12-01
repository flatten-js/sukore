<template lang="pug">
  .loader(
    :class="propsClassGenerator"
    )
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'pulse',
      validator(val) {
        return ['pulse'].includes(val)
      }
    },
    size: {
      type: String,
      default: 'default',
      validator(val) {
        return ['default'].includes(val)
      }
    }
  },
  computed: {
    propsClassGenerator() {
      const { type, size } = this

      return {
        [`-type-${type}`]: type,
        [`-size-${size}`]: size
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @keyframes pulse {
    from {
      transform: translate(-50%, -50%) scale(0);
      opacity: 1;
    }
    to {
      transform: translate(-50%, -50%) scale(1);
      opacity: 0;
    }
  }

  .loader {
    position: relative;

    &.-type-pulse {
      &::after {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 50%;
        background-color: rgba(26, 26, 26, .2);
        animation: pulse 1s ease-out infinite;
      }
    }

    &.-size-default {
      width: 3rem;
      height: 3rem;
    }
  }
</style>
