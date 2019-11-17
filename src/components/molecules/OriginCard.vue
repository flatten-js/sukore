<template lang="pug">
  figure.origin-card
    .origin-card__image
      template(v-for="src in viewAll")
        width-standard-image(
          :src="src"
          )
      .image-more
        template(v-if="size > 1 && limit")
          anchor-button(
            href="#"
            text="すべて見る"
            type="more"
            @click.native.prevent="limit = !limit"
            )
    figcaption.card-details
      .card-details__comment
        multi-line-text(:text="comment")
      .card-details__createdAt
        single-line-text(
          :text="created"
          size="small"
          brightness="2"
          )
</template>

<script>
import WidthStandardImage from '@/components/atoms/WidthStandardImage.vue'
import AnchorButton from '@/components/atoms/AnchorButton.vue'
import MultiLineText from '@/components/atoms/MultiLineText.vue'
import SingleLineText from '@/components/atoms/SingleLineText.vue'

export default {
  components: {
    WidthStandardImage,
    AnchorButton,
    MultiLineText,
    SingleLineText
  },
  props: {
    srcList: {
      type: Array,
      required: true
    },
    comment: {
      type: String,
      required: true
    },
    created: {
      type: String,
      required: true
    },
    size: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      limit: true
    }
  },
  computed: {
    viewAll() {
      const { srcList, limit } = this

      return srcList.filter((src, index) => {
        return limit ? !index : true
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .origin-card {
    margin: 0;

    &__image {
      position: relative;
      font-size: 0;
      background-color: #f7f7f7;

      .width-standard-image {
        &:not(:nth-last-child(2)) {
          margin: 0 0 1rem;
        }
      }
    }
  }

  .image-more {
    position: absolute;
    bottom: 1rem;
    left: 50%;
    transform: translateX(-50%);
  }

  .card-details {
    padding: 1rem;
    box-sizing: border-box;

    &__comment {
      margin: 0 0 .5rem;
    }
  }
</style>
