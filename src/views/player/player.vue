<template>
  <div class="player" v-if="playList.length">
    <transition name="normal">
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
          <div class="cd-wrap" :class="cdCls">
            <img :src="currentSong.image" />
          </div>
        </div>
        <div class="bottom"></div>
      </div>
    </transition>
    <transition name="mini">
      <div class="mini-player" v-show="!fullScrenn"></div>
    </transition>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapState(['playing', 'fullScrenn', 'mode', 'playList']),
    ...mapGetters(['currentSong']),
    cdCls() {
      return this.playing ? 'play' : 'play pause'
    }
  },
  methods: {
    close() {
      this.toggleMini(false)
    },
    ...mapMutations({
      toggleMini: 'SET_FULL_SCRENN'
    })
  }
}
</script>

<style lang="scss" scoped>
@import '@/common/style/variable';

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
    }
    .singer {
      font-size: $font-size-medium;
      color: $color-text;
      line-height: 20px;
    }
  }
  .middle {
    width: 100%;
    overflow: hidden;
    .cd-wrap {
      box-sizing: border-box;
      width: 80%;
      height: 80vw;
      margin: 0 auto;
      border: 10px solid rgba(255, 255, 255, 0.1);
      border-radius: 50%;
      overflow: hidden;
      &.play {
        animation: rotate 20s linear infinite;
      }
      &.play.pause {
        animation-play-state: paused;
      }
      img {
        width: 100%;
        height: 100%;
      }
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

@keyframes rotate {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>