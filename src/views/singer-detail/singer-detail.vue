<template>
  <transition name="slider">
    <song-list
      class="singer-detail"
      :name="singer.name"
      :background="singer.avatar"
      :list="singerDetail"
    />
  </transition>
</template>

<script>
import SongList from '@/views/song-list/song-list'
import { getSingerDetail } from '@/api/singer'
import { mapState } from 'vuex'
import { createSong } from '@/common/js/song'

export default {
  data() {
    return {
      singerDetail: []
    }
  },
  created() {
    if (!this.singer.id) {
      this.$router.push({
        path: '/singer'
      })
      return
    }
    this._getSingerDetail()
  },
  computed: {
    ...mapState(['singer'])
  },
  components: {
    SongList
  },
  methods: {
    _getSingerDetail() {
      getSingerDetail(this.singer.id).then(res => {
        this.singerDetail = this._normailize(res.data.list)
      })
    },
    _normailize(list) {
      const ret = []
      list.forEach(item => {
        const musicData = item.musicData
        if (musicData.songid && musicData.albummid) {
          ret.push(createSong(musicData))
        }
      })
      return ret
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/common/style/variable';

.singer-detail {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 20;
  background-color: $color-background;
}

.slider-enter-active,
.slider-leave-active {
  transition: 0.3s;
}
.slider-enter,
.slider-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>