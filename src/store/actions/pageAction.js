/**
 * Created by youmc on 2017/1/16.
 */

import { PAGE_SET_OTHER_FLAG,PERMISSION } from '../constants/types'

export const pageAction = {
  setOtherFlag ({ commit }, otherFlag) {
    commit(PAGE_SET_OTHER_FLAG, otherFlag)
  },
  //判断是否有权限
  permission ({ commit }, {params, loaded, tel}) {	
	ajax(urlmas+ '/getTel', params,function(res){
    	var phone = res.ResultSta.phone_num;
    	if(phone=='' || phone==null){
    		phone = true;
    	}else{
    		phone = false;
    	}
		commit(PERMISSION, phone)	
    },function(err){
    	console.log(err)
    }); 
  },
}
