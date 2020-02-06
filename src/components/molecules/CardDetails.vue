<template lang="pug">
  .card-details
    .card-details-body
      .card-details-body__comment
        extract-text(
          :text="comment | convertLastUrlRemoval | convertCustomUrlText(urlList)"
          )
      .card-details-body__created
        single-line-text(
          :text="created"
          size="small"
          brightness="2"
          )
    .card-details__like(
      @click="emittingLike"
      )
      material-button(
        type="othello"
        tag="svg"
        name="like"
        color="like"
        horizon="short"
        :state="state"
        )
</template>

<script>
import ExtractText from '@/components/atoms/ExtractText.vue'
import SingleLineText from '@/components/atoms/SingleLineText.vue'
import MaterialButton from '@/components/atoms/MaterialButton.vue'

export default {
  components: {
    ExtractText,
    SingleLineText,
    MaterialButton
  },
  filters: {
    convertLastUrlRemoval(comment) {
      return comment.replace(/\s(?:https?:\/\/[\w/$?.+-:%#&~=@]+)$/, '')
    },
    convertCustomUrlText(comment, urlList) {
      return urlList.reduce((acc, cur) => {
        return acc.replace(cur.url, `${cur.expanded_url}::${cur.url}?amp=1::${cur.display_url}`)
      }, comment)
    }
  },
  props: {
    id: {
      type: String,
      reqired: true
    },
    comment: {
      type: String,
      reqired: true
    },
    urlList: {
      type: Array,
      default: () => []
    },
    created: {
      type: String,
      reqired: true
    },
    state: {
      type: Boolean,
      reqired: true
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
  .card-details {
    display: flex;
    padding: 1rem;
    align-items: flex-start;
    justify-content: space-between;
    box-sizing: border-box;

    &__like {
      margin-left: .5rem;
    }
  }

  .card-details-body {
    &__comment {
      margin: 0 0 .5rem;
    }
  }
</style>
