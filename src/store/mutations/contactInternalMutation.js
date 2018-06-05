/**
 * Created by youmc on 2017/1/16.
 */

import { CONTACTINTERNAL_DATA_LOAD_MORE, CONTACTINTERNAL_DATA_REFRESH } from '../constants/types'

export const contactInternalMutation = {
  [CONTACTINTERNAL_DATA_REFRESH] (state, data) {
    state.data = data
  },
  [CONTACTINTERNAL_DATA_LOAD_MORE] (state, data) {
    state.data = data
  }
}
