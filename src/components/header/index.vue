<template>
  <div class="header">
    <div class="img"></div>
    <div class="text">Chicken Music</div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/common/style/variable';
@import '@/common/style/mixin';

.header {
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  .img {
    width: 30px;
    height: 32px;
    @include bg-image('logo');
    background-size: 100% auto;
    margin-right: 9px;
  }
  .text {
    font-size: $font-size-large;
    color: $color-theme;
  }
}
</style>