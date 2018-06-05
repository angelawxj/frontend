/**
 * Created by youmc on 2017/1/16.
 */

import { PORT_DATA_LOAD_MORE, PORT_DATA_REFRESH, PORT_ID_SET } from '../constants/types'
import axios from "axios"
import { Toast, MessageBox } from 'mint-ui'
import { Indicator } from 'mint-ui'

export const portAction = {
  loadMorePort ({ commit }, {params, loaded}) {
  	//  var url = urlPrefix +'/cdms-mobile/ws/psginfo/'
    ajax(urlmas+ '/port',params ,function(res){
		if(res.PsgInfoData.returnCode=='0'){
	  		commit(PORT_DATA_LOAD_MORE, res.PsgInfoData.aList)
	  		Indicator.close();
	  		
			if(loaded) {
		        loaded('done')
		        
		    }
		}else{
	    	Toast({
	          message: res.PsgInfoData.errorInfo,
	          position: 'bottom',
	          duration: 2000
	      })	
	    }
    },function(err){
    	Toast({
          message: err,
          position: 'bottom',
          duration: 2000
        })
    }); 
  },
  refreshPort ({ commit }, {params, loaded}) {
//  var url = urlPrefix +'/cdms-mobile/ws/psginfo/'
    ajax(urlmas+ '/port',params ,function(res){
		if(res.PsgInfoData.returnCode=='0'){
	  		commit(PORT_DATA_REFRESH, res.PsgInfoData.aList)
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
	      setTimeout(function(){
	  			Indicator.close();
	  		}, 500);
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
  setPortID ({ commit }, id) {
    commit(PORT_ID_SET, id)
  }
}
