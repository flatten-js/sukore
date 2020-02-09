<template lang="pug">
  .user-details-bar
    .user-details-bar-icon
      template(v-if="type === 'simple'")
        .user-details-bar-icon__back
          material-button(
            name="chevron-left"
            color="twitter"
            horizon="short"
            :state="true"
            @click.native="back"
            )
      template(v-else)
        router-link.user-details-bar-icon__link(
          :to="screenName | convertUserPath"
          )
          user-icon(
            size="small"
            :url="icon"
            )
    .user-details-bar__name
      template(v-if="type === 'simple'")
        single-line-text(
          tag="h2"
          :text="name"
          size="large"
          weight="bold"
          )
      template(v-else)
        router-link.user-details-bar-name__link(
          :to="screenName | convertUserPath"
          )
          single-line-text(
            :text="name"
            size="small"
            weight="bold"
            )
    .user-details-bar__options
      template(v-if="option === 'twitter'")
        .user-details-bar-options__button
          material-button(
            v-show="adjust"
            type="simple"
            tag="a"
            :href="screenName | convertTwitterPath"
            vertical="short"
            color="twitter"
            size="small"
            :state="true"
            text="Twitterを見る"
            )
      template(v-else-if="option === 'fave'")
        .user-details-bar-options__button
          transition(name="fade")
            material-button(
              v-show="adjust"
              type="simple"
              color="twitter"
              size="small"
              :state="fave"
              :text="toggleFaveSettingText"
              @click.native="emmitingFave"
              )
      template(v-else)
        .user-details-bar-options__menu
          material-button(
            name="dots-horizontal"
            color="twitter"
            horizon="short"
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
    type: {
      type: String,
      default: 'default',
      validator(val) {
        return ['default', 'simple'].includes(val)
      }
    },
    icon: {
      type: String,
      default: ''
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
        return ['menu', 'twitter', 'fave'].includes(val)
      }
    },
    adjust: {
      type: Boolean,
      default: true
    },
    fave: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    toggleFaveSettingText() {
      return this.fave ? '推しに設定中' : '推しに設定'
    }
  },
  methods: {
    back() {
      this.$router.back()
    },
    emmitingFave() {
      this.$emit('fave-click')
    }
  }
}
</script>

<style lang="scss" scoped>
  .user-details-bar {
    display: flex;
    height: 50px;
    padding: .5rem 1rem;
    align-items: center;
    box-sizing: border-box;

    &__name {
      margin-right: 1rem;
      flex: 1 1 100%;
      overflow: hidden;
    }
  }

  .user-details-bar-icon {
    margin-right: .5rem;

    &__back {
      margin-left: -.5rem;
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

  @keyframes fade {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .fade-enter-active {
    animation: fade .2s;
  }

  .fade-leave-active {
    animation: fade .2s reverse;
  }

</style>
