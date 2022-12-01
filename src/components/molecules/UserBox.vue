<template lang="pug">
  .user-box(
    @click="$emit('click-this', screenName)"
    )
    .user-box__icon
      user-icon(
        :url="icon"
        )
    .user-box__name
      single-line-text(
        :text="name"
        size="xs"
        weight="bold"
        )
    .user-box__screen_name
      single-line-text(
        :text="screenName"
        size="xs"
        brightness="2"
        )
</template>

<script>
import UserIcon from '@/components/atoms/UserIcon.vue'
import SingleLineText from '@/components/atoms/SingleLineText.vue'

export default {
  components: {
    UserIcon,
    SingleLineText
  },
  filters: {
    convertUserPath(screenName) {
      return `/${screenName}`
    }
  },
  props: {
    icon: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    screenName: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
  .user-box {
    min-width: 25%;
    margin-right: .5rem;
    text-align: center;
    text-decoration: none;

    &__icon {
      margin-bottom: .5rem;

      .user-icon {
        margin: auto;
      }
    }
  }
</style>
