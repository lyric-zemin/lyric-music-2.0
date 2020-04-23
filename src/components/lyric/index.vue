<template>
  <scroll class="lyric-wrap" ref="scroll">
    <ul>
      <li
        v-for="(item, index) in lyrics"
        :key="item.time"
        :class="{'active': index === currentLine}"
        ref="line"
      >{{item.txt}}</li>
    </ul>
  </scroll>
</template>

<script>
import Scroll from '@/components/scroll'
import { getLyric } from '@/api/singer'
import { mapGetters, mapState } from 'vuex'
import LyricParse from 'lyric-parser'

export default {
  data() {
    return {
      lyrics: [],
      currentLine: 0
    }
  },
  computed: {
    ...mapGetters(['currentSong']),
    ...mapState(['playing'])
  },
  components: {
    Scroll
  },
  methods: {
    lyricHandler({ lineNum }) {
      this.currentLine = lineNum
      const scrollLine = Math.max(lineNum - 5, 0)
      this.$refs.scroll.scrollToElement(this.$refs.line[scrollLine], 300)
    },
    play() {
      this.lyric && this.lyric.play()
    },
    pause() {
      this.lyric && this.lyric.pause()
    },
    _getLyric() {
      getLyric(this.currentSong.mid).then(res => {
        if (res) {
          this.lyric = new LyricParse(res, this.lyricHandler)
          this.lyrics = this.lyric.lines
        }
      })
    }
  },
  watch: {
    currentSong() {
      this._getLyric()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/common/style/variable';

.lyric-wrap {
  ul li {
    text-align: center;
    font-size: $font-size-medium;
    color: $color-text-l;
    line-height: 2;
    &.active {
      color: $color-text;
    }
  }
}
</style>