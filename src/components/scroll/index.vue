<template>
  <div class="scroll" ref="scroll">
    <slot />
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  props: {
    click: {
      type: Boolean,
      default: true
    },
    listenScroll: {
      type: Boolean,
      default: false
    },
    probeType: {
      type: Number,
      default: 0
    }
  },
  mounted() {
    this.$nextTick(() => {
      this._initScroll()
    })
  },
  methods: {
    scrollToElement(el) {
      this.scroll.scrollToElement(el)
    },
    _initScroll() {
      this.scroll = new BScroll(this.$refs.scroll, {
        scrollY: true,
        click: this.click,
        probeType: this.probeType
      })

      if (this.listenScroll) {
        this.scroll.on('scroll', pox => {
          this.$emit('scroll', pox)
        })
      }
    }
  }
}
</script>