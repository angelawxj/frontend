<template>
  <div>
    <div class="nav-sub clearfix">
      {{ $route.name }}
      <a class="nav-sub-btn pull-left" @click="goBack">
        <i class="fa fa-chevron-left"></i>
      </a>
      <a class="nav-sub-btn pull-right" >
       <!--<i  class="fa fa-save"></i>-->
      </a>
    </div>
    <div class="pull-to-wrap">
  		<!--<div class="headers">
	    	<a :class="segmentIndex == 0 ? 'active' : ''" @click="leftClick">
	    		<div>成人</div>	
	    	</a>
	    	<a  :class="segmentIndex == 1 ? 'active' : ''" @click="rightClick">
	    		<div>儿童</div>
	    	</a>
	    </div>-->
		  <pull-to>
	  		<div :class="segmentIndex == 1 ? 'adult' : ''" class="ziti" >
	  			<a class="list">
	  				<div class="cell" >
	  					<div class="cell-title"><span class="cell-text"><span class="star" style="color: #fff;">*</span>票号</span></div>
	  					<div class="cell-value">
	  						<!--<span>{{state.data}}</span>-->
	  						<input placeholder="请输入票号"  type="text" :class="piaohao !== '' ? 'huise' : ''" class="field-core" v-model="piaohao" maxlength="100" disabled="disabled">
	  						<!--<span  class="dingwei" @click="empty('piaohao')" v-show="piaohao !== ''"><i class="mintui mintui-field-error hui" ></i></span>-->
	  					</div>
	  				</div>
	  			</a>
	  			<a class="list">
	  				<div class="cell">
	  					<div class="cell-title"><span class="cell-text"><span class="star">*</span>中文姓</span></div>	
	  					<div class="cell-value">
	  						<input  placeholder="请输入中文姓" type="text"  :class="lastName !== '' ? 'huise' : ''" v-model="lastName"  class="field-core" maxlength="3">
	  						<span  class="dingwei" @click="empty('lastName')" v-show="lastName !== ''"><i class="mintui mintui-field-error hui" ></i></span>
	  					</div>
	  				</div>
	  			</a>
	  			<a class="list">
	  				<div class="cell">
	  					<div class="cell-title"><span class="cell-text"><span class="star">*</span>中文名</span></div>
	  					<div class="cell-value">
	  						<input placeholder="请输入中文名" :class="name !== '' ? 'huise' : ''" v-model="name" type="text" class="field-core" maxlength="10">
	  						<span  class="dingwei" @click="empty('name')" v-show="name !== ''"><i class="mintui mintui-field-error hui" ></i></span>
	  					</div>
	  				</div>
	  			</a>
	  			<a class="list">
	  				<div class="cell">
	  					<div class="cell-title"><span class="cell-text"><span class="star">*</span>英文姓</span></div>	
	  					<div class="cell-value uppercase" >
	  						<input  placeholder="请输入英文姓" type="text"  :class="englishlastName !== '' ? 'huise' : ''" v-model="englishlastName"  class="field-core" maxlength="30" >
	  						<span  class="dingwei" @click="empty('englishlastName')" v-show="englishlastName !== ''"><i class="mintui mintui-field-error hui" ></i></span>
	  					</div>
	  				</div>
	  			</a>
	  			<a class="list">
	  				<div class="cell">
	  					<div class="cell-title"><span class="cell-text"><span class="star">*</span>英文名</span></div>
	  					<div class="cell-value uppercase">
	  						<input placeholder="请输入英文名" :class="englishName !== '' ? 'huise' : ''" v-model="englishName" type="text" class="field-core" maxlength="30" >
	  						<span  class="dingwei" @click="empty('englishName')" v-show="englishName !== ''"><i class="mintui mintui-field-error hui" ></i></span>
	  					</div>
	  				</div>
	  			</a>
	  			<a class="list">
	  				<div class="cell">
	  					<div class="cell-title"><span class="cell-text"><span class="star">*</span>证件类型</span></div>
	  					<div class="cell-value">
	  						<input placeholder="请输入证件类型" type="text" class="field-core huise"  readonly @click="showPopupPickerType()" :value="type ? type.name : ''">
	  					</div>
	  				</div>
	  			</a>
	  			<a class="list">
	  				<div class="cell">
	  					<div class="cell-title"><span class="cell-text"> <span class="star">*</span>证件号码</span></div>
	  					<div class="cell-value">
	  						<input placeholder="请输入证件号码" :class="crdetNum !== '' ? 'huise' : ''" v-model="crdetNum" type="text" class="field-core" maxlength="50">
	  						<span  class="dingwei" @click="empty('crdetNum')" v-show="crdetNum !== ''"><i class="mintui mintui-field-error hui" ></i></span>
	  					</div>
	  				</div>
	  			</a>
	  			<!--<a class="list">
	  				<div class="cell">
	  					<div class="cell-title"><span class="cell-text"><span class="star">*</span>地址</span></div>
	  					<div class="cell-value">
	  						<input placeholder="请输入地址" :class="address !== '' ? 'huise' : ''" v-model="address" type="text" class="field-core" maxlength="100">
	  						<span  class="dingwei" @click="empty('address')" v-show="address !== ''"><i class="mintui mintui-field-error hui" ></i></span>
	  					</div>
	  				</div>
	  			</a>-->
	  			<a class="list">
	  				<div class="cell">
	  					<div class="cell-title"><span class="cell-text"><span class="star">*</span>经办人工号</span></div>
	  					<div class="cell-value">
	  						<input placeholder="请输入经办人工号" :class="jobNum !== '' ? 'huise' : ''" v-model="jobNum" type="text" class="field-core" maxlength="100">
	  						<span  class="dingwei" @click="empty('jobNum')" v-show="jobNum !== ''"><i class="mintui mintui-field-error hui" ></i></span>
	  					</div>
	  				</div>
	  			</a>
	  			<a class="list">
	  				<div class="cell">
	  					<div class="cell-title"><span class="cell-text"> <span class="star">*</span>密码</span></div>
	  					<div class="cell-value">
	  						<input placeholder="请输入密码(长度六位)" :class="pin !== '' ? 'huise' : ''" v-model="pin" :type="eyeFlag ? 'password' : 'text'" class="field-core" maxlength="6">
	  						<span  class="dingwei" @click="changeEye()"  v-show="pin !== ''">
	  							 <img v-show="eyeFlag" src="../assets/eye1-off.png">
	  							 <img v-show="!eyeFlag" src="../assets/eye1.png">
	  						</span>
	  					</div>
	  				</div>
	  			</a>
	  			<a class="list">
	  				<div class="cell">
	  					<div class="cell-title"><span class="cell-text"><span class="star">*</span>手机号码</span></div>
	  					<div class="cell-value">
	  						<input placeholder="请输入手机号码" :class="phoneNum !== '' ? 'huise' : ''" v-model="phoneNum" type="text" class="field-core" maxlength="11">
	  						<span  class="dingwei" @click="empty('phoneNum')" v-show="phoneNum !== ''"><i class="mintui mintui-field-error hui" ></i></span>
	  					</div>
	  				</div>
	  			</a>
	  			<a class="list">
	  				<div class="cell">
	  					<div class="cell-title"><span class="cell-text"><span class="star">*</span>验证码</span></div>
	  					<div class="cell-value">
	  						<input placeholder="请输入短信验证码" :class="verCode !== '' ? 'huise' : ''" type="text" class="field-core" v-model="verCode" maxlength="10">
	  						<span v-show="show" class="captcha"  @click="captcha">获取验证码</span>
								<span v-show="!show" class="captcha">{{count}} s</span>
	  					</div>
	  				</div>
	  			</a>
				</div> 
				<!--<div :class="segmentIndex == 0 ? 'adult' : ''" class="ziti" > 
				</div> -->
			</pull-to>
			<ul class="buttons">
      <li>
        <a  @click="submit">
          提交申请
        </a>
      </li>
    </ul>
 		</div>	
    <router-view class="router-view-personal-remark" />
    <mt-popup-picker
      ref="popupPickerType"
      :dataSource="pickerTypeData"
      @confirm="popupPickerTypeConfirm"
      v-model="currentType"/>
  </div>
</template>	
<script>
import PullTo from 'vue-pull-to'
import {mapState, mapActions} from 'vuex'
import { Field } from 'mint-ui';
import { Toast, MessageBox } from 'mint-ui'
import { Popup } from 'mint-ui'
import MtPopupPicker from '@/components/MtPopupPicker'
import { Navbar, TabItem } from 'mint-ui';
import sa from'sa-sdk-javascript';

const pickerTypeData = [{name: '身份证',value:"ID Card"},{name: '入台证',value:"Taiwan_Permit"},{name: '联合国护照',value:"U.N._Passport"},{name: '公务护照',value:"Official_Passport"},{name: '港澳通行证',value:"HK_Macao_Permit"},{name: '军官证',value:"Officer_Certification"},{name: '台胞证',value:"Taiwan_ID"},{name: '回乡证',value:"Reentry_Permit"},{name: '普通护照',value:"Ordinary_Passport"},{name: '其他',value:"Others"},{name: '台湾身份证',value:"TW_ID_Card"},{name: '香港身份证',value:"HK_ID_Card"},{name: '澳门身份证',value:"MACAO_ID_Card"},{name: '外国人永久居留身份证',value:"PR CARD"}];
export default {
  name: 'remark',
  components: {
    PullTo,
     MtPopupPicker,
     Navbar,
     TabItem,
     sa,
  },
  data() {
    return {
    	selected: '1',
      iconLink: '',
      popupTop: false,
      type: pickerTypeData[0],
      pickerTypeData: pickerTypeData,
      currentType:pickerTypeData[0],
      segmentIndex:0,
      adult:0,
      time: 60,
      show: true,
		  count: '',
		  timer: null,
		  lastName:'',
		  name:'',
		  crdetNum:'',
		  address:'',
		  jobNum:'',
		  pin:'123456',
		  phoneNum:'',
		  piaohao:'',
		  verCode:'',
		  eyeFlag:false,
		  englishlastName:'',
		  englishName:'',
    }
  },
  
  methods: {
  	goBack() {
  		if(registerCode !== '100'){
				MessageBox({
		        title: '提示',
		        message: '<span style="color:red">注册不成功，返回后名单中不再显示该旅客的推送数据，是否返回？</span>',
		        showCancelButton: true,
		        confirmButtonText: '是',
		        cancelButtonText: '否',
		        confirmButtonHighlight: false
		      }).then((action) => {
		        if(action == 'confirm') {
						 this.$router.go(-1) 	
		        } 
		      })
     }else{this.$router.go(-1)}
    },
    submit() {
    	sa.track('importButtonClick', {
        AppOfButton: '尊鹏之音',
        AppId:'11646658',
        loginId:Login_cd,
        PageOfButton: '入会申请',
        firstModel: '',
        secondModel: '',
        buttonName:'提交申请',
        buttonID:'',
	    });
    	if(this.lastName == '') {
        Toast({
          message: '请输入中文姓',
          position: 'bottom',
          duration: 2000
        })
        return
      }
      if(this.name == '') {
        Toast({
          message: '请输入中文名',
          position: 'bottom',
          duration: 2000
        })
        return;
      }
      if(this.englishlastName == '') {
        Toast({
          message: '请输入英文姓',
          position: 'bottom',
          duration: 2000
        })
        return
      }
      if(this.englishName == '') {
        Toast({
          message: '请输入英文名',
          position: 'bottom',
          duration: 2000
        })
        return;
      }
      if(this.crdetNum == '') {
        Toast({
          message: '请输入证件号码',
          position: 'bottom',
          duration: 2000
        })
        return;
      }
      if(this.jobNum == '') {
        Toast({
          message: '请输入经办人工号',
          position: 'bottom',
          duration: 2000
        })
        return;
      }
      if(this.pin.length !== 6 ) {
      	if(this.pin == ''){
	        Toast({
	          message: '请输入密码',
	          position: 'bottom',
	          duration: 2000
	        })
	        return;
        }else{
      		Toast({
	          message: '请输入6位数密码',
	          position: 'bottom',
	          duration: 2000
	        })
      		return;
      	}	
      }
      if(this.phoneNum == '') {
        Toast({
          message: '请输入手机号码',
          position: 'bottom',
          duration: 2000
        })
        return;
      } 
      if(this.verCode == VerCode && this.verCode !== '') {
      }else{
      	if(this.verCode == ''){
      		Toast({
	          message: '请输入验证码',
	          position: 'bottom',
	          duration: 2000
	        })
	        return;
      	}else{
      		Toast({
	          message: '请输入正确的验证码',
	          position: 'bottom',
	          duration: 2000
	        })
	        return;
      	}
      } 
      var DATA = [];
      var BAT_DATE = this.state.data.bat_date
      let addCm = null;
    	addCm = {}
   		addCm.TKT_NUM = this.piaohao
    	addCm.CH_LST_NM = this.lastName
    	addCm.CH_FST_NM = this.name
    	addCm.EN_LST_NM = this.englishlastName
    	addCm.EN_FST_NM = this.englishName
    	addCm.CRET_TYP = this.type.value
    	addCm.CRET_NUM = this.crdetNum
    	addCm.OPERATOR_NM =  this.jobNum
    	addCm.PIN = this.pin
      addCm.TEL_NUM = this.phoneNum
      addCm.VERIFIC_CODE= this.verCode
      addCm.MERGE_TYPE = this.state.data.merg_type
      addCm.BIZ_DATE = new Date(parseInt(("/Date("+BAT_DATE+")/").substr(6, 13))).getFullYear()+"-"+(new Date(parseInt(("/Date("+BAT_DATE+")/").substr(6, 13))).getMonth()+1)+"-"+new Date(parseInt(("/Date("+BAT_DATE+")/").substr(6, 13))).getDate();
      DATA.push(addCm);
    	this.submitFun({
    		params: {
        	"login_cd": Login_cd,
        	"data":JSON.stringify(DATA),
        },
        loaded: null,
        router : this.$router,
        refresh: this.refresh
        
      })
    },
    changeEye(){
    	if(this.eyeFlag){
    		this.eyeFlag = false
    	}else{
    		this.eyeFlag = true
    	}
    },
    empty(textName) {
 		 if(textName=='piaohao'){
    		this.piaohao = ''		
    	}else if(textName=='lastName'){
    		this.lastName = ''
    	}else if(textName=='name'){
    		this.name = ''
    	}else if(textName=='crdetNum'){
    		this.crdetNum = ''
    	}else if(textName=='address'){
    		this.address = ''
    	}else if(textName=='jobNum'){
    		this.jobNum = ''
    	}else if(textName=='pin'){
    		this.pin = ''
    	}else if(textName=='phoneNum'){
    		this.phoneNum = ''
    	}else if(textName=='englishlastName'){
    		this.englishlastName = ''
    	}else if(textName=='englishName'){
    		this.englishName = ''
    	}
  	},
    showPopupPickerType() {
      this.$refs.popupPickerType.open()
    },
    popupPickerTypeConfirm() {
      this.type = this.currentType
    },
		leftClick() {
      if(this.segmentIndex == 1) {
        this.segmentIndex = 0
      }
    },
    captcha() {//获取验证码
    	var regMobile = /^0?1[3|4|5|6|7|8][0-9]\d{8}$/;
    	var mflag = regMobile.test(this.phoneNum);
    	if(mflag){
	    	const TIME_COUNT = 60;
	     	if (!this.timer) {
	       this.count = TIME_COUNT;
	       this.show = false;
	       this.timer = setInterval(() => {
	       if (this.count > 0 && this.count <= TIME_COUNT) {
	         this.count--;
	        } else {
	         this.show = true;
	         clearInterval(this.timer);
	         this.timer = null;
	        }
	       }, 1000)
	      }
	     	this.verifyCode({
	    		params: {
	        	"login_cd": Login_cd,
	        	"tel":this.phoneNum,
	        },
	        loaded: null,
	         router : this.$router
	      })
	    }else{
	    	Toast({
	          message: '请输入正确的手机号码',
	          position: 'bottom',
	          duration: 2000
	        })
	    }
    },
    rightClick() {
      if(this.segmentIndex == 0) {
        this.segmentIndex = 1
      }
    },
    refresh(flag,loaded) {
			 var DATA = [];
      var BAT_DATE = this.state.data.bat_date
      let addCm = null;
    	addCm = {}
   		addCm.TKT_NUM = this.piaohao
    	addCm.CH_LST_NM = this.lastName
    	addCm.CH_FST_NM = this.name
    	addCm.EN_LST_NM = this.englishlastName
    	addCm.EN_FST_NM = this.englishName
    	addCm.CRET_TYP = this.type.value
    	addCm.CRET_NUM = this.crdetNum
    	addCm.OPERATOR_NM =  this.jobNum
    	addCm.PIN = this.pin
      addCm.TEL_NUM = this.phoneNum
      addCm.VERIFIC_CODE= this.verCode
      addCm.APP_FLAG = flag
      addCm.MERGE_TYPE = this.state.data.merg_type
      addCm.BIZ_DATE = new Date(parseInt(("/Date("+BAT_DATE+")/").substr(6, 13))).getFullYear()+"-"+(new Date(parseInt(("/Date("+BAT_DATE+")/").substr(6, 13))).getMonth()+1)+"-"+new Date(parseInt(("/Date("+BAT_DATE+")/").substr(6, 13))).getDate();
      DATA.push(addCm);
    	this.addAppFlag({
    		params: {
        	"login_cd": Login_cd,
        	"data":JSON.stringify(DATA),
        },
        loaded: null,
        router : this.$router 
      })
    },
    stateChange(state) {
      if (state === 'pull' || state === 'trigger') {
        this.iconLink = '#icon-arrow-bottom'
      } else if (state === 'loading') {
        this.iconLink = '#icon-loading'
      } else if (state === 'loaded-done') {
        this.iconLink = '#icon-finish'
      }
    },
    ...mapActions([
      'refreshRepairDetail',
      'setAdd',
      'joinMember',
      'submitFun',
      'verifyCode',
      'refreshDeveloped',
      'addAppFlag'
    ])
  },
  computed: {
     ...mapState({
      state: function (state) {
        return {
          customer: state.customer.customer,
          data: state.customer.developed[this.$route.query.index]
              
        }
      }
    })
  },
  captchaText: function () {
  	return '获取'
	 // return this.time > 0 ? this.time + 's 后重新获取' : '获取验证码';
	},
  beforeMount () {
    this.piaohao = this.state.data.tkt_num
    this.lastName = this.state.data.ch_lst_nm
    this.name = this.state.data.ch_fst_nm
    this.englishlastName = !this.state.data.en_lst_nm ? "1" : this.state.data.en_lst_nm
    this.englishName = !this.state.data.en_fst_nm ? "2" : this.state.data.en_fst_nm
    this.crdetNum = this.state.data.cret_num
   	this.address = ''
   	this.jobNum = Login_cd 
  	this.pwd = ''
   	this.phoneNum = ''
   	
    registerCode = "100"
    
    sa.init({
		  server_url: urlmai,  
		});
		sa.login(Login_cd);
		sa.quick('autoTrack');
  },
  watch: {
	  englishlastName:function(){
	    this.englishlastName =  this.englishlastName.replace(/[^a-zA-Z]/g,'');
		},
		englishName:function(){
	    this.englishName =  this.englishName.replace(/[^a-zA-Z]/g,'');
		},
		phoneNum:function(){
	    this.phoneNum =  this.phoneNum.replace(/\D/g,'');
		},
//		lastName:function(){
//	    this.lastName =  this.lastName.replace(/[^\u4e00-\u9fa5]/g,'');
//		},
//		name:function(){
//	    this.name =  this.name.replace(/[^\u4e00-\u9fa5]/g,'');
//		},
		
  }
}
</script>

<style scoped rel="stylesheet/less" lang="less">
  @import "../less/vue-pull-to.less";
  @import "../less/common.less";

.headers{
  display: block;
	position: fixed;
	z-index: 100;
	width: 100%;
	background: #fff;
	a{
		display: block;
		width:50%;
	  padding: 17px 0;
		font-size: 15px;
		text-align: center;
		line-height: 1;	
		margin-bottom: -3px;	
		float: left;
	  text-decoration: none; 	
	}
}
.list{
	background-color: #fff;
	box-sizing: border-box;
	color: inherit;
	display: block;
	overflow: hidden;
	position: relative;
	text-decoration: none;
	width:100%;
	.cell{
		font-size: 16px;
    line-height: 1;
    min-height: inherit;
    overflow: hidden;
    padding: 0px;
    line-height: 44px;
    border-bottom: 1px solid #d9d9d9;
  
	}
	.cell-title{
		width: 28%;
    display: inline-block;
    float: left;
    text-align: left;
	}
	.cell-text{
		font-size: 14px;
		padding-right: 20%;
	}
	.field-core{
		width: 100%;
		box-sizing: border-box;
		padding-right: 35px;
	}
	.cell-value{
		display: inline-block;
    width: 70%;
	}
	.huise{
		background: #fafafa;
	}
}
.active{
	border-bottom: 2px solid #e60000;
	color: #e60000;
}
.adult{
	display: none;
	font-size: 13px !important;
}
.ziti{
/*	margin-top:50px;*/
	margin-bottom: 44px;
	padding: 10px 15px;
}
.ziti .mint-cell .mint-cell-title .mint-cell-text{
	font-size: 12px !important;
}
.star{
	color: red;
	padding-right: 4px;
}
.buttons {
  position: absolute;
  bottom: 0;
  width: 100%;
  li {
    float:left;
    width: 100%;
    background: #CD2626;
    a {
      display: block;
      height: 44px;
      line-height: 44px;
      color: @font-color-white;
      text-align: center;
    }
  }
  li:first-child {

  }
  li:last-child {
    border-left: 1px solid white;
    margin-left: -1px;
  }
}
.captcha{
	  position: absolute;
    top: 6px;
    font-size: 12px;
    right: 7px;
    line-height: 33px;
    background: #EE7942;
    color: #fff;
    width: 20%;
    text-align: center;
}
.hui{
	color: #ABABAB;
}
.dingwei{
	position: absolute;
	top: 0px;
	right: 10px;
  width: 30px;
}
.dingwei img{
  width: 24px;
	position: absolute;
	top: 12px;
	right: 10px;
}
.mint-msgbox-message .hong{
	color:red
}
.uppercase input{
	text-transform: uppercase;
}
</style>
