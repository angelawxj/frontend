/**
 * Created by youmc on 2017/1/16.
 */

import { MEMO_DATA_REFRESH, MEMO_SET, MEMO_DATA_SAVE, MEMO_DATA_UPDATE, MEMO_DATA_REMOVE } from '../constants/types'

export const memoMutation = {
  [MEMO_DATA_REFRESH] (state, data) {
    state.data = data
  },
  [MEMO_SET] (state, id) {
    if(id == null) {
      state.memo = null
      return;
    }
    for(let i = 0, len = state.data.length; i < len; ++i) {
      let record = state.data[i]
      if(id == record.id) {
        state.memo = record
        break
      }
    }
  },
  [MEMO_DATA_SAVE] (state, record) {
    state.data.push(record)
  },
  [MEMO_DATA_UPDATE] (state, record) {
    for(let i = 0, len = state.data.length; i < len; ++i) {
      let obj = state.data[i]
      if(obj.id == record.id) {
        state.data.splice(i, 1, record)
        break
      }
    }
  },
  [MEMO_DATA_REMOVE] (state, id) {
    for(let i = 0, len = state.data.length; i < len; ++i) {
      let record = state.data[i]
      if(record.id == id) {
        state.data.splice(i, 1)
        break
      }
    }
  }
}
