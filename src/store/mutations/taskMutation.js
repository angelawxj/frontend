/**
 * Created by youmc on 2017/1/16.
 */

import { TASK_DATA_LOAD_MORE, TASK_DATA_REFRESH, TASK_DATA_PREVIOUS, TASK_DATA_SAVE, TASK_DATA_UPDATE, STAR_DATA_REFRESH} from '../constants/types'

export const taskMutation = {
  [TASK_DATA_LOAD_MORE] (state, data) {
    state.data = state.data.concat(data)
  },
  [TASK_DATA_REFRESH] (state, data) {
    state.data = data
  },
  [TASK_DATA_PREVIOUS] (state, data) {
    state.previous = data
  },
  [TASK_DATA_SAVE] (state, record) {
    state.data.push(record)
  },
  [STAR_DATA_REFRESH] (state, data) {
    state.star = data
  },
  
  [TASK_DATA_UPDATE] (state, record) {
    for(let i = 0, len = state.data.length; i < len; ++i) {
      let obj = state.data[i]
      if(obj.id == record.id) {
        state.data.splice(i, 1, record)
        break
      }
    }
  }
}
