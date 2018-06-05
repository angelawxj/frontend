/**
 * Created by youmc on 2017/1/16.
 */
import { CUSTOMER_DATA_LOAD_MORE, CUSTOMER_DATA_REFRESH, CUSTOMER_SET, CUSTOMER_DATA_SERVICE, CUSTOMER_DATA_FLIGHT, CUSTOMER_CHECKED_SET, CUSTOMER_DATA_MANAGER, CUSTOMERMGT_CHECKED_SET, CUSTOMER_DATA_TRUSTEESHIP, CUSTOMERTRUST_CHECKED_SET, CUSTOMER_DATA_ALLOCATIONNEXT, CUSTOMERALLOCATIONNEXT_CHECKED_SET, CUSTOMER_DATA_ALLOCATIONFILTER, CUSTOMERALLOCATIONFILTER_CHECKED_SET,CUSTOMERALLOCATIONNEXT_CHECKED_SELECTALL, CUSTOMER_DATA_TRUSTEESHIPCANCEL,JUMPTO, REFRESHREPAIR, REFRESHREPAIRDETAIL, LOAD_MORE_REPAIR, REFRESHREPAIR_PERSON, REPAIRDETAIL_ADD_SET, COLOR_HUI, REPAIRDETAIL_COLOR_SET,REPAIRDETAIL_DEL_SET,LOADMORE_PERSON,REFRESH_DEVELOPED,DEVELOPED_LOAD_MORE} from '../constants/types'
import axios from "axios"
//import TaskProgress from '../../../static/global'
import { Toast, MessageBox } from 'mint-ui'
import { Indicator } from 'mint-ui'


export const customerAction = {
  loadMoreCustomer ({ commit }, {params, loaded}) {
  	//var url= urlPrefix +'/cdms-mobile/ws/member/';
    ajax(urlmas+ '/moreCustomer',params ,function(res){
		if(res.MemberDetails.returnCode=='0'){
			commit(CUSTOMER_DATA_LOAD_MORE, res.MemberDetails.aList)
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
	      });
	      Indicator.close();
	    }
    },function(err){
    	Toast({
          message: err,
          position: 'bottom',
          duration: 2000
       });
       setTimeout(function(){
  			Indicator.close();
  		}, 500);
    }); 
  },
  refreshCustomer ({ commit }, {params, loaded}) {
  	ajax(urlPrefix +'/bookList/', params,function(res){	
  		Indicator.close();
		console.log(res);
	   	commit(CUSTOMER_DATA_REFRESH, res)
    },function(err){
    	Toast({
          message: err,
          position: 'bottom',
          duration: 2000
        })
    }); 
  },
  refreshCustomerFlight ({ commit }, {params, loaded}) {
    axios.get('static/data/flight.json')
    .then(function(res) {
      commit(CUSTOMER_DATA_FLIGHT, res.data)
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
  refreshCustomerService ({ commit }, {params, loaded}) {
    axios.get('static/data/service.json')
    .then(function(res) {
      commit(CUSTOMER_DATA_SERVICE, res.data)
      if(loaded) {
        loaded('done')
      }
    })
    .catch(function(err){
      if(loaded) {
        loaded('done')
      }
    })
  },
  otherJump  ({ commit }, {params, loaded, router}) {
 // var url = urlPrefix +'/cdms-mobile/ws/depart/trustInfo/';
    ajax(urlmas+ '/otherJump', params,function(res){
    	var url = '';
    	var flag = '';
    	if(res.TrustInfo.count == 0){
    		url = '/other/customerTrusteeship';
    		flag = '1';
    		Indicator.open({
			  text: '加载中',
			  spinnerType: 'fading-circle'
			});
    	}else{
    		url = '/other/customerTrusteeship/customerTrusteeshipCancel' ;
    		flag = '2'
    	}
	  	res.TrustInfo.url =url;
	  	res.TrustInfo.flag = flag;
	  	commit(JUMPTO, res.TrustInfo);
	  	Indicator.close();
	  	router.push({
	        path: url,
	        query: {
	          loginCd: res.TrustInfo.to_cd,
	          count: res.TrustInfo.count,
	          flag: res.TrustInfo.flag
	        }
	      })
    	Indicator.close();
    },function(err){
    	Toast({
          message: err,
          position: 'bottom',
          duration: 2000
       });
       Indicator.close();
    }); 
  },
  refreshCustomerMgt ({ commit }, {params, loaded}) {
  	// var url = urlPrefix +'/cdms-mobile/ws/depart/';
    ajax(urlmas+ '/contactInternal', {"login_cd":Login_cd},function(res){
    	commit(CUSTOMER_DATA_MANAGER, res.DepartmentDetails.aList)
    	Indicator.close();
    	if(loaded) {
	        loaded('done')
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
  //注销客户经理
  releaseCustomerMgt ({ commit }, {params, loaded, router}) {
// var url = urlPrefix +'/cdms-mobile/ws/depart/releaseManager/';
    ajax(urlmas+ '/releaseCustomerMgt', params,function(res){
    	
    	if(res.DepartmentDetails.returnCode=='0'){
    		router.go(-1)
//  		router.push('/other')
	    	Toast({
	          message: '客户经理注销成功',
	          position: 'bottom',
	          duration: 2000
	       	})
	    	
	    }else{
	    	Toast({
	          message: res.DepartmentDetails.errorInfo,
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
  refreshCustomerTrusteeship ({ commit }, {params, loaded}) {
// var url = urlPrefix +'/cdms-mobile/ws/depart/trust/';
  	ajax(urlmas+ '/customerTrusteeship', {"login_cd":Login_cd},function(res){
    	commit(CUSTOMER_DATA_TRUSTEESHIP, res.ListDepartment.aList)
    	Indicator.close();
    },function(err){
    	Toast({
          message: err,
          position: 'bottom',
          duration: 2000
        })
    	Indicator.close();
    }); 
  },
  //确定移交客户count
 customerTrusteeshipCancel ({ commit }, {params, router}) {
// 	var urlName = urlPrefix +'/cdms-mobile/ws/depart/trust/depart/';
//	console.log(params);
  	ajax(urlmas+ '/customerTrusteeshipCancel', params,function(res){
    	if(res.ResultState.returnCode=='0'){
	    	commit(CUSTOMER_DATA_TRUSTEESHIPCANCEL, res.ResultState)
	    }else{
	    	commit(CUSTOMER_DATA_TRUSTEESHIPCANCEL, res.ResultState)
	    	Toast({
	          message: res.ResultState.errorInfo,
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
  //撤回托管客户
  refreshCustomerTrusteeshipRecall ({ commit }, {router}) {
//  var url = urlPrefix +'/cdms-mobile/ws/depart/trust/recall/';
  	ajax(urlmas+ '/customerTrusteeshipRecall', {"login_cd":Login_cd},function(res){
    	;
    	if(res.ResultState.returnCode == '0') {
	    	Toast({
		          message: '撤回托管客户成功',
		          position: 'bottom',
		          duration: 2000
		      });
		    router.go(-1)
		}
    },function(err){
    	Toast({
          message: err,
          position: 'bottom',
          duration: 2000
        })
    }); 
  }, 
  refreshCustomerAllocationNext ({ commit }, {params, loaded, router, routerData}) {
	if(routerData == null){
		b = ''
	}else{
		var a = routerData.replace(/:/gi,'=');
		var  b = a.replace(/"/gi,'');	
	}
	
	params.data = b;
  	params.login_cd = Login_cd;
  	// var url = urlPrefix +'/cdms-mobile/ws/depart/findMember/';
  	ajax(urlmas+ '/customerAllocationNext', params,function(res){
    	commit(CUSTOMER_DATA_ALLOCATIONNEXT, res.ListMemberData.aList)
    	Indicator.close();
    	if(loaded) {
	        loaded('done')   
	    }
  	},function(err){
    	Toast({
          message: err,
          position: 'bottom',
          duration: 2000
        })
    	
    	Indicator.close();
    }); 
  },
  refreshCustomerAllocationFilter ({ commit }, {params, loaded}) {
    axios.get('static/data/customerAllocationFilter.json')
    .then(function(res) {
      commit(CUSTOMER_DATA_ALLOCATIONFILTER, res.data)
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
  //功能管理->客户经理管理->新建客户经理->新建按钮
  addCustomerMgtSave ({ commit }, {params, loaded, router}) {
 // 	var url = "http://10.12.102.168:8080/cdms-mobile/ws/depart/insertManager/"
 //	var param = {dep_user_name:"2222",loginCd:"22323",tel:"15079028062",dep_comment:"111",op_cn_name:"2222",svr_type:"1",position:"",department:"北京"};
    ajax(urlmas+ '/addCustomerMgtSave',params,function(res){
    	if(res.DepartmentDetails.returnCode=='0'){
	    	Toast({
	          message: '新增客户经理成功',
	          position: 'bottom',
	          duration: 2000
	       	})
	    	router.replace("/other/customerManager")
	    }else{
	    	Toast({
	          message: res.DepartmentDetails.errorInfo,
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
  //绑定手机号码
  changePhoneFun ({ commit }, {params, loaded, router}) {
  	//  var url = urlPrefix +'/cdms-mobile/ws/depart/bindPhone/'
    ajax(urlmas+ '/changePhoneFun', params ,function(res){
  	Indicator.close();
    	Toast({
          message: '手机绑定成功',
          position: 'bottom',
          duration: 2000
       })
    	router.go(-1)
    },function(err){
    	Toast({
          message: err,
          position: 'bottom',
          duration: 2000
        })
    }); 
  },
  //客户托管撤回页面列表数据
  customerTrusteeshipCancelList ({ commit }, {params, loaded}) {
//  	var url = urlPrefix +'/cdms-mobile/ws/depart/insertManager/';
    ajax(urlmas+ '/customerTrusteeshipCancelList', params,function(res){
    	if(res.ResultState.returnCode=='0'){
	    	commit(CUSTOMER_DATA_MANAGER, res.DepartmentDetails.aList)
	    	router.go(-1)
	    }else{
	    	Toast({
	          message: res.ResultState.errorInfo,
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
  //客户分配下一步-会员批量委托接口
   custormerTrustFun ({ commit }, {params, loaded, router}) {
//   	var url = urlPrefix +'/cdms-mobile/ws/depart/trustSelect/';
//	var param ={datas:["18675494"],login_cd:"A00001",user_id:"F00999"}
	params.data = params.data.toString();
  	ajax(urlmas+ '/custormerTrustFun', params,function(res){
    	if(res.ResultState.returnCode=='0'){
	    	Toast({
	          message: '客户分配成功',
	          position: 'bottom',
	          duration: 2000
	       	})
	    	router.go(-1)
	    }else{
	    	Toast({
	          message: res.ResultState.errorInfo,
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
  //客户修复主列表
   refreshRepair ({ commit }, {params, loaded, router}) {
//  var url = urlPrefix +'/cdms-mobile/ws/repair/fltInfo/'
	ajax(urlmas+ '/repair', params,function(res){
//	ajax(urlPrefix +'/cdms-mobile/ws/repair/fltInfo/', params,function(res){	
    	if(res.returnCode=='0'){
    		commit(REFRESHREPAIR, res.aList)
    		Indicator.close()
	    	if(loaded) {
		        loaded('done')
		      }
	    }else{
	    	Toast({
	          message: res.ResultState.errorInfo,
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
   //客户修复主列表加载更多
   loadMoreRepair ({ commit }, {params, loaded, router}) {
//  var url = urlPrefix +'/cdms-mobile/ws/repair/fltInfo/'
	ajax(urlmas+ '/repair', params,function(res){
    	if(res.returnCode=='0'){
    		commit(LOAD_MORE_REPAIR, res.aList)
    		Indicator.close()
	    	if(loaded) {
		        loaded('done')
		      }
	    }else{
	    	Toast({
	          message: res.ResultState.errorInfo,
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
  //客户修复详细信息
   refreshRepairDetail ({ commit }, {params, loaded, router}) {
//  var url = urlPrefix +'/cdms-mobile/ws/repair/custDetailsInfo/'   	
	ajax(urlmas+ '/repairDetail', params,function(res){
//	ajax(urlPrefix +'/cdms-mobile/ws/repair/custDetailsInfo/', params,function(res){	
    	if(res.returnCode=='0'){
    		Indicator.close()
	    	commit(REFRESHREPAIRDETAIL, res)
//	    	router = res.baseList[0].gdr
	    }else{
	    	Toast({
	          message: res.errorInfo,
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
  //客户修复人员界面
   refreshRepairPerson ({ commit }, {params, loaded, router}) {
//  var url = urlPrefix +'/cdms-mobile/ws/repair/repairedCustInfo/'
	ajax(urlmas+ '/repairPerson', params,function(res){
//	ajax(urlPrefix +'/cdms-mobile/ws/repair/repairedCustInfo/', params,function(res){	
    	if(res.returnCode=='0'){
    		commit(REFRESHREPAIR_PERSON, res.aList)
    		Indicator.close()
	    	if(loaded) {
		        loaded('done')
		      }
	    }else{
	    	Toast({
	          message: res.ResultState.errorInfo,
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
   //客户修复人员界面加载更多
   loadMoreRepairPerson ({ commit }, {params, loaded, router}) {
//  var url = urlPrefix +'/cdms-mobile/ws/repair/fltInfo/'
	ajax(urlmas+ '/repairPerson', params,function(res){	
    	if(res.returnCode=='0'){
    		commit(LOADMORE_PERSON, res.aList)
    		Indicator.close()
	    	if(loaded) {
		        loaded('done')
		      }
	    }else{
	    	Toast({
	          message: res.ResultState.errorInfo,
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
  //客户修复界面-证件信息保存
   crdetsSave ({ commit }, {params, loaded, events, merg_cust_id, refreshRepairDetail}) {
// var url = urlPrefix +'/cdms-mobile/ws/repair/custWriteInfo/'
	ajax(urlmas+ '/crdetsSave',params,function(res){
	//ajax(urlPrefix +'/cdms-mobile/ws/repair/custWriteInfo/',params,function(res){	
    	if(res.returnCode=='0'){
 // 		alert(JSON.stringify(res))
    		Toast({
		          message: res.returnMsg,
		          position: 'bottom',
		          duration: 2000
		      });
		    var datas = JSON.parse(params.data);
		    if(datas[0].REJECT_FLG == "1"){
		    	console.log(events)
		    	events.style.background = "#ccc"
		    }else if(datas[0].REJECT_FLG == "2"){
		    	events.style.background = "#ccc"
		    }
//			if(refreshRepairDetail){
//		    	refreshRepairDetail({
//	    			params: {
//			        	"login_cd": Login_cd,
//			        	"merg_cust_id":merg_cust_id,
//			        },
//			      loaded: null
//	    		})
//		    }else{
//				
//			}
	    }else{
	    	Toast({
	          message: res.ResultState.errorInfo,
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
    //客户修复界面-证件信息保存
   allcrdetsSave ({ commit }, {params, loaded, events, merg_cust_id, refreshRepairDetail}) {
 //	alert(JSON.stringify(params))
	ajax(urlmas+ '/allcrdetsSave', params,function(res){
		
    	if(res.returnCode=='0'){
 // 		alert(JSON.stringify(res))
    		Toast({
		          message: res.returnMsg,
		          position: 'bottom',
		          duration: 2000
		      });
		    if(params.data){
			    var datas = JSON.parse(params.data);
			    if(datas[0].REJECT_FLG == "1"){
			    	console.log(events)
			    	events.style.background = "#ccc"
			    }else if(datas[0].REJECT_FLG == "2"){
			    	events.style.background = "#ccc"
			    }
			}
	    }else{
	    	Toast({
	          message: res.ResultState.errorInfo,
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
  //客户修复界面-证件信息保存
   crdetsDelete ({ commit }, {params, loaded, merg_cust_id, refreshRepairDetail}) {
	ajax(urlmas+ '/crdetsDelete', params,function(res){
		
    	if(res.returnCode=='0'){
    		refreshRepairDetail({
    			params: {
		        	"login_cd": Login_cd,
		        	"merg_cust_id":merg_cust_id,
		        },
		      loaded: null
    		})
    		Toast({
		          message: res.returnMsg,
		          position: 'bottom',
		          duration: 2000
		      });
		   
			
	    }else{
	    	Toast({
	          message: res.ResultState.errorInfo,
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
  //打电话
  phonecall ({ commit }, {params, loaded}) {
    ajax(params,{},function(res){	
    },function(err){
    	Toast({
          message: err,
          position: 'bottom',
          duration: 2000
        })
    }); 
  },
   //打电话
  getTel ({ commit }, {params, loaded}) {
    params = {"login_cd": Login_cd};	
	ajax(urlmas+ '/getTel', params,function(res){
    		
    },function(err){
    	Toast({
          message: err,
          position: 'bottom',
          duration: 2000
        })
    }); 
  },
    //待发展客户列表
   refreshDeveloped ({ commit }, {params, loaded, router}) {
//	ajax(urlmas+ '/dvlpCust', params,function(res){
	ajax1(urlPrefix +'/cdms-mobile/ws/dvlp/dvlpCustInfo', params,function(res){	
    	if(res.returnCode=='0'){
    		commit(REFRESH_DEVELOPED, res.aList)
    		Indicator.close()
	    	if(loaded) {
		        loaded('done')
		      }
	    }else{
	    	Toast({
	          message: res.ResultState.errorInfo,
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
   //待发展客户-列表加载更多
   loadMoreDeveloped ({ commit }, {params, loaded, router}) {
//  var url = urlPrefix +'/cdms-mobile/ws/repair/fltInfo/'
	ajax(urlmas+ '/dvlpCust', params,function(res){
//	ajax(urlPrefix +'/cdms-mobile/ws/dvlp/dvlpCustInfo', params,function(res){	
    	if(res.returnCode=='0'){
    		commit(DEVELOPED_LOAD_MORE, res.aList)
    		Indicator.close()
	    	if(loaded) {
		        loaded('done')
		      }
	    }else{
	    	Toast({
	          message: res.ResultState.errorInfo,
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
  //待发展客户-入会申请列表
   joinMember ({ commit }, {params, loaded, router}) {
//	ajax(urlmas+ '/repairPerson', params,function(res){
	ajax1(urlPrefix +'/cdms-mobile/ws/repair/fltInfo/', params,function(res){	
    	if(res.returnCode=='0'){
    		commit(JOINMEMBER, res.aList)
    		Indicator.close()
	    	if(loaded) {
		        loaded('done')
		      }
	    }else{
	    	Toast({
	          message: res.ResultState.errorInfo,
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
  //待发展客户，已是会员
  isMember({ commit }, {params, loaded, router}) {
	ajax(urlmas+ '/repairPerson', params,function(res){
//	ajax(urlPrefix +'/cdms-mobile/ws/repair/fltInfo/', params,function(res){	
    	if(res.returnCode=='0'){
    		
    		Indicator.close()
	    	if(loaded) {
		        loaded('done')
		      }
	    }else{
	    	Toast({
	          message: res.ResultState.errorInfo,
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
  //待发展客户，拒绝、永久拒绝
  refuseFun({ commit }, {params,flag, loaded, router,refresh}) {
	ajax(urlmas+ '/dvlpCustWrite', params,function(res){
//	ajax(urlPrefix +'/cdms-mobile/ws/dvlp/dvlpCustWriteInfo/', params,function(res){	
    	if(res.returnCode=='0'){
    		refresh()
    		Indicator.close()
    		if(flag !=='1'){
	    		Toast({
		          message: res.returnMsg,
		          position: 'bottom',
		          duration: 2000
		        })	
		    }
	    	if(loaded) {
		        loaded('done')
		      }
	    }else{
	    	Toast({
	          message: res.aList.returnMsg,
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
  //待发展-提交申请，点击是否，添加app_flag
    addAppFlag({ commit }, {params,flag, loaded, router,refresh}) {
//	ajax(urlmas+ '/dvlpCustWrite', params,function(res){
	ajax1(urlPrefix +'/cdms-mobile/ws/dvlp/dvlpCustReApplInfo/', params,function(res){	
    	if(res.returnCode=='0'){
    		
	    }else{
	    	Toast({
	          message: res.aList.returnMsg,
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
  //待发展客户-提交申请
  submitFun({ commit }, {params, loaded, router, refresh}) {
	ajax(urlmas+ '/dvlpCustAppl', params,function(res){
//	ajax(urlPrefix +'/cdms-mobile/ws/dvlp/dvlpCustApplInfo/', params,function(res){	
		function tip(tip) {
			MessageBox({
		        title: '提示',
		        message: tip,
		        showCancelButton: true,
		        confirmButtonText: '是',
		        cancelButtonText: false,
		        confirmButtonHighlight: false
		      }).then((action) => {
		        if(action == 'confirm') {
					router.go(-1)    
					refresh('01')
		        }else{
		        	refresh('02')
		        }
		      })	
		}
		function tips(tip){
			MessageBox.alert(tip, '提示').then(action => {
			  router.go(-1);
			});	
		}
		registerCode = res.returnCode;
    	if(res.returnCode=='0'){
    		tips('注册成功<br />会员卡号：'+res.memberNumber+'。<br />是否确认退出？<br />(<span style="color:red;">注册成功,名单中不在显示该旅客的推送数据</span>)')
    		Indicator.close()
	    	if(loaded) {
		        loaded('done')
		      }
	    }else if(res.returnCode=='99'){
	    	tip('注册失败<br />原因：系统异常。<br />是否确认退出？<br /><span style="color:red;">否：重新填写资料  <br />是：不再显示该旅客的推送数据</span>')
	    }else if(res.returnCode=='04'){
	    	tip('注册失败<br />原因：身份证不正确或者身份证号码重复。<br />是否确认退出？<br /><span style="color:red;">否：重新填写资料 <br /> 是：名单中不再显示该旅客的推送数据</span>')
	    }else if(res.returnCode=='05'){
	    	tip('注册失败<br />原因：自动获取会员号失败。<br />是否确认退出？<br /><span style="color:red;">否：重新填写资料  <br />是：名单中不再显示该旅客的推送数据</span>')
	    }else if(res.returnCode=='07'){
	    	tip('注册失败<br />原因：会员已经注册。<br />是否确认退出？<br /><span style="color:red;">否：重新填写资料 <br /> 是：名单中不再显示该旅客的推送数据</span>')
	    }else if(res.returnCode=='21'){
	    	tip('注册失败<br />原因：手机号码重复。<br />是否确认退出？<br /><span style="color:red;">否：重新填写资料  <br />是：名单中不再显示该旅客的推送数据</span>')
	    }else if(res.returnCode=='22'){
	    	tip('注册失败<br />原因：无效手机号。<br />是否确认退出？<br /><span style="color:red;">否：重新填写资料  <br />是：名单中不再显示该旅客的推送数据</span>')
	    }
    },function(err){
    	Toast({
          message: err,
          position: 'bottom',
          duration: 2000
        })
    }); 
  }, 
  //待发展客户-获取验证码
  verifyCode({ commit }, {params, loaded, router}) {
	ajax(urlmas+ '/dvlpCustSmsVaild', params,function(res){
//	ajax1(urlPrefix +'/cdms-mobile/ws/dvlp/dvlpCustSmsVaild', params,function(res){	
//  	if(res.returnCode=='0'){
    		VerCode = res.smsMessage
    		Indicator.close()
	    	if(loaded) {
		        loaded('done')
		      }
//	    }else{
//	    	Toast({
//	          message: res,
//	          position: 'bottom',
//	          duration: 2000
//	      })	
//	    }
    },function(err){
    	Toast({
          message: err,
          position: 'bottom',
          duration: 2000
        })
    }); 
  }, 

  setCustomer ({ commit }, id) {
    commit(CUSTOMER_SET, id)
  },
  setCustomerChecked ({ commit }, id) {
    commit(CUSTOMER_CHECKED_SET, id)
  },
  setCustomerMgtChecked ({ commit }, id) {
    commit(CUSTOMERMGT_CHECKED_SET, id)
  },
  setCustomerTrustChecked ({ commit }, id) {
    commit(CUSTOMERTRUST_CHECKED_SET, id)
  },
  setCustomerAllocationNextChecked ({ commit }, id) {
    commit(CUSTOMERALLOCATIONNEXT_CHECKED_SET,  id)
  },
  setCustomerAllocationFilterChecked ({ commit }, id) {
    commit(CUSTOMERALLOCATIONFILTER_CHECKED_SET, id)
  },
  selectAllCustomerAllocationNext ({ commit }, id) {
    commit(CUSTOMERALLOCATIONNEXT_CHECKED_SELECTALL, id)
  },
  setAdd ({ commit }, data) {
    commit(REPAIRDETAIL_ADD_SET, data)
  },
  setDelete ({ commit }, data) {
    commit(REPAIRDETAIL_DEL_SET, data)
  },
  setColor ({ commit }, data) {
    commit(REPAIRDETAIL_COLOR_SET, data)
  },
  
}
