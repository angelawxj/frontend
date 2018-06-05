/**
 * Created by youmc on 2017/1/16.
 */

import { MESSAGE_DATA_REFRESH, MESSAGE_SET, MESSAGE_DATA_SAVE, MESSAGE_DATA_UPDATE, MESSAGE_DATA_REMOVE } from '../constants/types'

export const messageMutation = {
  [MESSAGE_DATA_REFRESH] (state, data) {
    state.data = data
  },
  [MESSAGE_SET] (state, id) {
    if(id == null) {
      state.message = null
      return;
    }
    for(let i = 0, len = state.data.length; i < len; ++i) {
      let record = state.data[i]
      if(id == record.temp_id) {
        state.message = record
        break
      }
    }
  },
  [MESSAGE_DATA_SAVE] (state, record) {
    state.data.push(record)
  },
  [MESSAGE_DATA_UPDATE] (state, record) {
    for(let i = 0, len = state.data.length; i < len; ++i) {
      let obj = state.data[i]
      if(obj.id == record.id) {
        state.data.splice(i, 1, record)
        break
      }
    }
  },
  [MESSAGE_DATA_REMOVE] (state, id) {
    for(let i = 0, len = state.data.length; i < len; ++i) {
      let record = state.data[i]
      if(record.id == id) {
        state.data.splice(i, 1)
        break
      }
    }
  }
}
