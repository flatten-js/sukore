<template lang="pug">
  .zoomable-controls
    .zoomable-controls__zoom-width
      material-button(
        type="immutable"
        tag="svg"
        name="width"
        horizon="short"
        brightness="2"
        :state="true"
        @click.native="emmitingZoomWidth"
        )
    .zoomable-controls__zoom-height
      material-button(
        type="immutable"
        tag="svg"
        name="height"
        horizon="short"
        brightness="2"
        :state="true"
        @click.native="emmitingZoomHeight"
        )
    .zoomable-controls__percent
      single-line-text(
        size="small"
        :text="number | convertPersent"
        )
    .zoomable-controls__zoom-out
      material-button(
        type="immutable"
        tag="svg"
        name="minus"
        horizon="short"
        brightness="2"
        :state="true"
        @click.native="emmitingZoomOut"
        )
    .zoomable-controls__zoom-in
      material-button(
        type="immutable"
        tag="svg"
        name="plus"
        horizon="short"
        brightness="2"
        :state="true"
        @click.native="emmitingZoomIn"
        )
</template>

<script>
import MaterialButton from '@/components/atoms/MaterialButton.vue'
import SingleLineText from '@/components/atoms/SingleLineText.vue'

export default {
  components: {
    MaterialButton,
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
    emmitingZoomWidth() {
      this.$emit('zoom-width-click')
    },
    emmitingZoomHeight() {
      this.$emit('zoom-height-click')
    },
    emmitingZoomOut() {
      this.$emit('zoom-out-click')
    },
    emmitingZoomIn() {
      this.$emit('zoom-in-click')
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
      margin: 0 .25rem;
      padding: .5rem;
      color: #1a1a1a;
      text-align: center;
      border-radius: 25px;
      border: 1px solid #1a1a1a;
    }

    &__zoom-width, &__zoom-height, &__zoom-out, &__zoom-in {
      font-size: 0;
      margin: 0 .25rem;
    }
  }
</style>
