<template>
  <div class="slider" ref="slider">
    <div class="slider-wrap" ref="sliderWrap">
      <div class="slider-item" v-for="slider in sliders" :key="slider.id">
        <a :href="slider.linkUrl">
          <img :src="slider.picUrl" />
        </a>
      </div>
    </div>
    <div class="dots">
      <span
        v-for="item in sliders.length"
        :key="item"
        :class="[item-1 === currentIndex ?'active' : '']"
      ></span>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  data() {
    return {
      currentIndex: 0
    }
  },
  props: {
    sliders: {
      type: Array,
      default() {
        return []
      }
    },
    loop: {
      type: Boolean,
      default: true
    },
    click: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 2000
    },
    autoplay: {
      type: Boolean,
      default: true
    }
  },
  mounted() {
    this.$nextTick(() => {
      this._setSliderWidth()
      this._initSlider()
      if (this.autoplay) {
        this._play()
      }
    })
  },
  methods: {
    _setSliderWidth() {
      const sliderWidth = this.$refs.slider.clientWidth
      const sliderWrap = this.$refs.sliderWrap
      const child = sliderWrap.children

      let width = 0
      for (let i = 0; i < child.length; i++) {
        child[i].style.width = sliderWidth + 'px'
        width += sliderWidth
      }

      if (this.loop) {
        width += 2 * sliderWidth
      }
      sliderWrap.style.width = width + 'px'
    },
    _initSlider() {
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        click: this.click,
        snap: { loop: this.loop, threshold: 50 },
        momentum: false
      })

      this.slider.on('scrollEnd', res => {
        const index = this.slider.getCurrentPage().pageX
        this.currentIndex = index
        if (this.autoplay) {
          this._play()
        }
      })

      this.slider.on('scrollStart', () => {
        if (this.timer) {
          clearTimeout(this.timer)
        }
      })
    },
    _play() {
      this.timer = setTimeout(() => {
        this.slider.next(400)
      }, this.interval)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/common/style/variable';

.slider {
  width: 100%;
  min-height: 1px;
  overflow: hidden;
  position: relative;
  .slider-item {
    float: left;
    img {
      width: 100%;
    }
  }
  .dots {
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 12px;
    text-align: center;
    span {
      display: inline-block;
      width: 8px;
      height: 8px;
      margin: 0 4px;
      background-color: $color-text-d;
      border-radius: 50%;
      &.active {
        width: 20px;
        background-color: $color-text-l;
        border-radius: 5px;
      }
    }
  }
}
</style>