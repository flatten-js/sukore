<template lang="pug">
  pickup-detail-template
    template(v-slot:user-detail-bar)
      user-detail-bar
</template>

<script>
import PickupDetailTemplate from '@/components/templates/PickupDetailTemplate.vue'
import UserDetailBar from '@/components/organisms/UserDetailBar.vue'

export default {
  components: {
    PickupDetailTemplate,
    UserDetailBar
  }
}
</script>
