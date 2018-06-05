/**
 * Created by youmc on 2017/1/16.
 */

import { REMARK_DATA_REFRESH, REMARK_DATA_SAVE, REMARK_DATA_UPDATE, REMARK_DATA_REMOVE, REMARK_SET } from '../constants/types'
import axios from "axios"
import { Toast } from 'mint-ui'

export const remarkAction = {
  refreshRemark ({ commit }, {params, loaded}) {
    axios.get('static/data/remark.json')
    .then(function(res) {
      commit(REMARK_DATA_REFRESH, res.data)
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
  saveRemark ({ commit }, record) {
    if(record.id && record.id != '') {
      commit(REMARK_DATA_UPDATE, record)
    } else {
      let timestamp = Math.round(new Date().getTime() / 1000)
      record.id = '' + timestamp;
      commit(REMARK_DATA_SAVE, record)
    }
    Toast({
      message: '保存成功',
      position: 'bottom',
      duration: 2000
    })
  },
  removeRemark ({ commit }, id) {
    commit(REMARK_DATA_REMOVE, id)
  },
  setRemark ({ commit }, id) {
    commit(REMARK_SET, id)
  }
}
