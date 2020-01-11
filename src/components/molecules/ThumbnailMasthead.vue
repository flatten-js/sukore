<template lang="pug">
  .thumbnail-masthead
    .thumbnail-masthead__image
      head-banner(
        type="thumbnail"
        :url="url"
        )
    .thumbnail-masthead__badge
      template(v-if="imageCount > 1")
        text-badge(
          name="collections"
          :text="imageCount"
          )
    .thumbnail-masthead-body
      .thumbnail-masthead-description
        .thumbnail-masthead-description__query
          multi-line-text(
            :text="query"
            color="white"
            size="large"
            weight="bold"
            )
        .thumbnail-masthead-description__text
          multi-line-text(
            :text="text | convertTextOmitted"
            color="white"
            size="small"
            )
      .thumbnail-masthead-body__like(
        :class="{ '-active': state }"
        @click.prevent="clickLikeIcon"
        )
        svg-sprite(
          name="like"
          size="large"
          shadow
          )
</template>

<script>
import HeadBanner from '@/components/atoms/HeadBanner.vue'
import TextBadge from '@/components/atoms/TextBadge.vue'
import MultiLineText from '@/components/atoms/MultiLineText.vue'
import SvgSprite from '@/components/atoms/SvgSprite.vue'

export default {
  components: {
    HeadBanner,
    TextBadge,
    MultiLineText,
    SvgSprite
  },
  filters: {
    convertTextOmitted(text, limit = 30) {
      return `${text.slice(0, limit)}…`
    }
  },
  props: {
    url: [String, null],
    id: {
      type: String,
      required: true
    },
    query: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    imageCount: {
      type: Number,
      required: true
    },
    state: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    clickLikeIcon() {
      this.$emit('clickLikeIcon', this.id)
    }
  }
}
</script>

<style lang="scss" scoped>
  .thumbnail-masthead {
    position: relative;

    &::before {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background-color: rgba(26, 26, 26, .5);
    }

    &__badge {
      position: absolute;
      top: 1rem;
      right: 1rem;
      border-radius: 25px;
      box-shadow: 0 2px 5px rgba(26, 26, 26, 0.26);
    }
  }

  .thumbnail-masthead-body {
    display: flex;
    position: absolute;
    width: 100%;
    padding: 1rem .5rem .5rem 1rem;
    bottom: 0;
    left: 0;
    align-items: flex-end;
    justify-content: space-between;
    box-sizing: border-box;

    &__like {
      padding: .5rem;
      bottom: 1rem;
      right: 1rem;
      line-height: 0;
      color: rgba(255, 255, 255, .95);

      &.-active {
        color: #FF4063;
      }
    }
  }

  .thumbnail-masthead-description {
    min-width: 80%;
    margin: 0 0 .5rem;

    &__query {
      margin: 0 0 .5rem;
    }
  }
</style>
