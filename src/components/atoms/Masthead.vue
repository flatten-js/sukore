<template lang="pug" functional>
  .masthead(
    :style="{ backgroundImage: `url(${props.url})` }"
    )
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
  .masthead {
    width: 100%;
    height: 125px;
    background-size: contain;
    background-attachment: fixed;
    background-color: #d1d1d1;
  }
</style>
