<template lang="pug">
  section.thumbnail-box-grid
    slot
</template>

<style lang="scss" scoped>
  .thumbnail-box-grid {
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    .thumbnail-box {
      &.-column-2 {
        border-bottom: 4px solid white;
        box-sizing: border-box;

        &:nth-child(-n+2) {
          border-top: 4px solid white;
        }

        &:nth-child(odd) {
          border-left: 4px solid white;
          border-right: 2px solid white;
        }

        &:nth-child(even) {
          border-left: 2px solid white;
          border-right: 4px solid white;
        }

        &:nth-child(odd):last-child {
          width: calc(50% + 2px);
          border-right: 4px solid white;
        }
      }
    }
  }
</style>
