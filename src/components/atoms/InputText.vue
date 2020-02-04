<template lang="pug">
  input.input-text(
    :type="type"
    :placeholder="placeholder"
    v-model="innerInputText"
    )
</template>

<script>
export default {
  model: {
    prop: 'inputText',
    event: 'input'
  },
  props: {
    type: {
      type: String,
      default: 'text',
      validator(val) {
        return ['text'].includes(val)
      }
    },
    placeholder: {
      type: String,
      default: ''
    },
    inputText: {
      type: String,
      default: ''
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
    }
  }
}
</script>

<style lang="scss" scoped>
  .input-text {
    display: inline;
    width: 100%;
    padding: .5rem;
    font-size: .9rem;
    border: none;
    background-color: transparent;
    outline: 0;
    box-sizing: border-box;
  }
</style>
