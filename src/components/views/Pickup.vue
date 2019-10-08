<template lang="pug">
  pickup-template
    user-profile
      template(v-slot:header-image)
        header-image(url="https://pbs.twimg.com/profile_banners/1116639952593227776/1559138768/1500x500")
      template(v-slot:user-icon)
        user-icon(src="https://pbs.twimg.com/profile_images/1121787550094348290/GXS95HTF_400x400.png")
      template(v-slot:user-profile-text)
        user-profile-text(
          name="黒兎|Kurot"
          screenName="@kurokanin"
          descripstion="黒兎 (くろと)/Kurot | イラストレーター [ http://kurokanin.net ] play アズレン FKG GFL GBF KingsRaid FGO epic7 |♡vtubers | お仕事募集中♡ご依頼はメールにてお願いします。kurotworks@gmail.com"
          follow="609"
          followers="3.5万"
          )
    thumbnail-box-grid
      thumbnail-box(src="https://pbs.twimg.com/media/D5FNScbUUAIwh_7?format=png&name=small")
      thumbnail-box(src="https://pbs.twimg.com/media/EEbazt2U0AE8y37?format=jpg&name=small")
</template>

<script>
import PickupTemplate from '@/components/templates/PickupTemplate.vue'
import UserProfile from '@/components/organisms/UserProfile.vue'
import HeaderImage from '@/components/molecules/HeaderImage.vue'
import UserIcon from '@/components/molecules/UserIcon.vue'
import UserProfileText from '@/components/molecules/UserProfileText.vue'
import ThumbnailBoxGrid from '@/components/organisms/ThumbnailBoxGrid.vue'
import ThumbnailBox from '@/components/molecules/ThumbnailBox.vue'

export default {
  components: {
    PickupTemplate,
    UserProfile,
    HeaderImage,
    UserIcon,
    UserProfileText,
    ThumbnailBoxGrid,
    ThumbnailBox
  }
}
</script>
