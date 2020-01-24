<template lang="pug">
  .text-badge(:class="propsClassGenerator")
    template(v-if="name")
      svg.text-badge__icon
        use(:xlink:href="name | convertSymbolPath")
    .text-badge__text
      | {{ text }}
</template>

<script>
export default {
  filters: {
    convertSymbolPath(name) {
      return `/img/icons/symbol-defs.svg#icon-${name}`
    }
  },
  props: {
    name: String,
    text: {
      type: [String, Number],
      reqired: true
    },
    size: {
      type: String,
      default: 'default',
      validator(val) {
        return ['small', 'default'].includes(val)
      }
    }
  },
  computed: {
    propsClassGenerator() {
      const { size, text } = this

      return {
        [`-size-${size}`]: size,
        '-only': !text
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .text-badge {
    $this: #{&};
    display: flex;
    min-width: 1.4rem;
    padding: .25rem .5rem;
    border-radius: 25px;
    background-color: rgba(26, 26, 26, .75);
    align-items: center;
    color: #fff;
    box-shadow: 0 2px 5px rgba(26, 26, 26, 0.26);

    &__icon {
      margin: 0 .25rem 0 0;
      fill: currentColor;
    }

    @mixin size-template($size: 1rem) {
      font-size: $size;

      #{$this}__icon {
        width: $size;
        height: $size;
      }
    }

    &.-size-small {
      @include size-template($size: .75rem)
    }

    &.-size-default {
      @include size-template;
    }

    &.-only {
      #{$this}__icon {
        margin: 0 auto;
      }
    }
  }
</style>
