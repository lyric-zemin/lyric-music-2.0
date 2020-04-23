<template>
  <scroll class="list-view" ref="scroll" :probeType="3" :listenScroll="true" @scroll="listScroll">
    <div>
      <dl v-for="item in list" :key="item.title" ref="items">
        <dt>{{item.title}}</dt>
        <dd v-for="singer in item.items" :key="singer.id" @click="select(singer)">
          <img v-lazy="singer.avatar" width="50" height="50" />
          <div class="name">{{singer.name}}</div>
        </dd>
      </dl>
    </div>
    <ul class="shortcut" @touchmove.stop @touchend.prevent>
      <li
        v-for="(item, index) in list"
        :key="item.title"
        @click="clickShortcut(index)"
        :class="{'active': currentIndex === index}"
      >{{item.title[0]}}</li>
    </ul>
    <div class="list-fixed" :style="fixedStyle">{{fixedTitle}}</div>
  </scroll>
</template>

<script>
import Scroll from '@/components/scroll'

const FIX_HEIGHT = 30

export default {
  data() {
    return {
      currentIndex: 0,
      scrollTop: 0,
      clientHeight: [],
      diff: 0
    }
  },
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this._calculationClientHeight()
    })
  },
  computed: {
    fixedTitle() {
      return this.list[this.currentIndex].title
    },
    fixedStyle() {
      return `transform:translateY(${this.diff}px)`
    }
  },
  components: {
    Scroll
  },
  methods: {
    clickShortcut(index) {
      const scroll = this.$refs.scroll
      const items = this.$refs.items

      scroll.scrollToElement(items[index])
    },
    listScroll(pos) {
      this.scrollTop = -pos.y
    },
    select(id) {
      this.$emit('select', id)
    },
    _calculationClientHeight() {
      const items = this.$refs.items
      const height = []

      height.push(0)
      for (let i = 0; i < items.length; i++) {
        const _height = items[i].clientHeight
        height.push(_height + height[i])
      }

      this.clientHeight = height
    }
  },
  watch: {
    scrollTop(newVal) {
      if (newVal < 0) {
        this.currentIndex = 0
        this.diff = -parseInt(newVal)
        return
      }
      for (let i = 0; i < this.clientHeight.length; i++) {
        const h1 = this.clientHeight[i]
        const h2 = this.clientHeight[i + 1]

        if (newVal >= h1 && newVal < h2) {
          this.currentIndex = i
          if (h2 - newVal <= FIX_HEIGHT) {
            this.diff = -(FIX_HEIGHT - (h2 - newVal))
          } else {
            this.diff = 0
          }
          break
        }

        if (!h2) {
          this.currentIndex = this.clientHeight.length - 2
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/common/style/variable';

.list-view {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  dl {
    padding-bottom: 20px;
    dt {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: $font-size-small;
      color: $color-text-l;
      background-color: $color-highlight-background;
    }
    dd {
      display: flex;
      padding: 20px 0 0 30px;
      align-items: center;
      img {
        border-radius: 50%;
      }
      .name {
        margin-left: 20px;
        font-size: $font-size-medium;
        color: $color-text-l;
      }
    }
  }
  .shortcut {
    position: absolute;
    z-index: 10;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    padding: 20px 0;
    border-radius: 10px;
    background-color: $color-background-d;
    li {
      text-align: center;
      padding: 3px 5px;
      font-size: $font-size-small;
      color: $color-text-l;
      &.active {
        color: $color-theme;
      }
    }
  }
  .list-fixed {
    position: absolute;
    z-index: 5;
    top: 0;
    left: 0;
    box-sizing: border-box;
    width: 100%;
    height: 30px;
    line-height: 30px;
    padding-left: 20px;
    font-size: $font-size-small;
    color: $color-text-l;
    background-color: $color-highlight-background;
  }
}
</style>