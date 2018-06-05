/**
 * Created by youmc on 2017/1/16.
 */

import { CONTACTRECORDS_DATA_REFRESH, CONTACTRECORDS_DATA_GET_NOANSWER } from '../constants/types'

export const contactRecordsMutation = {
  [CONTACTRECORDS_DATA_REFRESH] (state, data) {
    state.data = data
  },
  [CONTACTRECORDS_DATA_GET_NOANSWER] (state, data) {
    state.data = data
  }
}
