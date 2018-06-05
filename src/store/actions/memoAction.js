/**
 * Created by youmc on 2017/1/16.
 */

import { MEMO_DATA_REFRESH, MEMO_DATA_SAVE, MEMO_DATA_UPDATE, MEMO_DATA_REMOVE, MEMO_SET } from '../constants/types'
import axios from "axios"
import { Toast } from 'mint-ui'

export const memoAction = {
  refreshMemo ({ commit }, {params, loaded}) {
    axios.get('static/data/memo.json')
    .then(function(res) {
      commit(MEMO_DATA_REFRESH, res.data)
      if(loaded) {
        loaded('done')
      }
    })
    .catch(function(err){
      console.log(err)
      if(loaded) {
        loaded('done')
      }
    })
  },
  saveMemo ({ commit }, record) {
    if(record.id && record.id != '') {
      commit(MEMO_DATA_UPDATE, record)
    } else {
      let timestamp = Math.round(new Date().getTime() / 1000)
      record.id = '' + timestamp;
      commit(MEMO_DATA_SAVE, record)
    }
    Toast({
      message: '保存成功',
      position: 'bottom',
      duration: 2000
    })
  },
  removeMemo ({ commit }, id) {
    commit(MEMO_DATA_REMOVE, id)
  },
  setMemo ({ commit }, id) {
    commit(MEMO_SET, id)
  }
}
