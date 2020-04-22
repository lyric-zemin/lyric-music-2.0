<template>
  <ul class="nav">
    <router-link to="/recommend" tag="li">
      <span>推荐</span>
    </router-link>
    <router-link to="/singer" tag="li">
      <span>歌手</span>
    </router-link>
    <router-link to="/rank" tag="li">
      <span>排行</span>
    </router-link>
    <router-link to="/search" tag="li">
      <span>搜索</span>
    </router-link>
  </ul>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@import '@/common/style/variable';

.nav {
  height: 44px;
  display: flex;
  li {
    flex: 1;
    text-align: center;
    font-size: $font-size-medium;
    color: $color-text-l;
    line-height: 44px;
    span {
      padding-bottom: 6px;
    }
    &.router-link-exact-active {
      color: $color-theme;
      span {
        border-bottom: 2px solid $color-theme;
      }
    }
  }
}
</style>