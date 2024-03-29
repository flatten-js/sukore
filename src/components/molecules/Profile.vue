<template lang="pug">
  .profile
    .profile__head
      head-banner(:url="head")
    .profile-details
      .profile-details-head
        .profile-details-head__icon
          user-icon(
            :url="icon"
            size="large"
            border
            )
        .profile-details-head-tools(ref="tools")
          .profile-details-head-tools__menu
            material-button(
              type="simple"
              name="dots-horizontal"
              color="twitter"
              size="small"
              horizon="short"
              @click.native="$emit('menu-click')"
              )
          .profile-details-head-tools__fave
            material-button(
              type="simple"
              color="twitter"
              size="small"
              :state="fave"
              :text="toggleFaveSettingText"
              @click.native="$emit('fave-click')"
              )
      .profile-details__name
        multi-line-text(
          :text="name"
          size="xl"
          weight="xb"
          )
      .profile-details__screen-name
        single-line-text(
          :text="screenName | convertTwitterScreenName"
          size="small"
          brightness="2"
          )
      .profile-details__description
        extract-text(
          :text="description | convertCustomUrlText(entities.descriptions)"
          )
      .profile-details-remarks
        template(v-if="remarks.location")
          span.profile-details-remarks__location
            inline-icon-text(
              name="map-pin"
              :text="remarks.location"
              size="small"
              brightness="2"
              space="small"
              )
        template(v-if="remarks.link")
          span.profile-details-remarks__link
            inline-icon-text(
              type="link"
              name="link"
              :url-text="remarks.link | convertCustomUrlText(entities.urls)"
              size="small"
              color="twitter"
              space="small"
              )
      .profile-details-status
        .profile-details-status__following
          individuality(
            :text="status.following | convertCommaFormat"
            weight="bold"
            mr="025"
            )
          | フォロー中
        .profile-details-status__followers
          individuality(
            :text="status.followers | convertCommaFormat"
            weight="bold"
            mr="025"
            )
          | フォロワー
</template>

<script>
import HeadBanner from '@/components/atoms/HeadBanner.vue'
import UserIcon from '@/components/atoms/UserIcon.vue'
import MaterialButton from '@/components/atoms/MaterialButton.vue'
import MultiLineText from '@/components/atoms/MultiLineText.vue'
import SingleLineText from '@/components/atoms/SingleLineText.vue'
import Individuality from '@/components/atoms/Individuality.vue'
import ExtractText from '@/components/atoms/ExtractText.vue'
import InlineIconText from '@/components/atoms/InlineIconText.vue'

export default {
  components: {
    HeadBanner,
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
    head: [String, null],
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
    fave: {
      type: Boolean,
      required: true
    },
    entities: {
      type: Object,
      default: () => {}
    },
    status: {
      type: Object,
      default: () => ({
        following: '',
        followers: ''
      })
    },
    remarks: {
      type: Object,
      default: () => ({
        location: '',
        link: ''
      })
    }
  },
  computed: {
    toggleFaveSettingText() {
      return this.fave ? '推しに設定中' : '推しに設定'
    }
  },
  mounted() {
    this.$emit('fave-offset-pass', this.$refs.tools.offsetTop)
  }
}
</script>

<style lang="scss" scoped>
  .profile {
    background-color: #fff;
  }

  .profile-details {
    padding: 1rem;
    box-sizing: border-box;

    &__name {
      margin: 0 0 .25rem;
    }

    &__screen-name, &__description {
      margin: 0 0 1rem;
    }
  }

  .profile-details-head {
    display: flex;
    margin: 0 0 1rem;
    justify-content: space-between;

    &__icon {
      display: inline-block;
      margin: -45px 0 0;
    }
  }

  .profile-details-head-tools {
    display: flex;
    align-items: center;

    &__menu {
      margin-right: .5rem;
    }
  }

  .profile-details-remarks {
    margin: 0 0 1rem;
    white-space: pre-wrap;
    word-wrap: break-word;
  }

  .profile-details-status {
    display: flex;
    color: rgba(26, 26, 26, .75);

    &__following {
      margin-right: 1rem;
    }
  }
</style>
