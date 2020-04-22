import * as types from './mutation-types'

export default {
  [types.SET_SINGER](state, singer) {
    state.singer = singer
  },
  [types.SET_PLAYING](state, play) {
    state.playing = play
  },
  [types.SET_FULL_SCRENN](state, full) {
    state.fullScrenn = full
  },
  [types.SET_PLAY_LIST](state, list) {
    state.playList = list
  },
  [types.SET_SEQUENCE_LIST](state, list) {
    state.sequenceList = list
  },
  [types.SET_MODE](state, mode) {
    state.mode = mode
  },
  [types.SET_CURRENT_INDEX](state, index) {
    state.currentIndex = index
  }
}