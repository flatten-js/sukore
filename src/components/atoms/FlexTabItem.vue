<template lang="pug">
  router-link.flex-tab-item(
    :class="propsClassGenerator"
    :to="to"
    active-class="-active"
    exact-active-class="-exact-active"
    exact
    )
    | {{ text }}
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    match: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    propsClassGenerator() {
      const { match } = this

      return {
        ['-match']: match
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .flex-tab-item {
    padding: 1rem;
    font-size: .875rem;
    font-weight: bold;
    text-align: center;
    text-decoration: none;
    color: #1a1a1a;

    &.-exact-active {
      color: rgba(26, 26, 26, 1);
      border-bottom: 3px solid #1a1a1a;
    }

    &:not(.-exact-active) {
      color: rgba(26, 26, 26, .5);
      border-bottom: 3px solid transparent;
    }

    &.-match {
      flex: 1 1 auto;
    }
  }
</style>
