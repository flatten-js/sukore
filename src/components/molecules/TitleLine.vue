<template lang="pug">
  .title-line(
    :class="{ '-clickable': clickable }"
    @click.self="$emit('click-this', title)"
    )
    .title-line__content
      single-line-text(
        :tag="tag"
        :text="title"
        :size="size"
        weight="bold"
        )
    .title-line-option
      template(v-if="option === 'text'")
        .title-line-option__text(
          @click="clickOptionHandler"
          )
          material-button(
            :text="text"
            size="small"
            color="twitter"
            )
      template(v-else)
        .title-line-option__icon(
          @click="clickOptionHandler"
          )
          material-button(
            :name="name"
            color="twitter"
            horizon="short"
            )
</template>

<script>
import SingleLineText from '@/components/atoms/SingleLineText.vue'
import MaterialButton from '@/components/atoms/MaterialButton.vue'

export default {
  components: {
    SingleLineText,
    MaterialButton
  },
  props: {
    tag: {
      type: String,
      default: 'div',
      validator(val) {
        return ['div', 'h1', 'h2', 'h3'].includes(val)
      }
    },
    clickable: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      required: true
    },
    size: {
      type: String,
      default: 'default',
      validator(val) {
        return ['small', 'default', 'large'].includes(val)
      }
    },
    option: {
      type: String,
      default: 'icon',
      validator(val) {
        return ['icon', 'text'].includes(val)
      }
    },
    text: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    }
  },
  methods: {
    clickOptionHandler() {
      this.$emit('click-option', this.title)
    }
  }
}
</script>

<style lang="scss" scoped>
  .title-line {
    display: flex;
    padding: .5rem 1rem;
    align-items: center;
    justify-content: space-between;

    &.-clickable {
      border-bottom: 1px solid #dfdfdf;

      &:active {
        background-color: #eaeaea;
      }
    }

    &__content {
      pointer-events: none;
    }
  }

  .title-line-option {
    &__text {
      margin-right: -1rem;
    }

    &__icon {
      margin-right: -.5rem;
    }
  }
</style>
