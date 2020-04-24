<template>
  <div class="wrap" ref="wrap">
    <div class="line" @click="clickBar">
      <span ref="playLine"></span>
    </div>
    <div
      class="icon"
      ref="icon"
      @touchstart.prevent="iconTouchStart"
      @touchmove.prevent="iconTouchMove"
      @touchend.prevent="iconTouchEnd"
    ></div>
  </div>
</template>

<script>
const ICON_WIDTH = 16

export default {
  props: {
    percent: {
      type: Number,
      default: 0
    }
  },
  created() {
    this.touch = {}
  },
  methods: {
    iconTouchStart(e) {
      this.touch.x1 = e.touches[0].pageX
      this.touch.start = this.$refs.playLine.clientWidth
      this.touch.init = true
    },
    iconTouchMove(e) {
      this.touch.x2 = e.touches[0].pageX
      let offset = this.touch.x2 - this.touch.x1 + this.touch.start
      const max = this.$refs.wrap.clientWidth - ICON_WIDTH
      const min = 0
      offset = Math.max(Math.min(max, offset), min)
      this.touch.offset = offset
      this._offsetWidth(offset)
    },
    iconTouchEnd(e) {
      this.touch.init = false
      const percent =
        this.touch.offset / (this.$refs.wrap.clientWidth - ICON_WIDTH)
      this._emitChange(percent)
    },
    clickBar(e) {
      const percent = Math.max((e.offsetX - ICON_WIDTH) / (this.$refs.wrap.clientWidth - ICON_WIDTH), 0)
      this._emitChange(percent)
    },
    _offsetWidth(offset) {
      this.$refs.playLine.style.width = offset + ICON_WIDTH / 2 + 'px'
      this.$refs.icon.style.transform = `translate3d(${offset}px, 0 ,0)`
    },
    _emitChange(percent) {
      this.$emit('change', percent)
    }
  },
  watch: {
    percent(val) {
      if (this.touch.init || val < 0) return
      const width = this.$refs.wrap.clientWidth - ICON_WIDTH
      const offset = width * val
      if (offset >= 0) {
        this._offsetWidth(offset)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/common/style/variable';

.wrap {
  width: 100%;
  height: 30px;
  display: flex;
  align-items: center;
  position: relative;
  .line {
    width: 100%;
    height: 4px;
    background-color: $color-background-d;
    span {
      display: block;
      height: 100%;
      background-color: $color-theme;
      width: 0;
    }
  }
  .icon {
    position: absolute;
    z-index: 5;
    left: 0;
    height: 16px;
    width: 16px;
    box-sizing: border-box;
    background-color: $color-theme;
    border: 4px solid $color-text;
    border-radius: 50%;
  }
}
</style>