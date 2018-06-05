/**
 * Created by youmc on 2017/1/16.
 */

import { TASK_DATA_LOAD_MORE, TASK_DATA_REFRESH, TASK_DATA_PREVIOUS, TASK_DATA_SAVE, TASK_DATA_UPDATE } from '../constants/types'
import axios from "axios"
import { Toast } from 'mint-ui'

export const taskAction = {
  loadMoreTask ({ commit }, {params, loaded}) {
    axios.get('static/data/task.json')
    .then(function(res){
      commit(TASK_DATA_LOAD_MORE, res.data)
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
  refreshTask ({ commit }, {params, loaded}) {
	ajax(urlPrefix , params,function(res){	
		console.log(res);
	   	commit(TASK_DATA_REFRESH, res)
    },function(err){
    	Toast({
          message: err,
          position: 'bottom',
          duration: 2000
        })
    }); 
  },
  previousTask ({ commit }, loaded) {
    axios.get('static/data/previous.json')
    .then(function(res) {
      commit(TASK_DATA_PREVIOUS, res.data)
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
  saveTask ({ commit }, record) {
    if(record.id && record.id != '') {
      commit(TASK_DATA_UPDATE, record)
    } else {
      let timestamp = Math.round(new Date().getTime() / 1000)
      record.id = '' + timestamp;
      commit(TASK_DATA_SAVE, record)
    }
  }
}
