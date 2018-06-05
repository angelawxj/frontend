/**
 * Created by youmc on 2017/1/16.
 */

import { PAGE_SET_OTHER_FLAG,PERMISSION } from '../constants/types'

export const pageMutation = {
  [PAGE_SET_OTHER_FLAG] (state, otherFlag) {
    state.otherFlag = otherFlag
  },
  [PERMISSION] (state, permiss) {
    state.permiss = permiss
  }
}
