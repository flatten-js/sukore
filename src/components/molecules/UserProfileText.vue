<template lang="pug">
  .user-profile-text
    .user-name
      block-heading(:text="name")
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
          mr="05"
          )
        inline-part(
          part="フォロー中"
          weight="normal"
          )
      .user-followers
        inline-part(
          :part="followers"
          weight="bold"
          mr="05"
          )
        inline-part(
          part="フォロワー"
          weight="normal"
          )
</template>

<script>
import BlockHeading from '@/components/atoms/BlockHeading.vue'
import BlockText from '@/components/atoms/BlockText.vue'
import InlinePart from '@/components/atoms/InlinePart.vue'

export default {
  components: {
    BlockHeading,
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
      type: String,
      required: true
    },
    followers: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
  .user-name, .user-descripstion {
    margin: 0 0 1rem 0;
  }

  .user-state {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }
</style>
