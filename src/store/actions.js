import * as types from './mutation-types'
import { playMode } from './config'

export function selectPlay({ commit, state }, { list, index }) {
  commit(types.SET_PLAYING, true)
  commit(types.SET_FULL_SCRENN, true)
  commit(types.SET_PLAY_LIST, list)
  commit(types.SET_SEQUENCE_LIST, list)
  commit(types.SET_MODE, playMode.sequence)
  commit(types.SET_CURRENT_INDEX, index)
}