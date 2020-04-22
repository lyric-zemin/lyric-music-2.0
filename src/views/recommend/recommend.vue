<template>
  <v-scroll class="recommend">
    <div>
      <div class="slider-container" v-if="banners.length">
        <v-slider :sliders="banners" />
      </div>
      <div class="list-container">
        <h2 class="title">热门歌单推荐</h2>
        <ul>
          <li class="item" v-for="item in recommends" :key="item.content_id">
            <img v-lazy="item.cover" width="60" height="60" />
            <div class="text">
              <div class="name">{{item.username}}</div>
              <div class="desc">{{item.title}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="loading-wrap" v-if="!recommends.length">
      <v-loading />
    </div>
  </v-scroll>
</template>

<script>
import Slider from '@/components/slider'
import { getBanner, getRecommend } from '@/api/recommend'
import { ERR_OK } from '@/api/config'
import Scroll from '@/components/scroll'
import Loading from '@/components/loading'

export default {
  data() {
    return {
      banners: [],
      recommends: []
    }
  },
  created() {
    this._getBanner()
    this._getRecommend()
  },
  components: {
    VSlider: Slider,
    VScroll: Scroll,
    VLoading: Loading
  },
  methods: {
    _getBanner() {
      getBanner().then(res => {
        if (res.code === ERR_OK) {
          this.banners = res.data.slider
        }
      })
    },
    _getRecommend() {
      getRecommend().then(res => {
        this.recommends = res
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/common/style/variable';
@import '@/common/style/mixin';

.recommend {
  position: fixed;
  left: 0;
  bottom: 0;
  top: 88px;
  width: 100%;
  overflow: hidden;
  .list-container {
    padding: 20px;
    position: relative;
    .title {
      text-align: center;
      font-size: $font-size-medium;
      color: $color-theme;
    }
    ul {
      margin-top: 10px;
      .item {
        display: flex;
        align-items: center;
        padding: 10px 0;
        img {
          flex: 0 0 60px;
          margin-right: 20px;
        }
        .text {
          flex: 1;
          .name {
            @include no-wrap;
            color: $color-text;
            font-size: $font-size-medium;
            margin-bottom: 12px;
          }
          .desc {
            @include no-wrap;
            color: $color-text-d;
            font-size: $font-size-small;
          }
        }
      }
    }
  }
  .loading-wrap {
    position: absolute;
    left: 0;
    top: 50%;
    width: 100%;
    transform: translateY(-50%);
  }
}
</style>