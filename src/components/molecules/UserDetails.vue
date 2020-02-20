<template lang="pug">
  .user-details
    .user-details__user-head
      head-banner(:url="masthead")
    .user-profile
      .user-profile-head
        .user-profile-head__icon
          user-icon(
            :url="icon"
            border
            )
        .user-profile-head-tools(ref="tools")
          .user-profile-head-tools__menu
            material-button(
              type="simple"
              name="dots-horizontal"
              color="twitter"
              size="small"
              horizon="short"
              @click.native="$emit('menu-click')"
              )
          .user-profile-head-tools__fave
            material-button(
              type="simple"
              color="twitter"
              size="small"
              :state="fave"
              :text="toggleFaveSettingText"
              @click.native="emmitingFave"
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
      .user-profile-remarks
        template(v-if="remarks.location")
          span.user-profile-remarks__location
            inline-icon-text(
              name="map-pin"
              :text="remarks.location"
              size="small"
              brightness="2"
              space="small"
              )
        template(v-if="remarks.link")
          span.user-profile-remarks__link
            inline-icon-text(
              type="link"
              name="link"
              :url-text="remarks.link | convertCustomUrlText(urlObject.url)"
              size="small"
              color="twitter"
              space="small"
              )
      .user-profile-status
        .user-profile-status__following
          individuality(
            :text="status.following | convertCommaFormat"
            weight="bold"
            mr="025"
            )
          | フォロー中
        .user-profile-status__followers
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
    fave: {
      type: Boolean,
      required: true
    },
    urlObject: {
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
  },
  methods: {
    emmitingFave() {
      this.$emit('fave-click')
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
    justify-content: space-between;

    &__icon {
      display: inline-block;
      margin: -45px 0 0;
    }
  }

  .user-profile-head-tools {
    display: flex;
    align-items: center;

    &__menu {
      margin-right: .5rem;
    }
  }

  .user-profile {
    padding: 1rem;
    box-sizing: border-box;

    &__name {
      margin: 0 0 .25rem;
    }

    &__screen-name, &__description {
      margin: 0 0 1rem;
    }
  }

  .user-profile-remarks {
    margin: 0 0 1rem;
    white-space: pre-wrap;
    word-wrap: break-word;
  }

  .user-profile-status {
    display: flex;
    color: rgba(26, 26, 26, .75);

    &__following {
      margin-right: 1rem;
    }
  }
</style>
