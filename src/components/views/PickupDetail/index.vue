<template lang="pug">
  pickup-detail-template
    template(v-slot:user-detail-bar)
      user-detail-bar
        template(v-slot:user-icon)
          user-icon(:src="mediaFromId.icon")
</template>

<script>
import { mapGetters } from 'vuex'

import PickupDetailTemplate from '@/components/templates/PickupDetailTemplate.vue'
import UserDetailBar from '@/components/organisms/UserDetailBar.vue'
import UserIcon from '@/components/molecules/UserIcon.vue'

export default {
  components: {
    PickupDetailTemplate,
    UserDetailBar,
    UserIcon
  },
  props: {
    id: {
      type: String,
      reqired: true
    }
  },
  computed: {
    ...mapGetters([
      'mediaListDuplicateNo'
    ]),
    mediaFromId() {
      const { mediaListDuplicateNo, id } = this
      const index = mediaListDuplicateNo.findIndex(media => media.id == id)

      return mediaListDuplicateNo[index]
    }
  }
}
</script>
