<template>
  <div class="search">
    <div class="search-box-container">
      <search-box @query="searchQuery" />
    </div>
    <div class="search-result" v-show="searchRet.length">
      <suggest :list="searchRet" @select="insetSong" />
    </div>
  </div>
</template>

<script>
import SearchBox from '@/components/search-box'
import Suggest from '@/components/suggest'
import { search } from '@/api/search'
import { createSearchSong } from '@/common/js/song'
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      searchRet: [],
      page: 1
    }
  },
  components: {
    SearchBox,
    Suggest
  },
  methods: {
    searchQuery(query) {
      if (!query) {
        this.searchRet = []
        return
      }
      search(query, this.page).then(res => {
        this.searchRet = this._normallize(res)
      })
    },
    ...mapActions({
      insetSong: 'insetSong'
    }),
    _normallize(list) {
      const ret = []
      list.forEach(item => {
        ret.push(createSearchSong(item))
      })
      return ret
    }
  }
}
</script>

<style lang="scss" scoped>
.search-box-container {
  margin: 20px;
}
.search-result {
  position: fixed;
  z-index: 10;
  top: 168px;
  bottom: 60px;
  width: 100%;
}
</style>