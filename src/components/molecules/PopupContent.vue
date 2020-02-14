<template lang="pug">
  .popup-content
    ul.popup-content-list
      template(v-for="item in items")
        li.popup-content-list-item
          template(v-if="item.to")
            router-link.popup-content-list-item__link(
              :to="item.to"
              )
              inline-icon-text(
                :name="item.name"
                :text="item.text"
                size="small"
                )
          template(v-else-if="item.href")
            a.popup-content-list-item__link(
              :href="item.href"
              target="_blank"
              )
              inline-icon-text(
                :name="item.name"
                :text="item.text"
                size="small"
                )
          template(v-else)
            .popup-content-list-item__raw
              inline-icon-text(
                :name="item.name"
                :text="item.text"
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
  }

  .popup-content-list-item {
    &__link {
      display: block;
      text-decoration: none;
    }

    &__link, &__raw {
      padding: 1rem;
    }
  }
</style>
