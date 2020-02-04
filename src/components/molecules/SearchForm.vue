<template lang="pug">
  form.search-form(
    :class="propsClassGenerator"
    @submit.prevent="$emit('enter-submit')"
    )
    .search-form__icon
      svg-sprite(name="search")
    .search-form__input
      input-text(
        placeholder="キーワードを入力"
        v-model="innerInputText"
        @focus.native="focus"
        @blur.native="blur"
        )
    .search-form__clear
      svg-sprite(
        v-show="innerInputText"
        name="clear"
        @click.native="$emit('clear-click')"
        )
</template>

<script>
import SvgSprite from '@/components/atoms/SvgSprite.vue'
import InputText from '@/components/atoms/InputText.vue'

export default {
  components: {
    SvgSprite,
    InputText
  },
  model: {
    prop: 'inputText',
    event: 'input'
  },
  props: {
    inputText: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      active: false
    }
  },
  computed: {
    innerInputText: {
      get() {
        return this.inputText
      },
      set(val) {
        this.$emit('input', val)
      }
    },
    propsClassGenerator() {
      return { '-active': this.active }
    }
  },
  methods: {
    focus() {
      this.active = true
    },
    blur() {
      this.active = false
    }
  }
}
</script>

<style lang="scss" scoped>
  .search-form {
    display: flex;
    padding: 0 .5rem;
    align-items: center;
    border: 2px solid transparent;
    border-radius: 5px;
    background-color: #f7f7f7;

    &.-active {
      border-color: rgba(26, 161, 242, .5);
    }

    &__icon , &__clear {
      height: 100%;
      font-size: 0;
    }

    &__input {
      width: 100%;
    }
  }
</style>
