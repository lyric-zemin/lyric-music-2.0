<template>
  <div class="player" v-if="playList.length">
    <transition
      name="normal"
      @enter="enter"
      @after-enter="afterEnter"
      @leave="leave"
      @after-leave="afterLeave"
    >
      <div class="normal-player" v-show="fullScrenn">
        <div class="background">
          <img :src="currentSong.image" />
        </div>
        <div class="top">
          <div class="close" @click="close">
            <i class="icon-back"></i>
          </div>
          <div class="name">{{currentSong.name}}</div>
          <div class="singer">{{currentSong.singer}}</div>
        </div>
        <div class="middle">
          <div class="middle-container">
            <div class="cd-wrap" ref="cdWrap">
              <img :src="currentSong.image" :class="cdCls" />
            </div>
            <lyric class="lyric" ref="lyric" />
          </div>
        </div>
        <div class="bottom">
          <div class="progress-wrapper">
            <div class="play-time">{{currentTime | format}}</div>
            <div class="progress">
              <progressBar :percent="percent" @change="progressBarChange" />
            </div>
            <div class="duration">{{currentSong.duration | format}}</div>
          </div>
          <div class="operators">
            <i :class="playModeCls" @click="toggleMode"></i>
            <i class="icon-prev" @click="prev"></i>
            <i class="large" :class="playCls" @click="togglePlay"></i>
            <i class="icon-next" @click="next"></i>
            <i class="icon-not-favorite"></i>
          </div>
        </div>
      </div>
    </transition>
    <transition name="mini">
      <div class="mini-player" v-show="!fullScrenn" @click="open">
        <div class="cd" :class="cdCls">
          <img :src="currentSong.image" width="40" height="40" />
        </div>
        <div class="text">
          <div class="name">{{currentSong.name}}</div>
          <div class="singer">{{currentSong.singer}}</div>
        </div>
        <div class="control">
          <i :class="miniPlayCls" @click.stop="togglePlay"></i>
          <circle-bar :percent="percent" :radius="30" class="circle" />
        </div>
        <div class="control">
          <i class="icon-playlist"></i>
        </div>
      </div>
    </transition>
    <audio
      :src="currentSong.url"
      ref="audio"
      @canplay="canPlay"
      @timeupdate="timeUpdate"
      @ended="end"
      @error="error"
    ></audio>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import animations from 'create-keyframe-animation'
import { playMode } from '@/store/config'
import ProgressBar from '@/components/progress-bar'
import CircleBar from '@/components/circle-bar'
import { shuffle } from '@/common/js/util'
import Lyric from '@/components/lyric'

export default {
  data() {
    return {
      currentTime: 0,
      load: false
    }
  },
  components: {
    ProgressBar,
    CircleBar,
    Lyric
  },
  computed: {
    ...mapState([
      'playing',
      'fullScrenn',
      'mode',
      'playList',
      'currentIndex',
      'sequenceList'
    ]),
    ...mapGetters(['currentSong']),
    cdCls() {
      return this.playing ? 'play' : 'play pause'
    },
    playCls() {
      return this.playing ? 'icon-pause' : 'icon-play'
    },
    miniPlayCls() {
      return this.playing ? 'icon-pause-mini' : 'icon-play-mini'
    },
    playModeCls() {
      return this.mode === playMode.sequence
        ? 'icon-sequence'
        : this.mode === playMode.loop
        ? 'icon-loop'
        : 'icon-random'
    },
    percent() {
      return this.currentTime / this.currentSong.duration
    }
  },
  methods: {
    close() {
      this.toggleFullScrenn(false)
    },
    open() {
      this.toggleFullScrenn(true)
    },
    enter(el, done) {
      const { x, y, scale } = this._getPos()
      const cdWrap = this.$refs.cdWrap

      const animation = {
        0: {
          transform: `translate3d(${-x}px,${y}px,0) scale(${scale})`
        },
        60: {
          transform: 'translate3d(0,0,0) scale(1.1)'
        },
        100: {
          transform: 'translate3d(0,0,0) scale(1)'
        }
      }

      animations.registerAnimation({
        name: 'move',
        animation,
        presets: {
          duration: 400,
          easing: 'linear'
        }
      })

      animations.runAnimation(cdWrap, 'move', done)
    },
    afterEnter() {
      animations.unregisterAnimation('move')
      this.$refs.cdWrap.style.animation = ''
    },
    leave(el, done) {
      const { x, y, scale } = this._getPos()
      const cdWrap = this.$refs.cdWrap
      cdWrap.style.transition = 'all 0.4s'
      cdWrap.style.transform = `translate3d(${-x}px, ${y}px,0) scale(${scale})`
      cdWrap.addEventListener('transitionend', done)
    },
    afterLeave() {
      const cdWrap = this.$refs.cdWrap
      cdWrap.style.transition = ''
      cdWrap.style.transform = ''
    },
    _getPos() {
      const miniLeft = 20
      const miniBottom = 10
      const miniWidth = 40
      const winWidth = window.innerWidth
      const winHeight = window.innerHeight
      const normalWidth = winWidth * 0.8
      const normalTop = 85

      const x = winWidth / 2 - (miniLeft + miniWidth / 2)
      const y =
        winHeight - normalTop - normalWidth / 2 - miniBottom - miniWidth / 2
      const scale = miniWidth / normalWidth

      return { x, y, scale }
    },
    ...mapMutations({
      toggleFullScrenn: 'SET_FULL_SCRENN',
      SET_PLAYING: 'SET_PLAYING',
      setCurrentIndex: 'SET_CURRENT_INDEX',
      setMode: 'SET_MODE',
      setPlayList: 'SET_PLAY_LIST'
    }),
    canPlay() {
      this.load = true
    },
    error() {
      this.load = true
    },
    togglePlay() {
      this.SET_PLAYING(!this.playing)
      this.$refs.lyric.togglePlay()
    },
    next() {
      if (!this.load) return
      const len = this.playList.length
      let index = this.currentIndex + 1
      if (index >= len) {
        index = 0
      }
      this.load = false
      this.setCurrentIndex(index)
      if (!this.playing) {
        this.togglePlay()
      }
    },
    prev() {
      if (!this.load) return
      const len = this.playList.length
      let index = this.currentIndex - 1
      if (index < 0) {
        index = len - 1
      }
      this.load = false
      this.setCurrentIndex(index)
      if (!this.playing) {
        this.togglePlay()
      }
    },
    timeUpdate(e) {
      const time = e.target.currentTime
      this.currentTime = time
    },
    end() {
      if (this.mode === playMode.loop) {
        this.loop()
        return
      }
      this.next()
    },
    loop() {
      this.$refs.audio.currentTime = 0
      this.SET_PLAYING(true)
      this.$refs.audio.play()
      this.$refs.lyric.seek(0)
    },
    toggleMode() {
      const mode = (this.mode + 1) % 3
      let list = null
      if (mode === playMode.random) {
        list = shuffle(this.sequenceList)
      } else {
        list = this.sequenceList
      }
      this.setMode(mode)
      this.resetCurrentIndex(list)
      this.setPlayList(list)
    },
    resetCurrentIndex(list) {
      const index = list.findIndex(item => {
        return item.id === this.currentSong.id
      })
      this.setCurrentIndex(index)
    },
    progressBarChange(percent) {
      const time = percent * this.currentSong.duration
      this.$refs.audio.currentTime = time
      this.$refs.lyric.seek(time)
    }
  },
  filters: {
    format(time) {
      const m = (time / 60) | 0
      const s = (time % 60 | 0).toString().padStart(2, 0)
      return `${m}:${s}`
    }
  },
  watch: {
    playing(playState) {
      if (!this.load) return
      const audio = this.$refs.audio
      playState ? audio.play() : audio.pause()
    },
    currentSong() {
      clearTimeout(this.timer)
      // 如果不延迟会在歌词stop前就play了
      this.timer = setTimeout(() => {
        this.$refs.audio.play()
        this.$refs.lyric.play()
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/common/style/variable';
@import '@/common/style/mixin';

.normal-player {
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: $color-background;
  .background {
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    img {
      width: 100%;
      height: 100%;
      filter: blur(20px);
      opacity: 0.6;
    }
  }
  .top {
    text-align: center;
    position: relative;
    margin-bottom: 25px;
    .close {
      position: absolute;
      left: 6px;
      top: 0;
      .icon-back {
        display: block;
        padding: 9px;
        font-size: $font-size-large-x;
        color: $color-theme;
        transform: rotate(-90deg);
      }
    }
    .name {
      width: 70%;
      margin: 0 auto;
      font-size: $font-size-large;
      color: $color-text;
      line-height: 40px;
      @include no-wrap;
    }
    .singer {
      font-size: $font-size-medium;
      color: $color-text;
      line-height: 20px;
      @include no-wrap;
    }
  }
  .middle {
    width: 100%;
    position: relative;
    .cd-wrap {
      box-sizing: border-box;
      width: 80%;
      height: 80vw;
      margin: 0 auto;
      border: 10px solid rgba(255, 255, 255, 0.1);
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        &.play {
          animation: rotate 20s linear infinite;
        }
        &.play.pause {
          animation-play-state: paused;
        }
      }
    }
    .lyric {
      width: 80%;
      height: 80vw;
      margin: 0 auto;
      overflow: hidden;
    }
  }
  .bottom {
    position: absolute;
    bottom: 50px;
    width: 100%;
    .progress-wrapper {
      width: 80%;
      margin: 10px auto 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: $font-size-small;
      .progress {
        padding: 10px;
        flex: 1;
      }
    }
    .operators {
      width: 80%;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      i {
        color: $color-theme;
        font-size: 30px;
        &.large {
          font-size: 40px;
        }
      }
    }
  }
}

.mini-player {
  position: fixed;
  z-index: 90;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background-color: $color-highlight-background;
  display: flex;
  align-items: center;
  .cd {
    margin: 0 10px 0 20px;
    overflow: hidden;
    &.play {
      animation: rotate 20s linear infinite;
    }
    &.play.pause {
      animation-play-state: paused;
    }
    img {
      border-radius: 50%;
    }
  }
  .text {
    flex: 1;
    overflow: hidden;
    .name {
      font-size: $font-size-medium;
      color: $color-text;
      @include no-wrap;
    }
    .singer {
      font-size: $font-size-small;
      color: $color-text-l;
      margin-top: 8px;
      @include no-wrap;
    }
  }
  .control {
    padding: 0 10px;
    position: relative;
    i {
      font-size: 30px;
      color: rgba(255, 205, 49, 0.5);
    }
    .circle {
      position: absolute;
      left: 10px;
      top: 0;
      pointer-events: none;
    }
  }
}

.normal-enter-active,
.normal-leave-active {
  transition: 0.4s;
  .top,
  .bottom {
    transition: 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32);
  }
}
.normal-enter,
.normal-leave-to {
  opacity: 0;
  .top {
    transform: translate3d(0, -100px, 0);
  }
  .bottom {
    transform: translate3d(0, 100px, 0);
  }
}

.mini-enter-active,
.mini-leave-active {
  transition: 0.4s;
}
.mini-enter,
.mini-leave-to {
  opacity: 0;
}

@keyframes rotate {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>