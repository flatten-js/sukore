<template lang="pug" functional>
  .feature-user-icon(
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
  .feature-user-icon {
    width: 70px;
    height: 70px;
    border: 3px solid #fff;
    border-radius: 50%;
    background-size: cover;
    background-color: #dcdcdc;
    box-sizing: border-box;
  }
</style>
