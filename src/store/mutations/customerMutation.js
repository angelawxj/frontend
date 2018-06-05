/**
 * Created by youmc on 2017/1/16.
 */

import { CUSTOMER_DATA_LOAD_MORE, CUSTOMER_DATA_REFRESH, CUSTOMER_SET, CUSTOMER_DATA_SERVICE, CUSTOMER_DATA_FLIGHT,CUSTOMER_DATA_ALLOCATIONNEXT,CUSTOMER_DATA_MANAGER,CUSTOMER_DATA_TRUSTEESHIP, CUSTOMER_CHECKED_SET,CUSTOMERMGT_CHECKED_SET,CUSTOMERTRUST_CHECKED_SET,CUSTOMERALLOCATIONNEXT_CHECKED_SET,CUSTOMER_DATA_ALLOCATIONFILTER,CUSTOMERALLOCATIONFILTER_CHECKED_SET,CUSTOMERALLOCATIONNEXT_CHECKED_SELECTALL, CUSTOMER_DATA_TRUSTEESHIPCANCEL, CUSTOMERMGT_DATA_SAVE, JUMPTO, REFRESHREPAIRDETAIL, REFRESHREPAIR, LOAD_MORE_REPAIR, REFRESHREPAIR_PERSON, REPAIRDETAIL_ADD_SET, REPAIRDETAIL_COLOR_SET, REPAIRDETAIL_DEL_SET,LOADMORE_PERSON,REFRESH_DEVELOPED,DEVELOPED_LOAD_MORE} from '../constants/types'
import Vue from 'vue'

export const customerMutation = {
  [CUSTOMER_DATA_LOAD_MORE] (state, data) {
    state.data = state.data.concat(data)
  },
  [JUMPTO](state, data) {
    state.other = data
  },
  [REFRESHREPAIRDETAIL](state, data) {
    state.repairDetail = data
//  var title = {["基本信息","证件信息","基本信息","基本信息"]}
  },
  [REFRESHREPAIR_PERSON](state, data) {
    state.repairPerson = data
  },
  [REFRESHREPAIR](state, data) {
    state.repair = data
  },
  [LOAD_MORE_REPAIR](state, data) {
    state.repair = state.repair.concat(data)
  },
  [LOADMORE_PERSON](state, data) {
    state.repairPerson = state.repairPerson.concat(data)
  },
  
  [CUSTOMER_DATA_REFRESH] (state, data) {
    state.data = data
   
  },
  [CUSTOMER_DATA_ALLOCATIONFILTER] (state, data) {
    state.allocationFilter = data
  }, 
  [CUSTOMER_DATA_ALLOCATIONNEXT] (state, data) {
    state.allocationNext = data
  },
  [CUSTOMER_DATA_MANAGER] (state, data) {
    state.data = data
  },
  [CUSTOMERMGT_DATA_SAVE] (state, data) {
    state.data.push(data)
  },
  [CUSTOMER_DATA_TRUSTEESHIPCANCEL] (state, data) {
    state.trusteeshipCancel = data
  },
  [CUSTOMER_DATA_TRUSTEESHIP] (state, data) {
  	console.log("trusteeship",state.data);
    state.trusteeship = data
  },
  
  //待发展列表
  [REFRESH_DEVELOPED](state, data) {
    state.developed = data
  },
  //待发展列表加载更多
  [DEVELOPED_LOAD_MORE](state, data) {
    state.developed = state.developed.concat(data)
  },
  
  [CUSTOMER_SET] (state, id) {
    if(id == null) {
      state.customer = null
      return;
    }
    for(let i = 0, len = state.data.length; i < len; ++i) {
      let record = state.data[i]
      if(id == record.id) {
        state.customer = record
        break
      }
    }
  },
  [REPAIRDETAIL_ADD_SET] (state, data) {
  	if(data.flag == "crdets"){
	  	var length = state.repairDetail.crdetsList.length;
	  	state.repairDetail.crdetsList[length]= data;
  	}else if(data.flag == "contact"){
  		var length = state.repairDetail.contList.length;
	  	state.repairDetail.contList[length]= data;
  	}else if(data.flag == "addr"){
  		var length = state.repairDetail.addrList.length;
	  	state.repairDetail.addrList[length]= data;
  	}
  },
  [REPAIRDETAIL_DEL_SET] (state, data) {
  	var creindex = data.index;
  	if(data.flag == "crdets"){
  		state.repairDetail.crdetsList.splice(creindex,1);
  	}else if(data.flag == "contact"){
	  	state.repairDetail.contList.splice(creindex,1);
  	}else if(data.flag == "addr"){
	  	state.repairDetail.addrList.splice(creindex,1);
  	}
  },
  [REPAIRDETAIL_COLOR_SET] (state, data) {
  	if(data.type == "crdets"){
 		var index = data.index;
 		if(data.error == "1" && data.success=="3"){
	  		state.repairDetail.crdetsList[index].error = "1";
	  		state.repairDetail.crdetsList[index].success = "3";
	  	}else if(data.error == "3" && data.success=="2"){
	  		state.repairDetail.crdetsList[index].error = "3";
	  		state.repairDetail.crdetsList[index].success = "2";
	  	}else if(!data.success){
	  		state.repairDetail.crdetsList[index].error = "3";
	  	}else if(!data.error){
	  		state.repairDetail.crdetsList[index].success = "3";
	  		
	  	}
  	}else if(data.type == "contact"){
  		var index = data.index;
	  	if(data.error == "1" && data.success=="3"){
	  		state.repairDetail.contList[index].error = "1";
	  		state.repairDetail.contList[index].success = "3";
	  	}else if(data.error == "3" && data.success=="2"){
	  		state.repairDetail.contList[index].error = "3";
	  		state.repairDetail.contList[index].success = "2";
	  	}else if(!data.success){
	  		state.repairDetail.contList[index].error = "3";
	  	}else if(!data.error){
	  		state.repairDetail.contList[index].success = "3";
	  		
	  	}
  	}else if(data.type == "addr"){
  		var index = data.index;
  		if(data.error == "1" && data.success=="3"){
	  		state.repairDetail.addrList[index].error = "1";
	  		state.repairDetail.addrList[index].success = "3";
	  	}else if(data.error == "3" && data.success=="2"){
	  		state.repairDetail.addrList[index].error = "3";
	  		state.repairDetail.addrList[index].success = "2";
	  	}else if(!data.success){
	  		state.repairDetail.addrList[index].error = "3";
	  	}else if(!data.error){
	  		state.repairDetail.addrList[index].success = "3";
	  		
	  	}
  	}
  },
  [CUSTOMER_DATA_SERVICE] (state, data) {
    state.service = data
  },
  [CUSTOMER_DATA_FLIGHT] (state, data) {
    state.flight = data
  },
  [CUSTOMER_CHECKED_SET] (state, id) {
    for(let i = 0, len = state.allocationNext.length; i < len; ++i) {
      let record = state.allocationNext[i]
      if(record.merg_cust_id == id) {
        if(record.checked) {
          record.checked = false
        } else {
          record.checked = true
        }
        Vue.set(state.allocationNext, i, record);
        break
      }
    }
  },
  [CUSTOMERALLOCATIONFILTER_CHECKED_SET] (state, id) {
    console.log("成功",state.data);
    for(let i = 0, len = state.allocationFilter.length; i < len; ++i) {
    	let data = state.allocationFilter[i]
		if(data.children){
	    	for(let j = 0, subLen = data.children.length; j < subLen; ++j){
	    		let record = data.children[j]
	    		if(record.id == id) {
			        if(record.checked) {
			          record.checked = false
			        } else {
			          record.checked = true
			        }
					Vue.set(data.children, j, record);
					break
			    } 
	    	}
	    }
    }
  },
  [CUSTOMERTRUST_CHECKED_SET] (state, id) {
    for(let i = 0, len = state.trusteeship.length; i < len; ++i) {
    	let record = state.trusteeship[i]
    	if(record.checked){
			record.checked = false
			 Vue.set(state.trusteeship, i, record);
		}
		if(record.dep_id == id) {
	        record.checked = true	
	        Vue.set(state.trusteeship, i, record);
	   	}
    }
  },
  [CUSTOMERALLOCATIONNEXT_CHECKED_SET] (state, id) {
    for(let i = 0, len = state.allocationNext.length; i < len; ++i) {
      	let record = state.allocationNext[i]
	    if(record.merg_cust_id == id) {
	        if(record.checked) {
	          record.checked = false
	        } else {
	          record.checked = true
	        }
	        Vue.set(state.allocationNext, i, record);
	        break
		}
    }
  },
  [CUSTOMERMGT_CHECKED_SET] (state, id) {
    for(let i = 0, len = state.data.length; i < len; ++i) {
    	let data = state.data[i]
		if(data.listDepartment){
	    	for(let j = 0, subLen = data.listDepartment.length; j < subLen; ++j){
	    		let record = data.listDepartment[j]
	    		if(record.checked){
    				record.checked = false
    				 Vue.set(data.listDepartment, j, record);
    			}
    			if(record.dep_id == id) {
			        record.checked = true	
			        Vue.set(data.listDepartment, j, record);
			    }
	    	}	
	    }
    }
  },
  [CUSTOMERALLOCATIONNEXT_CHECKED_SELECTALL] (state, flag) {
    for(let i = 0, len = state.allocationNext.length; i < len; ++i) {
      	let record = state.allocationNext[i]
      	if(flag){
	    	if(record.checked) {
		    } else {
		      record.checked = true
		    }
		    Vue.set(state.allocationNext, i, record);
		}else{
			if(record.checked) {
	    		record.checked = false
		    }
		    Vue.set(state.allocationNext, i, record);
		}
	}
  }
}
