<template>
  <div id="app">
    <v-header />
    <v-nav />
    <keep-alive>
      <router-view />
    </keep-alive>
    <player />
  </div>
</template>

<script>
import Header from '@/components/header'
import Nav from '@/components/nav'
import Player from '@/views/player/player'

export default {
  components: {
    VHeader: Header,
    VNav: Nav,
    Player
  }
}
</script>

<style lang="scss">
</style>
