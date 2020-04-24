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
import { mapGetters } from 'vuex'
import LyricParse from 'lyric-parser'

export default {
  data() {
    return {
      lyrics: [],
      currentLine: 0
    }
  },
  computed: {
    ...mapGetters(['currentSong'])
  },
  created() {
    this._getLyric()
  },
  components: {
    Scroll
  },
  methods: {
    lyricHandler({ lineNum }) {
      this.currentLine = lineNum
      const scrollLine = Math.max(lineNum - 2, 0)
      this.$refs.line &&
        this.$refs.scroll.scrollToElement(this.$refs.line[scrollLine], 300)
    },
    play() {
      this.currentLyric && this.currentLyric.play()
    },
    stop() {
      this.currentLyric && this.currentLyric.stop()
    },
    togglePlay() {
      this.currentLyric && this.currentLyric.togglePlay()
    },
    seek(time) {
      this.currentLyric && this.currentLyric.seek(time * 1000)
    },
    _getLyric() {
      getLyric(this.currentSong.mid).then(res => {
        if (res) {
          this.currentLyric = new LyricParse(res, this.lyricHandler)
          this.lyrics = this.currentLyric.lines
        }
      })
    }
  },
  watch: {
    currentSong() {
      this.stop()
      this._getLyric()
      this.currentLine = 0
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