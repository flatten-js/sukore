<template lang="pug">
  component.material-button(
    :is="tag"
    :class="propsClassGenerator"
    v-bind="propsToggleAttribute"
    )
    template(v-if="name")
      svg.material-button__icon
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
        return ['div', 'a', 'router-link'].includes(val)
      }
    },
    type: {
      type: String,
      default: 'default',
      validator(val) {
        return ['default', 'simple', 'keep-alive', 'othello'].includes(val)
      }
    },
    name: {
      type: String,
      default: ''
    },
    href: {
      type: String,
      default: ''
    },
    target: {
      type: String,
      default: null,
      validator(val) {
        return ['_blank'].includes(val)
      }
    },
    to: {
      type: String,
      default: ''
    },
    exact: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: ''
    },
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
        return ['default', 'twitter', 'like'].includes(val)
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
      const { type, tag, vertical, horizon, color, size, name, state } = this

      return {
        [`-type-${type}`]: type,
        [`-vertical-${vertical}`]: vertical,
        [`-horizon-${horizon}`]: horizon,
        [`-color-${color}`]: color,
        [`-size-${size}`]: size,
        '-icon': name,
        '-link': tag.match(/[^div]/),
        '-alive': state
      }
    },
    propsToggleAttribute() {
      const { tag, href, target, to, exact } = this

      const switchTagAttribute = {
        a: { href, target },
        'router-link': {
          to, exact,
          'exact-active-class': '-exact-active'
        }
      }

      return switchTagAttribute[tag]
    }
  }
}
</script>

<style lang="scss" scoped>
  .material-button {
    $this: #{&};
    display: inline-block;
    border: 1px solid currentColor;
    border-radius: 25px;

    $color-default: #1a1a1a;
    $color-twitter: #1DA1F2;
    $color-like: #FF4063;

    &.-icon {
      line-height: 0;
    }

    &__icon {
      fill: currentColor;
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

    &.-size-small {
      font-size: .875rem;

      #{$this}__icon {
        width: .875rem;
        height: .875rem;
      }
    }

    &.-size-default {
      font-size: 1rem;

      #{$this}__icon {
        width: 1rem;
        height: 1rem;
      }
    }

    &.-type-default {
      border: transparent;
      color: rgba(26, 26, 26, .5);
      transition: all .2s;

      &:active {
        color: $color-twitter;
        background-color: rgba(26, 161, 242, .15);
      }

      &.-alive, &.-exact-active {
        color: $color-twitter;
      }
    }

    &.-type-simple {
      transition: background-color .2s;

      &.-color-default {
        color: $color-default;
      }

      &.-color-twitter {
        color: $color-twitter;
      }

      &.-color-like {
        color: $color-like;
      }

      &.-alive {
        color: white;

        &.-color-default {
          border-color: $color-default;
          background-color: $color-default;
        }

        &.-color-twitter {
          border-color: $color-twitter;
          background-color: $color-twitter;
        }

        &.-color-like {
          border-color: $color-like;
          background-color: $color-like;
        }
      }
    }

    &.-type-keep-alive {
      color: white;
      border: transparent;

      &.-color-default {
        background-color: rgba(26, 26, 26, .75);
      }
    }

    &.-type-othello {
      color: white;
      border-color: white;
      background-color: rgba(185, 185, 185, .75);
      transition: all .1s;

      &.-alive {
        animation: pulse .2s linear;

        &.-color-like {
          background-color: rgba(255, 64, 99, .95);
        }
      }
    }
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.125)
    }
    100% {
      transform: scale(1);
    }
  }
</style>
