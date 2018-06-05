/**
 * Created by youmc on 2017/1/16.
 */

import { REMARK_DATA_REFRESH, REMARK_DATA_SAVE, REMARK_DATA_UPDATE, REMARK_DATA_REMOVE, REMARK_SET } from '../constants/types'

export const remarkMutation = {
  [REMARK_DATA_REFRESH] (state, data) {
    for(let i = 0, len = state.data.length; i < len; ++i) {
      let obj = state.data[i]
      if(obj.id == record.id) {
        state.data.splice(i, 1, record)
        break
      }
    }
    console.log('state', state)
    state.data = data
  },
  [REMARK_SET] (state, id) {
    if(id == null) {
      state.remark = null
      return;
    }
    for(let i = 0, len = state.data.length; i < len; ++i) {
      let record = state.data[i]
      if(id == record.id) {
        state.remark = record
        break
      }
    }
  },
  [REMARK_DATA_SAVE] (state, record) {
    state.data.push(record)
  },
  [REMARK_DATA_UPDATE] (state, record) {
    for(let i = 0, len = state.data.length; i < len; ++i) {
      let obj = state.data[i]
      if(obj.id == record.id) {
        state.data.splice(i, 1, record)
        break
      }
    }
  },
  [REMARK_DATA_REMOVE] (state, id) {
    for(let i = 0, len = state.data.length; i < len; ++i) {
      let record = state.data[i]
      if(record.id == id) {
        state.data.splice(i, 1)
        break
      }
    }
  }
}
