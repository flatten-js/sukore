<template lang="pug">
  component.material-button(
    :is="tag"
    :class="propsClassGenerator"
    v-bind="propsToggleAttribute"
    )
    | {{ text }}
</template>

<script>
export default {
  props: {
    tag: {
      type: String,
      default: 'div',
      validator(val) {
        return ['div', 'a', 'router-link'].includes(val)
      }
    },
    href: String,
    target: {
      type: String,
      default: null,
      validator(val) {
        return ['_blank'].includes(val)
      }
    },
    to: String,
    exact: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      required: true
    },
    vertical: {
      type: String,
      default: 'default',
      validator(val) {
        return ['short', 'default'].includes(val)
      }
    },
    horizon: {
      type: String,
      default: 'default',
      validator(val) {
        return ['default', 'long'].includes(val)
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
      default: 'default',
      validator(val) {
        return ['small', 'default'].includes(val)
      }
    },
    state: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    propsClassGenerator() {
      const { tag, vertical, horizon, color, size, state } = this

      return {
        [`-vertical-${vertical}`]: vertical,
        [`-horizon-${horizon}`]: horizon,
        [`-color-${color}`]: color,
        [`-size-${size}`]: size,
        '-link': tag.match(/[^div]/),
        '-active': state
      }
    },
    propsToggleAttribute() {
      const { tag, href, target, to, exact } = this

      switch(tag) {
        case 'a':
        return {
          'href': href,
          'target': target
        }
        case 'router-link':
        return {
          'to': to,
          'exact': exact
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .material-button {
    display: inline-block;
    border-radius: 25px;
    transition: background-color .2s;

    &.-link {
      text-decoration: none;
    }

    &.-vertical-short {
      padding-top: .35rem;
      padding-bottom: .35rem;
    }

    &.-vertical-default {
      padding-top: .5rem;
      padding-bottom: .5rem;
    }

    &.-horizon-default {
      padding-left: 1rem;
      padding-right: 1rem;
    }

    &.-horizon-long {
      padding-left: 2rem;
      padding-right: 2rem;
    }

    &.-color-default {
      border: 1px solid #1a1a1a;
      color: #1a1a1a;
    }

    &.-color-twitter {
      border: 1px solid #1DA1F2;
      color: #1DA1F2;
    }

    &.-size-small {
      font-size: .875rem;
    }

    &.-size-default {
      font-size: 1rem;
    }

    &.-active {
      color: white;

      &.-color-default {
        background-color: #1a1a1a;
      }

      &.-color-twitter {
        background-color: #1DA1F2;
      }
    }
  }
</style>
