<template lang="pug">
  .user-profile-text
    .user-author
      .user-name
        block-text(
          :text="name"
          size="large"
          weight="bold"
          )
      .user-screen-name
        block-text(
          :text="screenName"
          brightness="2"
          )
    .user-descripstion
      block-text(
        :text="descripstion"
        )
    .user-state
      .user-follow
        inline-part(
          :part="follow"
          weight="bold"
          mr="025"
          )
        inline-part(
          part="フォロー中"
          weight="normal"
          brightness="2"
          )
      .user-followers
        inline-part(
          :part="followers"
          weight="bold"
          mr="025"
          )
        inline-part(
          part="フォロワー"
          weight="normal"
          brightness="2"
          )
</template>

<script>
import BlockText from '@/components/atoms/BlockText.vue'
import InlinePart from '@/components/atoms/InlinePart.vue'

export default {
  components: {
    BlockText,
    InlinePart
  },
  props: {
    name: {
      type: String,
      required: true
    },
    screenName: {
      type: String,
      required: true
    },
    descripstion: {
      type: String,
      required: true
    },
    follow: {
      type: [String, Number],
      required: true
    },
    followers: {
      type: [String, Number],
      required: true
    }
  }
}
</script>

<style scoped>
  .user-author, .user-descripstion {
    margin: 0 0 1rem 0;
  }

  .user-name {
    margin: 0 0 .25rem;
  }

  .user-state {
    display: flex;
  }

  .user-follow {
    margin: 0 1rem 0 0;
  }
</style>
