<template lang="pug">
  .user-details-bar
    .user-details-bar__icon
      router-link.user-details-bar-icon__link(
        :to="screenName | convertUserPath"
        )
        user-icon(
          size="small"
          :url="icon"
          )
    .user-details-bar__name
      router-link.user-details-bar-name__link(
        :to="screenName | convertUserPath"
        )
        single-line-text(
          :text="name"
          size="small"
          weight="bold"
          )
    .user-details-bar__options
      template(v-if="option === 'menu'")
        .user-details-bar-options__menu
          material-button(
            name="dots-horizontal"
            color="twitter"
            horizon="short"
            )
      template(v-else)
        .user-details-bar-options__button
          material-button(
            type="simple"
            tag="a"
            :href="screenName | convertTwitterPath"
            vertical="short"
            color="twitter"
            size="small"
            :state="true"
            text="Twitterを見る"
            )
</template>

<script>
import UserIcon from '@/components/atoms/UserIcon.vue'
import SingleLineText from '@/components/atoms/SingleLineText.vue'
import MaterialButton from '@/components/atoms/MaterialButton.vue'

export default {
  components: {
    UserIcon,
    SingleLineText,
    MaterialButton
  },
  filters: {
    convertTwitterPath(screenName) {
      return `https://twitter.com/${screenName}`
    },
    convertUserPath(screenName) {
      return `/${screenName}`
    }
  },
  props: {
    icon: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    screenName: {
      type: String,
      required: true
    },
    option: {
      type: String,
      default: 'menu',
      validator(val) {
        return ['menu', 'button'].includes(val)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .user-details-bar {
    display: flex;
    padding: .5rem 1rem;
    align-items: center;
    box-sizing: border-box;

    &__icon {
      margin-right: .5rem;
    }

    &__name {
      margin-right: 1rem;
      flex: 1 1 100%;
      overflow: hidden;
    }
  }

  .user-details-bar-icon, .user-details-bar-name {
    &__link {
      text-decoration: none;
    }
  }

  .user-details-bar-options {
    &__menu {
      margin-right: -.5rem;
    }

    &__button {
      word-break: keep-all;
    }
  }
</style>
