<template>
  <svg class="circle" :width="radius" :height="radius" viewBox="0 0 100 100">
    <circle r="50" cx="50" cy="50" fill="transparent" />
    <circle
      r="50"
      cx="50"
      cy="50"
      fill="transparent"
      class="bar"
      :stroke-dasharray="dasharray"
      :stroke-dashoffset="dashoffset"
    />
  </svg>
</template>

<script>
export default {
  props: {
    percent: {
      type: Number,
      default: 0
    },
    radius: {
      type: Number,
      default: 20
    }
  },
  computed: {
    dasharray() {
      return Math.PI * 2 * 50
    },
    dashoffset() {
      return this.dasharray * (1 - this.percent)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/common/style/variable';

.circle {
  position: absolute;
  circle {
    transform: scale(0.9) rotate(-90deg);
    stroke-width: 8px;
    transform-origin: center;
    &.bar {
      stroke: $color-theme;
    }
  }
}
</style>