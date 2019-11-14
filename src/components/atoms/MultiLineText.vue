<template lang="pug" functional>
  .multi-line-text {{ props.text }}
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    }
  }
}
</script>
