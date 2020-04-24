<template>
  <div class="search-box">
    <i class="icon-search"></i>
    <input type="text" class="box" :placeholder="placeholder" v-model="query" />
    <i class="icon-dismiss" @click="clear" v-show="query"></i>
  </div>
</template>

<script>
import { debounce } from '@/common/js/util'

export default {
  props: {
    placeholder: {
      type: String,
      default: '搜索歌曲、歌手'
    }
  },
  data() {
    return {
      query: ''
    }
  },
  created() {
    this.$watch(
      'query',
      debounce(newQuery => {
        this.$emit('query', newQuery)
      }, 500)
    )
  },
  methods: {
    setQuery(query) {
      this.query = query
    },
    clear() {
      this.query = ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/common/style/variable';

.search-box {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  padding: 0 6px;
  height: 40px;
  background: $color-highlight-background;
  border-radius: 6px;
  i {
    font-size: 24px;
    color: $color-background;
    &.icon-dismiss {
      font-size: $font-size-medium-x;
    }
  }
  .box {
    flex: 1;
    height: 22px;
    line-height: 22px;
    margin: 0 5px;
    background-color: $color-highlight-background;
    font-size: $font-size-medium;
    padding-left: 5px;
    color: $color-text;
    border-radius: 10px;
  }
}
</style>