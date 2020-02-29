<template lang="pug">
  .details-bar
    .details-bar-icon
      template(v-if="type === 'simple'")
        .details-bar-icon__back
          material-button(
            name="chevron-left"
            color="twitter"
            horizon="short"
            :state="true"
            @click.native="back"
            )
      template(v-else)
        router-link.details-bar-icon__link(
          :to="screenName | convertUserPath"
          )
          user-icon(
            size="small"
            :url="icon"
            )
    .details-bar__content
      template(v-if="type === 'simple'")
        single-line-text(
          tag="h2"
          :text="name"
          size="large"
          weight="bold"
          @click.native="scrollToTop"
          )
      template(v-else)
        router-link.details-bar-content__link(
          :to="screenName | convertUserPath"
          )
          single-line-text(
            :text="name"
            size="small"
            weight="bold"
            )
    .details-bar__options
      template(v-if="option === 'twitter'")
        .details-bar-options__button
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
        .details-bar-options__button
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
      template(v-else-if="option === 'none'")
        //- none
      template(v-else)
        .details-bar-options__menu
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
      default: ''
    },
    option: {
      type: String,
      default: 'menu',
      validator(val) {
        return ['menu', 'twitter', 'fave', 'none'].includes(val)
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
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    },
    emmitingFave() {
      this.$emit('fave-click')
    }
  }
}
</script>

<style lang="scss" scoped>
  .details-bar {
    display: flex;
    height: 50px;
    padding: .5rem 1rem;
    align-items: center;
    box-sizing: border-box;

    &__content {
      margin-right: 1rem;
      flex: 1 1 100%;
      overflow: hidden;
    }
  }

  .details-bar-icon {
    margin-right: .5rem;

    &__back {
      margin-left: -.5rem;
    }
  }

  .details-bar-icon, .details-bar-content {
    &__link {
      text-decoration: none;
    }
  }

  .details-bar-options {
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
