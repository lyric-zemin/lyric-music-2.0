<template>
  <div class="singer">
    <list-view :list="singers" v-if="singers.length" @select="openDetail" />
    <loading class="loading" v-if="!singers.length" />
    <router-view />
  </div>
</template>

<script>
import ListView from '@/components/list-view'
import { getSingerList } from '@/api/singer'
import { ERR_OK } from '@/api/config'
import Singer from '@/common/js/singer'
import { mapMutations } from 'vuex'
import Loading from '@/components/loading'

const HOT_NAME = '热门'
const HOT_LEN = 10

export default {
  data() {
    return {
      singers: []
    }
  },
  created() {
    this._getSingerList()
  },
  components: {
    ListView,
    Loading
  },
  methods: {
    openDetail(singer) {
      this.$router.push({
        path: `singer/${singer.id}`
      })
      this.setSinger(singer)
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    }),
    _getSingerList() {
      getSingerList().then(res => {
        if (res.code === ERR_OK) {
          this.singers = this._normailize(res.data.list)
        }
      })
    },
    _normailize(list) {
      const map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      }

      for (let i = 0; i < HOT_LEN; i++) {
        const cur = list[i]
        map.hot.items.push(
          new Singer(cur.Fsinger_name, cur.Fsinger_id, cur.Fsinger_mid)
        )
      }

      list.forEach(item => {
        const name = item.Findex
        if (!map[name]) {
          map[name] = {
            title: name,
            items: []
          }
        }
        map[name].items.push(
          new Singer(item.Fsinger_name, item.Fsinger_id, item.Fsinger_mid)
        )
      })

      const ret = []
      const hot = []

      for (const item in map) {
        const cur = map[item]
        if (!/[A-Z]/.test(item) && cur.title !== HOT_NAME) {
          continue
        }
        if (cur.title === HOT_NAME) {
          hot.push({
            title: cur.title,
            items: cur.items
          })
        } else {
          ret.push({
            title: cur.title,
            items: cur.items
          })
        }
      }

      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })

      return hot.concat(ret)
    }
  }
}
</script>

<style lang="scss" scoped>
.singer {
  position: fixed;
  left: 0;
  top: 88px;
  bottom: 0;
  width: 100%;
  overflow: hidden;
  .loading {
    position: absolute;
    left: 0;
    top: 50%;
    width: 100%;
    transform: translateY(-50%);
  }
}
</style>