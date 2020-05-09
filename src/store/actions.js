import * as types from './mutation-types'
import { playMode } from './config'
import { shuffle } from '@/common/js/util'

export function selectPlay({ commit, state }, { list, index }) {
  commit(types.SET_PLAYING, true)
  commit(types.SET_FULL_SCRENN, true)
  commit(types.SET_PLAY_LIST, list)
  commit(types.SET_SEQUENCE_LIST, list)
  commit(types.SET_MODE, playMode.sequence)
  commit(types.SET_CURRENT_INDEX, index)
}

export function randomPlay({ commit, state }, list) {
  let _list = list.slice()
  _list = shuffle(_list)
  commit(types.SET_PLAYING, true)
  commit(types.SET_FULL_SCRENN, true)
  commit(types.SET_PLAY_LIST, _list)
  commit(types.SET_SEQUENCE_LIST, list)
  commit(types.SET_MODE, playMode.random)
  commit(types.SET_CURRENT_INDEX, 0)
}

export function insetSong({ commit, state }, song) {
  if (!state.playing) {
    commit(types.SET_PLAY_LIST, [song])
    commit(types.SET_SEQUENCE_LIST, [song])
  } else {
    const list = state.sequenceList.slice()
    if (list.includes(song)) {
      const index = list.findIndex(item => item.id === song.id)
      list.splice(index, 1)
    }
    list.unshift(song)
    commit(types.SET_PLAY_LIST, list)
    commit(types.SET_SEQUENCE_LIST, list)
  }

  commit(types.SET_PLAYING, true)
  commit(types.SET_FULL_SCRENN, true)
  commit(types.SET_MODE, playMode.sequence)
  commit(types.SET_CURRENT_INDEX, 0)
}