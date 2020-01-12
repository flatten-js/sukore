<template lang="pug">
  component.material-button(
    :is="tag"
    :class="propsClassGenerator"
    v-bind="propsToggleAttribute"
    )
    template(v-if="tag === 'svg'")
      use(:xlink:href="name | convertSymbolPath")
    template(v-else)
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
    tag: {
      type: String,
      default: 'div',
      validator(val) {
        return ['div', 'svg', 'a', 'router-link'].includes(val)
      }
    },
    name: String,
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
    text: String,
    vertical: {
      type: String,
      default: 'medium',
      validator(val) {
        return ['short', 'medium'].includes(val)
      }
    },
    horizon: {
      type: String,
      default: 'medium',
      validator(val) {
        return ['short', 'medium', 'long'].includes(val)
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
        '-icon': tag.match('svg'),
        '-link': tag.match(/[^div|svg]/),
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
    border: 1px solid currentColor;
    border-radius: 25px;
    transition: background-color .2s;

    &.-icon {
      fill: currentColor;

      &.-size-default {
        width: 1rem;
        height: 1rem;
      }
    }

    &.-link {
      text-decoration: none;
    }

    &.-vertical-short {
      padding-top: .35rem;
      padding-bottom: .35rem;
    }

    &.-vertical-medium {
      padding-top: .5rem;
      padding-bottom: .5rem;
    }

    &.-horizon-short {
      padding-left: .5rem;
      padding-right: .5rem;
    }

    &.-horizon-medium {
      padding-left: 1rem;
      padding-right: 1rem;
    }

    &.-horizon-long {
      padding-left: 2rem;
      padding-right: 2rem;
    }

    &.-color-default {
      color: #1a1a1a;
    }

    &.-color-twitter {
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
