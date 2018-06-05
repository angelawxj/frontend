/**
 * Created by youmc on 2017/1/16.
 */

import { MESSAGE_DATA_REFRESH, MESSAGE_DATA_SAVE, MESSAGE_DATA_UPDATE, MESSAGE_DATA_REMOVE, MESSAGE_SET } from '../constants/types'
import { Toast } from 'mint-ui'
import axios from "axios"
import { Indicator } from 'mint-ui'

export const messageAction = {
  refreshMessage ({ commit }, {params, loaded}) {
//  var url = urlPrefix +'/cdms-mobile/ws/sms/query'	
    ajax(urlmas+ '/message',params ,function(res){
		if(res.state=='0'){
	  		commit(MESSAGE_DATA_REFRESH, res.list)
	  		Indicator.close();
			if(loaded) {
		        loaded('done')    
		    }
		}else{
	    	Toast({
	          message: res.PsgInfoData.errorInfo,
	          position: 'bottom',
	          duration: 2000
	      });
	    Indicator.close();
	    }
    },function(err){
    	Toast({
          message: err,
          position: 'bottom',
          duration: 2000
       });
      Indicator.close();
    }); 
  },
  saveMessage ({ commit }, {params, router}) {
//  var url = urlPrefix +'/cdms-mobile/ws/sms/editOrInsert/'
     ajax(urlmas+ '/saveMessage',params ,function(res){
		if(res.state=='0'){
			if(params.type == 'insert'){
				Toast({
		          message: '短信模板增加成功',
		          position: 'bottom',
		          duration: 2000
		       	})
			}else{
		  		Toast({
		          message: '短信模板修改成功',
		          position: 'bottom',
		          duration: 2000
		       	})
		  }
	  		router.go(-1)
		}else{
	    	Toast({
	          message: res.errorInfo,
	          position: 'bottom',
	          duration: 2000
	      });
	    Indicator.close();
	    }
    },function(err){
    	Toast({
          message: err,
          position: 'bottom',
          duration: 2000
       });
      Indicator.close();
    }); 
  },
  sendMessage ({ commit },{params, loaded, router}) {
//  var url = urlPrefix +'/cdms-mobile/ws/sms/sendMessage/'
   ajax(urlmas+ '/sendMessage',params ,function(res){
		if(res.returnCode=='0'){
	  		Toast({
	          message: '信息发送成功',
	          position: 'bottom',
	          duration: 2000
	       	})
	  		router.go(-2)
		}else{
	    	Toast({
	          message: '功能维护中。。。',
	          position: 'bottom',
	          duration: 2000
	      });
	    Indicator.close();
	    }
    },function(err){
    	Toast({
          message: '功能维护中',
          position: 'bottom',
          duration: 2000
       });
      Indicator.close();
    }); 
  },
  removeMessage ({ commit },{params, loaded, router, refresh}) {
//  var url = urlPrefix +'/cdms-mobile/ws/sms/editOrInsert/'
    ajax(urlmas+ '/removeMessage',params,function(res){
		if(res.state=='0'){
	  		Toast({
	          message: '短信模板删除成功',
	          position: 'bottom',
	          duration: 2000
	    })
	  		refresh()
		}else{
	    	Toast({
	          message: res.errorInfo,
	          position: 'bottom',
	          duration: 2000
	      });
	    Indicator.close();
	   
	    }
    },function(err){
    	Toast({
          message: err,
          position: 'bottom',
          duration: 2000
       });
      Indicator.close();
    }); 
  },
  setMessage ({ commit }, id) {
    commit(MESSAGE_SET, id)
  }
}
