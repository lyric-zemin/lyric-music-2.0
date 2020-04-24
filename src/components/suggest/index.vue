<template>
  <div class="suggest">
    <ul>
      <li v-for="item in list" :key="item.id" @click="select(item)">
        <i class="icon-music"></i>
        <span>{{item.name}}-{{item.singer}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    select(item) {
      this.$emit('select', item)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/common/style/variable';
@import '@/common/style/mixin';

.suggest {
  width: 100%;
  height: 100%;
  overflow: hidden;
  ul {
    padding: 0 10%;
    li {
      padding: 10px 0 20px;
      display: flex;
      align-items: center;
      i {
        font-size: $font-size-medium;
        color: $color-text-d;
        margin-right: 10px;
      }
      span {
        flex: 1;
        @include no-wrap;
        font-size: $font-size-medium;
        color: $color-text-d;
      }
    }
  }
}
</style>