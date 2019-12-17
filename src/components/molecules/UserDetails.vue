<template lang="pug">
  .user-details
    .user-details__user-head
      masthead(:url="masthead")
    .user-profile
      .user-profile-head
        .user-profile-head__icon
          user-icon(
            :url="icon"
            border
            )
        .user-profile-head__tools
          material-button(
            color="twitter"
            size="small"
            text="ホームに設定"
            )
      .user-profile__name
        multi-line-text(
          :text="name"
          size="xl"
          weight="xb"
          )
      .user-profile__screen-name
        single-line-text(
          :text="screenName | convertTwitterScreenName"
          size="small"
          brightness="2"
          )
      .user-profile__description
        extract-text(
          :text="description | convertCustomUrlText(urlObject.description)"
          )
      .user-profile__remarks.user-profile-remarks
        template(v-if="location")
          span.user-profile-remarks__location
            inline-icon-text(
              name="map-pin"
              :text="location"
              size="small"
              brightness="2"
              )
        template(v-if="link")
          span.user-profile-remarks__link
            inline-icon-text(
              type="link"
              name="link"
              :url-text="link | convertCustomUrlText(urlObject.url)"
              size="small"
              brightness="2"
              )
      .user-profile__status.user-profile-status
        router-link.user-profile-status__following(
          :to="screenName | convertUserStatusPath('following')"
          )
          individuality(
            :text="following | convertCommaFormat"
            weight="bold"
            mr="025"
            )
          | フォロー中
        router-link.user-profile-status__followers(
          :to="screenName | convertUserStatusPath('followers')"
          )
          individuality(
            :text="followers | convertCommaFormat"
            weight="bold"
            mr="025"
            )
          | フォロワー
</template>

<script>
import Masthead from '@/components/atoms/Masthead.vue'
import UserIcon from '@/components/atoms/UserIcon.vue'
import MaterialButton from '@/components/atoms/MaterialButton.vue'
import MultiLineText from '@/components/atoms/MultiLineText.vue'
import SingleLineText from '@/components/atoms/SingleLineText.vue'
import Individuality from '@/components/atoms/Individuality.vue'
import ExtractText from '@/components/atoms/ExtractText.vue'
import InlineIconText from '@/components/atoms/InlineIconText.vue'

export default {
  components: {
    Masthead,
    UserIcon,
    MaterialButton,
    MultiLineText,
    SingleLineText,
    Individuality,
    ExtractText,
    InlineIconText
  },
  filters: {
    convertTwitterScreenName(screenName) {
      return `@${screenName}`
    },
    convertUserStatusPath(screenName, status) {
      return `/${screenName}/${status}`
    },
    convertCustomUrlText(text, urls) {
      return urls.reduce((acc, cur) => {
        return acc.replace(cur.url, `${cur.expanded_url}::${cur.url}?amp=1::${cur.display_url}`)
      }, text)
    },
    convertCommaFormat(number) {
      return number.toLocaleString()
    }
  },
  props: {
    masthead: [String, null],
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
    description: {
      type: String,
      required: true
    },
    urlObject: {
      type: Object,
      default: () => {}
    },
    following: {
      type: [String, Number],
      required: true
    },
    followers: {
      type: [String, Number],
      required: true
    },
    location: {
      type: String,
      required: true
    },
    link: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
  .user-details {
    background-color: #fff;
  }

  .user-profile-head {
    display: flex;
    margin: 0 0 1rem;
    align-items: flex-end;
    justify-content: space-between;

    &__icon {
      display: inline-block;
      margin: -45px 0 0;
    }
  }

  .user-profile {
    padding: 0 1rem 1rem 1rem;
    box-sizing: border-box;

    &__name {
      margin: 0 0 .25rem;
    }

    &__screen-name, &__description {
      margin: 0 0 1rem 0;
    }

    &__remarks {
      margin: 0 0 1rem;
      white-space: pre-wrap;
      word-wrap: break-word;
    }

    &__status {
      display: flex;
    }
  }

  .user-profile-status {
    %common-style {
      color: rgba(26, 26, 26, .75);
      text-decoration: none;
    }

    &__following {
      @extend %common-style;
      margin-right: 1rem;
    }

    &__followers {
      @extend %common-style;
    }
  }
</style>
