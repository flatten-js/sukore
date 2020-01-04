<template lang="pug">
  .zoomable-controls
    .zoomable-controls__zoom-out(
      @click="zoomOut"
      )
      svg-sprite(name="minus")
    .zoomable-controls__percent
      single-line-text(
        size="small"
        :text="number | convertPersent"
        )
    .zoomable-controls__zoom-in(
      @click="zoomIn"
      )
      svg-sprite(name="plus")
</template>

<script>
import SvgSprite from '@/components/atoms/SvgSprite.vue'
import SingleLineText from '@/components/atoms/SingleLineText.vue'

export default {
  components: {
    SvgSprite,
    SingleLineText
  },
  filters: {
    convertPersent(number) {
      return `${Math.round(number * 100)}%`
    }
  },
  props: {
    number: {
      type: Number,
      reqired: true
    }
  },
  methods: {
    zoomOut() {
      this.$emit('zoomOut')
    },
    zoomIn() {
      this.$emit('zoomIn')
    }
  }
}
</script>

<style lang="scss" scoped>
  .zoomable-controls {
    display: flex;
    width: 100%;
    padding: 1rem 0;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, .9);

    &__percent {
      width: 4rem;
      line-height: 1rem;
      margin: 0 .5rem;
      padding: .5rem;
      color: #1a1a1a;
      text-align: center;
      border-radius: 25px;
      border: 1px solid #1a1a1a;
    }

    &__zoom-out, &__zoom-in {
      display: inline-block;
      margin: 0 .5rem;
      padding: .5rem;
      font-size: 0;
      border-radius: 50%;
      color: white;
      background-color: rgba(26, 26, 26, .75);
    }
  }
</style>
