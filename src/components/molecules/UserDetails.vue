<template lang="pug">
  .user-details
    .user-details__user-head
      masthead(:url="masthead")
    .user-details__user-body.user-profile
      .user-profile__icon
        user-icon(
          :url="icon"
          border
          )
      .user-profile__name
        multi-line-text(
          :text="name"
          size="large"
          weight="bold"
          )
      .user-profile__screen-name
        single-line-text(:text="screenName | convertTwitterScreenName")
      .user-profile__description
        extract-text(
          :text="description | convertCustomUrlText(urlList)"
          )
      .user-profile__remarks.user-profile-remarks
        template(v-if="location")
          span.user-profile-remarks__location
            inline-icon-text(
              :text="location"
              name="room"
              brightness="2"
              )
      .user-profile__status.user-profile-status
        router-link.user-profile-status__following(
          :to="screenName | convertUserStatusPath('following')"
          )
          individuality(
            :text="following"
            weight="bold"
            mr="025"
            )
          | フォロー中
        router-link.user-profile-status__followers(
          :to="screenName | convertUserStatusPath('followers')"
          )
          individuality(
            :text="followers"
            weight="bold"
            mr="025"
            )
          | フォロワー
</template>

<script>
import Masthead from '@/components/atoms/Masthead.vue'
import UserIcon from '@/components/atoms/UserIcon.vue'
import MultiLineText from '@/components/atoms/MultiLineText.vue'
import SingleLineText from '@/components/atoms/SingleLineText.vue'
import Individuality from '@/components/atoms/Individuality.vue'
import ExtractText from '@/components/atoms/ExtractText.vue'
import MaterialIcons from '@/components/atoms/MaterialIcons.vue'
import InlineIconText from '@/components/atoms/InlineIconText.vue'

export default {
  components: {
    Masthead,
    UserIcon,
    MultiLineText,
    SingleLineText,
    Individuality,
    ExtractText,
    MaterialIcons,
    InlineIconText
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
    urlList: {
      type: Array,
      default: () => []
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
    }
  },
  filters: {
    convertTwitterScreenName(screenName) {
      return `@${screenName}`
    },
    convertUserStatusPath(screenName, status) {
      return `/${screenName}/${status}`
    },
    convertCustomUrlText(description, urlList) {
      return urlList.reduce((acc, cur) => {
        return acc.replace(cur.url, `${cur.expanded_url}::${cur.url}?amp=1::${cur.display_url}`)
      }, description)
    }
  }
}
</script>

<style lang="scss" scoped>
  .user-details {
    background-color: #fff;

    &__user-body {
      padding: 0 1rem 1rem 1rem;
      box-sizing: border-box;
    }
  }

  .user-profile {
    &__icon {
      display: inline-block;
      margin: -35px 0 1rem;
    }

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
