/* ajax */

var ajaxTimeout = 50000;

function ajax(url, params, successCallback, errorCallback, axios)
{
//	    ajax({
//	      url:url,
//	      type:'GET',
//	      data:params,
//	      dataType:'json',
//	      //timeout: ajaxTimeout,
//	      success: function(data) {
//	        successCallback(data);
//	      }, error:function(errorType) {
//	        errorCallback(errorType);
//	      }
//	    });
	$.ajax({
	  url: url,
	  type:'get',
	  data: '',
	  dataType: 'json',
	  success:function(data) {    
        successCallback(data);
     },    
     error : function() {    
          
         errorCallback(errorType);
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
	//var urlPrefix = "https://cdms-mobile.shenzhenair.com:8082";//生产环境
	var urlPrefix = "http://127.0.0.1:8000";//测试环境
	//var urlPrefix = "http://10.28.86.20:8080";//家丽本地
	//var urlPrefix = "http://10.28.87.14:8080";//哥本地
	
	//mas地址
//	var urlmas = "http://10.12.102.225:8088/zpzy";//测试
//	var urlmas = "https://apps.shenzhenair.com/masIn/zpzy";//生产
//	var urlmas = "http://10.28.193.210:8088/zpzy";//本地

	//埋点地址
	//var urlmai = "http://47.95.172.102:8106/sa?project=zsshtest"//测试
//	var urlmai = "http://47.95.172.102:8106/sa?project=zsshproduction"//生产
	var urlmai = ""
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
	
	var Login_cd = getQueryVariable("login_CD");
//	var Login_cd =  window.localStorage.getItem('login_CD');

	var Login_cd = 'A00001';//A16476 W00178 A21225 G04292 A11150
	var phone_num = '';
	var VerCode = '';//待发展验证码
	var registerCode = '';//待发展入会，注册是否成功












//var login_cd =  window.localStorage.getItem('login_cd');
//var phone_num = '';
// Login_cd = '';
 

