<template lang="pug">
  .details-bar
    .details-bar-icon
      template(v-if="iconType === 'user'")
        router-link.details-bar-icon__link(
          :to="screenName | convertUserPath"
          )
          user-icon(
            size="small"
            :url="icon"
            )
      template(v-else)
        .details-bar-icon__back
          material-button(
            name="chevron-left"
            color="twitter"
            horizon="short"
            :state="true"
            @click.native="back"
            )
    .details-bar-content
      template(v-if="contentType === 'user'")
        router-link.details-bar-content__link(
          :to="screenName | convertUserPath"
          )
          single-line-text(
            :text="name"
            size="small"
            weight="bold"
            )
      template(v-else-if="contentType === 'search'")
        form.details-bar-content-search(
          :class="{ '-focus': focused }"
          @submit.prevent="search"
          )
          .details-bar-content-search__icon
            svg-sprite(name="search")
          .details-bar-content-search__input
            input-text(
              placeholder="キーワードを入力"
              v-model="innerInputText"
              @focus.native="isFocused"
              @blur.native="isFocused"
              )
          .details-bar-content-search__clear
            svg-sprite(
              v-show="innerInputText"
              name="clear"
              @click.native="clear"
              )
      template(v-else)
        single-line-text(
          tag="h2"
          :text="name"
          size="large"
          weight="bold"
          @click.native="scrollToTop"
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
import MaterialButton from '@/components/atoms/MaterialButton.vue'
import UserIcon from '@/components/atoms/UserIcon.vue'
import SingleLineText from '@/components/atoms/SingleLineText.vue'
import SvgSprite from '@/components/atoms/SvgSprite.vue'
import InputText from '@/components/atoms/InputText.vue'

export default {
  components: {
    UserIcon,
    SingleLineText,
    MaterialButton,
    SvgSprite,
    InputText
  },
  filters: {
    convertTwitterPath(screenName) {
      return `https://twitter.com/${screenName}`
    },
    convertUserPath(screenName) {
      return `/${screenName}`
    }
  },
  model: {
    prop: 'inputText',
    event: 'input'
  },
  props: {
    iconType: {
      type: String,
      default: 'default',
      validator(val) {
        return ['default', 'user'].includes(val)
      }
    },
    contentType: {
      type: String,
      default: 'default',
      validator(val) {
        return ['default', 'user', 'search'].includes(val)
      }
    },
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
    },
    inputText: {
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
  data() {
    return {
      focused: false
    }
  },
  computed: {
    innerInputText: {
      get() {
        return this.inputText
      },
      set(val) {
        this.$emit('input', val)
      }
    },
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
    isFocused() {
      this.focused = !this.focused
    },
    search() {
      const { innerInputText } = this
      if (!innerInputText) return

      if (innerInputText.match(/^@.+?/)) {
        this.$router.push({ path: `/${innerInputText.replace('@', '')}` })
      } else {
        this.$router.push({ path: `/search/${encodeURIComponent(innerInputText)}` })
      }
    },
    clear() {
      this.innerInputText = ''
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
  }

  .details-bar-icon {
    margin-right: .5rem;

    &__back {
      margin-left: -.5rem;
    }
  }

  .details-bar-content {
    margin-right: 1rem;
    flex: 1 1 100%;
    overflow: hidden;
  }

  .details-bar-icon, .details-bar-content {
    &__link {
      text-decoration: none;
    }
  }

  .details-bar-content-search {
    display: flex;
    padding: 0 .5rem;
    align-items: center;
    border: 2px solid transparent;
    border-radius: 5px;
    background-color: #f7f7f7;

    &.-active {
      border-color: rgba(26, 161, 242, .5);
    }

    &__icon , &__clear {
      height: 100%;
      font-size: 0;
    }

    &__input {
      width: 100%;
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
