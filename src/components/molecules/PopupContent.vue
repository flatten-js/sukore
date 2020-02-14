<template lang="pug">
  .popup-content
    ul.popup-content-list
      template(v-for="item in items")
        li.popup-content-list__item
          inline-icon-text(
            :name="item.name"
            :text="item.text"
            brightness="2"
            size="small"
            )
    .popup-content__cancel
      material-button(
        type="keep-alive"
        text="キャンセル"
        color="system"
        horizon="match"
        @click.native="$emit('cancel-click')"
        )
</template>

<script>
import InlineIconText from '@/components/atoms/InlineIconText.vue'
import MaterialButton from '@/components/atoms/MaterialButton.vue'

export default {
  components: {
    InlineIconText,
    MaterialButton
  },
  props: {
    items: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss" scoped>
  .popup-content {
    margin: 0;
    background-color: white;

    &__cancel {
      padding: .5rem 1rem;
    }
  }

  .popup-content-list {
    margin: 0;
    padding: 0;
    list-style: none;

    &__item {
      padding: 1rem;
    }
  }
</style>
