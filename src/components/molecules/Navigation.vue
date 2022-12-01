<template lang="pug">
  nav.navigation
    template(v-for="item in items")
      router-link.navigation__tab(
        :to="item.to"
        active-class="-active"
        exact-active-class="-exact-active"
        @click.native="scrollToTop"
        )
        svg-sprite(
          :name="item.name"
          size="large"
          )
</template>

<script>
import SvgSprite from '@/components/atoms/SvgSprite.vue'

export default {
  components: {
    SvgSprite
  },
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.navigation {
  display: flex;
  justify-content: center;
  padding-bottom: env(safe-area-inset-bottom);

  &__tab {
    flex-grow: 1;
    padding: .75rem;
    text-align: center;
    color: rgba(26, 26, 26, 0.5);

    &.-exact-active {
      color: #1DA1F2;
    }
  }
}
</style>
