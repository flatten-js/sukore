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
          :text="screenName | twitterScreenNameConversion"
          brightness="2"
          )
    .user-descripstion
      block-text(
        :text="descripstion"
        )
    .user-state
      router-link.user-following(:to="screenName | pathConversion('following')")
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
      router-link.user-followers(:to="screenName | pathConversion('followers')")
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
  },
  filters: {
    twitterScreenNameConversion(val) {
      return `@${val}`
    },
    pathConversion(val, type) {
      return `/${val}/${type}`
    }
  }
}
</script>

<style lang="scss" scoped>
  .user-author, .user-descripstion {
    margin: 0 0 1rem 0;
  }

  .user-name {
    margin: 0 0 .25rem;
  }

  .user-state {
    display: flex;
  }

  .user-following, .user-followers {
    text-decoration: none;
    border-bottom: 1px solid transparent;

    &:hover {
      border-color: #1a1a1a;
    }
  }

  .user-following {
    margin: 0 1rem 0 0;
  }
</style>
