<template lang="pug">
  span.inline-icon-text(:class="propsClassGenerator")
    svg.inline-icon-text__icon
      use(:xlink:href="name | convertSymbolPath")
    template(v-if="type === 'link'")
      a.inline-icon-text__link(
        :title="link.title"
        :href="link.href"
        target="_blank"
        )
        | {{ link.display }}
    template(v-else)
      span.inline-icon-text__text
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
    type: String,
    urlText: String,
    text: String,
    name: {
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
    brightness: {
      type: String,
      default: '1',
      validator(val) {
        return ['1', '2'].includes(val)
      }
    },
    space: {
      type: String,
      default: 'default',
      validator(val) {
        return ['small', 'default', 'large'].includes(val)
      }
    }
  },
  computed: {
    propsClassGenerator() {
      const { size, brightness, space } = this

      return {
        [`-size-${size}`]: size,
        [`-brightness-${brightness}`]: brightness,
        [`-space-${space}`]: space
      }
    },
    link() {
      const [title, href, display] = this.urlText.split('::')

      return {
        title,
        href,
        display
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .inline-icon-text {
    $this: #{&};
    margin-right: .5rem;
    white-space: nowrap;

    @mixin size-template($size: 1rem) {
      font-size: $size;

      #{$this}__icon {
        width: $size;
        height: $size;
      }
    }

    &.-size-small {
      @include size-template(.875rem);
    }

    &.-size-default {
      @include size-template;
    }

    &.-brightness-1 {
      color: rgba(26, 26, 26, 1);
    }

    &.-brightness-2 {
      color: rgba(26, 26, 26, .75);
    }

    &.-space-small {
      #{$this}__icon {
        margin-right: .25rem;
      }
    }

    &.-space-default {
      #{$this}__icon {
        margin-right: .5rem;
      }
    }

    &.-space-large {
      #{$this}__icon {
        margin-right: 1rem;
      }
    }

    &__icon {
      fill: currentColor;
      vertical-align: middle;
    }

    &__link {
      color: #1b95e0;
      text-decoration: none;
      vertical-align: middle;
    }

    &__text {
      vertical-align: middle;
    }
  }
</style>
