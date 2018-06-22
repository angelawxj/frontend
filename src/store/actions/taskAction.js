/**
 * Created by youmc on 2017/1/16.
 */

import { TASK_DATA_LOAD_MORE, TASK_DATA_REFRESH, TASK_DATA_PREVIOUS, TASK_DATA_SAVE, TASK_DATA_UPDATE, STAR_DATA_REFRESH, STAR_DATA_LOAD_MORE} from '../constants/types'
import axios from "axios"
import { Toast } from 'mint-ui'
import { Indicator } from 'mint-ui'

export const taskAction = {
  loadMoreTask ({ commit }, {params, loaded}) {
    ajax(urlPrefix + '?page=' + params,'GET', params,function(res){	
	   	commit(TASK_DATA_LOAD_MORE, res.results)
	   	if(loaded) {
	        loaded('done')    
	    }
    },function(err){
    	Toast({
          message: err,
          position: 'bottom',
          duration: 2000
        })
    }); 
  },
  refreshTask ({ commit }, {params, loaded}) {
	ajax(urlPrefix,'GET', params,function(res){	
		console.log(res)
		if(loaded) {
	        loaded('done')    
	    }
	   	commit(TASK_DATA_REFRESH, res.results)
    },function(err){
    	Toast({
          message: err,
          position: 'bottom',
          duration: 2000
        })
    }); 
  },
  refreshStar({ commit }, {params, loaded}) {
	ajax(urlPrefix+'?heart=1','GET', params,function(res){	
		console.log(res);
	   	commit(STAR_DATA_REFRESH, res.results)
	   	if(loaded) {
	        loaded('done')    
	    }
    },function(err){
    	Toast({
          message: err,
          position: 'bottom',
          duration: 2000
        })
    }); 
  },
  searchTask({ commit }, {params, loaded}) {
	ajax(urlPrefix + '?search=' + params,'GET', params,function(res){	
		console.log(res);
	   	commit(TASK_DATA_REFRESH, res.results)
    },function(err){
    	Toast({
          message: err,
          position: 'bottom',
          duration: 2000
        })
    }); 
  },
   addStar({ commit }, {params,id, loaded}) {
	ajax(urlPrefix + id +'/','PUT', params,function(res){	
		console.log(res);
	   	
    },function(err){
    	Toast({
          message: err,
          position: 'bottom',
          duration: 2000
        })
    }); 
  },
  loadMoreStar({ commit }, {params, loaded}) {
    ajax(urlPrefix+'?heart=1&page=' + params,'GET', params,function(res){	
		console.log(res);
	   	commit(STAR_DATA_LOAD_MORE, res.results)
	   	if(loaded) {
	        loaded('done')    
	    }
    },function(err){
    	Toast({
          message: err,
          position: 'bottom',
          duration: 2000
        })
    }); 
  },
  deleteStar({ commit }, {id,params,refresh, loaded}) {
	ajax(urlPrefix+ id +'/','PUT', params,function(res){	
		console.log(res);
	   	refresh()
	   	Indicator.close();
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
