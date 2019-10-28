<template lang="pug">
  figure.thumbnail-detail
    .thumbnail-area
      slot(name="thumbnail")
      .thumbnail-more
        slot(name="more")
    figcaption.thumbnail-detail-caption
      slot(name="caption")
</template>

<style lang="scss" scoped>
  .thumbnail-detail {
    width: 100%;
    margin: 0;
  }

  .thumbnail-area {
    position: relative;
    background-color: #fafafa;

    .thumbnail {
      &:not(:nth-last-child(2)) {
        margin: 0 0 1rem;
      }
    }
  }

  .thumbnail-more {
    position: absolute;
    bottom: 1rem;
    left: 50%;
    transform: translateX(-50%);
  }

  .thumbnail-detail-caption {
    padding: 1rem;
    box-sizing: border-box;
  }
</style>
