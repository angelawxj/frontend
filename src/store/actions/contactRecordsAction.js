/**
 * Created by youmc on 2017/1/16.
 */

import { CONTACTRECORDS_DATA_REFRESH, CONTACTRECORDS_DATA_GET_NOANSWER } from '../constants/types'
import axios from "axios"
import { Toast, MessageBox } from 'mint-ui'
import { Indicator } from 'mint-ui'

export const contactRecordsAction = {
  refreshContactRecords ({ commit }, {params, loaded}) {
  	Indicator.open({
		  text: '加载中',
		  spinnerType: 'fading-circle'
		});
// var url = urlPrefix +'/cdms-mobile/ws/depart/findCallRecord/'		
	ajax(urlmas+ '/contactRecords',params ,function(res){
		if(res.CallRecordDetail.returnCode=='0'){
	  		commit(CONTACTRECORDS_DATA_REFRESH, res.DepartmentDetails.aList)
	  		Indicator.close();
	  		
			if(loaded) {
		        loaded('done')
		        
		    }
		}else{
//	    	Toast({
//	          message: res.CallRecordDetail.errorInfo,
//	          position: 'bottom',
//	          duration: 2000
//	      })	
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
  getNoanswerContactRecords ({ commit }, {params, loaded}) {
    axios.get('static/data/contactRecords.json')
    .then(function(res) {
      let records = []
      for(let i = 0, len = res.data.length; i < len; ++i) {
        let record = res.data[i]
        if(!record.flag) {
          records.push(record)
        }
      }
      commit(CONTACTRECORDS_DATA_GET_NOANSWER, records)
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
  }
}
