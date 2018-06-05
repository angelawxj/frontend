/**
 * Created by youmc on 2017/1/16.
 */

import { PORT_DATA_LOAD_MORE, PORT_DATA_REFRESH, PORT_ID_SET } from '../constants/types'

export const portMutation = {
  [PORT_DATA_LOAD_MORE] (state, data) {
    state.data = state.data.concat(data)
  },
  [PORT_DATA_REFRESH] (state, data) {
    state.data = data
  },
  [PORT_ID_SET] (state, id) {
    state.portID = id
  }
}
