<template lang="pug">
  .thumbnail-head
    router-link.thumbnail-head-link(
      :to="id | convertDetailsPath(screenName)"
      )
      .thumbnail-head-link__background
        head-banner(
          type="thumbnail"
          :url="url"
          )
      .thumbnail-head-link__badge
        template(v-if="imageCount > 1")
          text-badge(
            name="collections"
            :text="imageCount"
            size="small"
            )
      .thumbnail-head-link-body
        .thumbnail-head-link-body-details
          .thumbnail-head-link-body-details__heading
            multi-line-text(
              :text="query"
              color="white"
              size="large"
              weight="bold"
              )
          .thumbnail-head-link-body-details__text
            multi-line-text(
              :text="text | convertTextOmit"
              color="white"
              size="small"
              )
        .thumbnail-head-link-body__like(
          @click.prevent="emittingLike"
          )
          material-button(
            type="othello"
            name="like"
            color="like"
            horizon="short"
            :state="state"
            )
</template>

<script>
import HeadBanner from '@/components/atoms/HeadBanner.vue'
import TextBadge from '@/components/atoms/TextBadge.vue'
import MultiLineText from '@/components/atoms/MultiLineText.vue'
import MaterialButton from '@/components/atoms/MaterialButton.vue'

export default {
  components: {
    HeadBanner,
    TextBadge,
    MultiLineText,
    MaterialButton
  },
  filters: {
    convertDetailsPath(id, screenName) {
      return `/${screenName}/media/${id}`
    },
    convertTextOmit(text) {
      return text.split(/\s/)[0]
    }
  },
  props: {
    url: [String, null],
    id: {
      type: String,
      required: true
    },
    screenName: {
      type: String,
      reqired: true
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
    emittingLike() {
      this.$emit('like-click', this.id)
    }
  }
}
</script>

<style lang="scss" scoped>
  .thumbnail-head-link {
    position: relative;
    display: block;
    height: 100%;

    &::before {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background-color: rgba(26, 26, 26, .75);
    }

    &__badge {
      position: absolute;
      top: 1rem;
      right: 1rem;
    }
  }

  .thumbnail-head-link-body {
    display: flex;
    position: absolute;
    width: 100%;
    padding: 1rem;
    bottom: 0;
    left: 0;
    align-items: flex-end;
    justify-content: space-between;
    box-sizing: border-box;

    &__like {
      margin-left: .5rem;
      font-size: 0;
    }
  }

  .thumbnail-head-link-body-details {
    &__heading {
      margin: 0 0 .5rem;
    }
  }
</style>
