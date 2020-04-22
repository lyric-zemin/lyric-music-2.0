<template>
  <scroll class="music-list" :listenScroll="true" @scroll="listScroll" :probeType="3">
    <ul>
      <li v-for="(item, index) in list" :key="item.id" @click="select(index)">
        <div class="name">{{item.name}}</div>
        <div class="desc">{{item.singer}}·{{item.album}}</div>
      </li>
    </ul>
  </scroll>
</template>

<script>
import Scroll from '@/components/scroll'

export default {
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    Scroll
  },
  methods: {
    listScroll(pos) {
      this.$emit('scroll', pos)
    },
    select(index) {
      this.$emit('select', index)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/common/style/variable';

.music-list {
  position: relative;
  ul {
    padding: 20px 30px;
    li {
      padding: 10px 0;
      .name {
        font-size: $font-size-medium;
        color: $color-text;
        margin-bottom: 10px;
      }
      .desc {
        font-size: $font-size-medium;
        color: $color-text-d;
      }
    }
  }
}
</style>