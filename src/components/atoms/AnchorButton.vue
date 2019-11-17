<template lang="pug">
  a.anchor-button(
    :class="propsClassGenerator"
    :href="href"
    :target="target"
    )
    | {{ text }}
</template>

<script>
export default {
  props: {
    href: {
      type: String,
      required: true
    },
    target: {
      type: String,
      default: '_blank',
      validator(val) {
        return ['_blank'].includes(val)
      }
    },
    text: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'standard',
      validator(val) {
        return ['standard', 'more'].includes(val)
      }
    },
    color: {
      type: String,
      default: 'default',
      validator(val) {
        return ['default', 'twitter'].includes(val)
      }
    },
    size: {
      type: String,
      default: 'small',
      validator(val) {
        return ['small'].includes(val)
      }
    }
  },
  computed: {
    propsClassGenerator() {
      const { type, color, size } = this

      return {
        [`-type-${type}`]: type,
        [`-color-${color}`]: color,
        [`-size-${size}`]: size
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .anchor-button {
    display: inline-block;
    text-decoration: none;
    border-radius: 25px;

    &.-size-small {
      font-size: .875rem;
    }

    &.-type-standard {
      padding: .35rem 1rem;
    }

    &.-type-more {
      padding: .35rem 2rem;
    }

    &.-color-default {
      background-color: #1a1a1a;
      color: white;
    }

    &.-color-twitter {
      background-color: #1DA1F2;
      color: white;
    }
  }
</style>
