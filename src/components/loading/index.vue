<template>
  <div class="loading">
    <img src="./loading.gif" width="24" height="24" />
    <div class="text">{{text}}</div>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: '加载中...'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/common/style/variable';

.loading {
  text-align: center;
  .text {
    line-height: 20px;
    font-size: $font-size-small;
    color: $color-text-d;
  }
}
</style>