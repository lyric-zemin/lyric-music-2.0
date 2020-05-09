<template>
  <div class="song-list">
    <div class="head" ref="head">
      <div class="back" @click="back">
        <i class="icon-back"></i>
      </div>
      <div class="name">{{name}}</div>
      <div class="img" :style="{backgroundImage:bgImage, transform: `scale(${percent})`}">
        <div class="filter"></div>
      </div>
      <div class="play-wrap" @click="randomPlay(list)">
        <i class="icon-play"></i>
        <span>随机播放全部</span>
      </div>
    </div>
    <div class="music-container">
      <music-list
        :list="list"
        class="music-wrap"
        :style="{top: top + 'px'}"
        v-if="list.length"
        @scroll="onScroll"
        @select="selectItem"
      />
      <loading class="loading" v-if="!list.length" />
    </div>
  </div>
</template>

<script>
import MusicList from '@/components/music-list'
import Loading from '@/components/loading'
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      top: 0,
      percent: 1
    }
  },
  props: {
    name: {
      type: String,
      default: ''
    },
    background: {
      type: String,
      default: ''
    },
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this._setTop()
    })
  },
  computed: {
    bgImage() {
      return `url(${this.background})`
    }
  },
  components: {
    MusicList,
    Loading
  },
  methods: {
    back() {
      this.$router.back()
    },
    onScroll(pos) {
      const scrollY = pos.y
      let percent = 1
      if (scrollY > 0) {
        percent += scrollY / this.top
      } else {
        percent = 1
      }

      this.percent = percent
    },
    selectItem(index) {
      this.selectPlay({
        list: this.list,
        index
      })
    },
    ...mapActions(['selectPlay', 'randomPlay']),
    _setTop() {
      const top = this.$refs.head.clientHeight
      this.top = top
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/common/style/variable';

.song-list {
  .head {
    height: 0;
    padding-top: 70%;
    position: relative;
    .img {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      z-index: 2;
      background-size: cover;
      transform-origin: top center;
      .filter {
        position: absolute;
        left: 0;
        top: 0;
        z-index: 5;
        width: 100%;
        height: 100%;
        background-color: rgba(7, 17, 27, 0.4);
      }
    }
    .back {
      position: absolute;
      z-index: 20;
      left: 6px;
      top: 0;
      .icon-back {
        display: block;
        padding: 10px;
        font-size: $font-size-large-x;
        color: $color-theme;
      }
    }
    .name {
      position: absolute;
      left: 48px;
      top: 0;
      z-index: 50;
      width: calc(100% - 96px);
      text-align: center;
      height: 42px;
      line-height: 42px;
      font-size: $font-size-large;
      color: $color-text;
    }
    .play-wrap {
      position: absolute;
      z-index: 20;
      bottom: 20px;
      left: 50%;
      width: 135px;
      transform: translateX(-50%);
      padding: 7px 0;
      text-align: center;
      border: 1px solid $color-theme;
      color: $color-theme;
      border-radius: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      .icon-play {
        font-size: $font-size-medium-x;
      }
      span {
        font-size: $font-size-small;
        margin-left: 6px;
      }
    }
  }
  .music-container {
    position: relative;
    z-index: 5;
    .music-wrap {
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
      overflow: hidden;
    }
    .loading {
      position: absolute;
      left: 0;
      top: 10vh;
      width: 100%;
    }
  }
}
</style>