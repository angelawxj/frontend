/**
 * Created by youmc on 2017/1/16.
 */

import { CONTACTINTERNAL_DATA_LOAD_MORE, CONTACTINTERNAL_DATA_REFRESH } from '../constants/types'
import axios from "axios"
import { Toast, MessageBox } from 'mint-ui'
import { Indicator } from 'mint-ui'

export const contactInternalAction = {
	loadMoreContactInternal ({ commit }, {params, loaded}) {
    ajax(urlPrefix +'/cdms-mobile/ws/depart/',params ,function(res){
		if(res.MemberDetails.returnCode=='0'){
			commit(CONTACTINTERNAL_DATA_LOAD_MORE, res.MemberDetails.aList)
			if(res.MemberDetails.aList.length == 0){
				if(loaded) {
			        loaded('done')    
			    }
			}else{
		  		Indicator.close();
				if(loaded) {
			        loaded('done')    
			    }
			}
		}else{
	    	Toast({
	          message: res.MemberDetails.errorInfo,
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
  refreshContactInternal ({ commit }, {params, loaded}) {
  	document.getElementsByTagName("list").innerHTML= '';
// var url = urlPrefix +'/cdms-mobile/ws/depart/'
	ajax(urlmas+ '/contactInternal',params ,function(res){
		if(res.DepartmentDetails.returnCode=='0'){
	  		commit(CONTACTINTERNAL_DATA_REFRESH, res.DepartmentDetails.aList)
	  		Indicator.close();
	  		
			if(loaded) {
		        loaded('done')
		        
		    }
		}else{
	    	Toast({
	          message: res.MemberDetails.errorInfo,
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
}