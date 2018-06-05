/* ajax */

(function($) {
	appcan.ready(function() {
		var Login_cd = JSON.parse(appcan.getLocVal("EPortal-UserInfo")).userId;
		var ajaxTimeout = 50000;
		function ajax(url, params, successCallback, errorCallback, axios)
		{
			//var params = {dep_user_name:"2222",loginCd:"22323",tel:"15079028062",dep_comment:"111",op_cn_name:"2222",svr_type:"1",position:"",department:"北京"};
			    /*appcan.ajax({
			      url:url,
			      type:'POST',
					//contentType: 'application/json',
			        // headers:{'Content-Type':'application/x-www-form-urlencoded'},
			        // processData: false,
			      data:params,
			      dataType:'json',
			      //timeout: ajaxTimeout,
			      success: function(data) {
			        successCallback(data);
			      }, error:function(errorType) {
			        errorCallback(errorType);
			      }
			    });*/
		   appcan.ajax({
		            url: url,
		            type : 'POST',
		            dataType : 'json',
		            data : params,
		            success : function(data) {
		                successCallback(data);
		            },
		            error : function(e) {
		             errorCallback(e);
		            }
		          }); 
		
		}
		window.addEventListener('message', function(event) {
		  //event.source, event.data
		  if(event.source == window.parent) {
		    if(event.data == 'getDeviceInfoCallback') {
		      alert(event.data);
		    }
		  }
		});
		//生成环境,测试环境地址切换
		//var urlPrefix = "https://cdms-mobile.shenzhenair.com:8082";
		//var urlPrefix = "http://10.12.102.168:8080";
		//var urlPrefix = "http://10.28.86.15:8080"//家丽本地
		//mas地址
		//var urlmas = "http://10.12.102.225:8088/zpzy";//测试
		var urlmas = "https://apps.shenzhenair.com/masIn/zpzy";//生产
		//var urlmas = "http://127.0.0.1:8088/zpzy";//本地
		
		var phone_num = '';
		function getTel() {
	 		var params = {
	 			login_cd: Login_cd
	 		}
			ajax(urlmas+ '/getTel', params,function(res){
	    		phone_num = res.ResultSta.phone_num;		
		    },function(err){
		    	console.log(err)
		    }); 
		}
	});
})($);








//截取地址栏的Login_cd参数
function getQueryVariable(variable)
{
   var query = window.location.search.substring(1);
   var vars = query.split("&");
   for (var i=0;i<vars.length;i++) {
           var pair = vars[i].split("=");
           if(pair[0] == variable){return pair[1];}
   }
   return(false);
}

//var Login_cd = getQueryVariable("login_CD");
//var Login_cd = 'W00178';//A16476 W00178 A21225 
//var login_cd =  window.localStorage.getItem('login_cd');
//var phone_num = '';
// Login_cd = '';
 

