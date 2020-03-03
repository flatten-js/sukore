<template lang="pug">
  .title-line(
    :class="{ '-trigger': trigger }"
    @click.self="$emit('click-this', title)"
    )
    single-line-text(
      :tag="tag"
      :text="title"
      :size="size"
      weight="bold"
      @click.native="$emit('click-title', title)"
      )
    .title-line-option
      template(v-if="option === 'text'")
        .title-line-option__text
          material-button(
            :text="text"
            size="small"
            color="twitter"
            @click.native="$emit('click-option-text')"
            )
      template(v-else)
        .title-line-option__icon
          material-button(
            :name="name"
            color="twitter"
            horizon="short"
            @click.native="$emit('click-option-icon', title)"
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
    trigger: {
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
  }
}
</script>

<style lang="scss" scoped>
  .title-line {
    display: flex;
    padding: 1rem;
    align-items: center;
    justify-content: space-between;

    &.-trigger {
      &:active {
        background-color: #f7f7f7;
      }
    }
  }

  .title-line-option {
    &__text {
      margin-right: -.5rem;
    }
  }
</style>
