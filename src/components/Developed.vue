<template>
  <div>
    <div class="nav-sub clearfix">
      {{ $route.name }}
      <a class="nav-sub-btn pull-left" @click="goBack">
        <i class="fa fa-chevron-left"></i>
      </a>
      <a class="nav-sub-btn pull-right">
       	<i class="fa fa-search" @click="showSearchPanel"></i>
      </a>
    </div>
    <div class="pull-to-wrap">
      <pull-to
        :top-load-method="refresh"
        :bottom-load-method="loadMore"
        @top-state-change="stateChange"
        @bottom-state-change="stateChange">
        <template slot="top-block" slot-scope="props">
          <div class="top-load-wrapper">
            <svg class="icon"
              :class="{
                'icon-arrow': props.state === 'trigger',
                'icon-loading': props.state === 'loading'
               }"
               aria-hidden="true">
              <use :xlink:href="iconLink"></use>
            </svg>
            {{ props.stateText }}
          </div>
        </template>
        <ul class="list">
          <li v-for="(item,index) in state.data" class="listzi">
              <ul>
              	<li>
									<div class="spanstyle">
										<span>{{ item.ch_nm ? item.ch_nm : '' }}</span>
										<span v-show="item.red_cust == '03'">红</span>
										<span v-show="item.two_cabins_cust == '02'">两</span>
										<span v-show="item.big_cust == '01'">企</span>
										<!--<span v-show="item.high_cust == '01'">高</span>-->
									</div>
									
		              <div class="buttonstyle">	
		              	
		              	<a  :class="(item.served_flg == '2')? 'huicolor' : ''" @click="Refuse('',$event,item.merg_cust_id,item.ch_nm,item.cret_num,item.fly_dt,item.schl_flt_dt,item.transp_flight_num,item.flt_airport,item.arr_airport,'2',item.merg_type)">
                  	永久拒绝
               		 </a>
               		 	 <a :class="(item.served_flg == '1') ? 'huicolor' : ''" @click="Refuse('',$event,item.merg_cust_id,item.ch_nm,item.cret_num,item.fly_dt,item.schl_flt_dt,item.transp_flight_num,item.flt_airport,item.arr_airport,'1',item.merg_type)">拒绝</a>	
             		 		 <a  @click="popup(index)">
                  	已是会员
               		 	</a>
             		 		 <a @click="admission(index)" >
                 		入会
                		</a>
		              </div>
		              <div class="twoline">
										<!--<span>乘机证件号：</span>-->
              			<span>ZH{{item.transp_flight_num}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              			<span>{{item.flt_airport}}{{item.arr_airport}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              			<span id="time">{{computeTime(item.schl_flt_dt)}}</span>
									</div>
              	</li>
							</ul>
          </li>
        </ul>
         <template slot="bottom-block" slot-scope="props">
          <div class="bottom-load-wrapper">
            <svg class="icon"
              :class="{
                'icon-arrow': props.state === 'trigger',
                'icon-loading': props.state === 'loading'
              }"
              aria-hidden="true">
              <use :xlink:href="iconLink"></use>
            </svg>
            {{ props.stateText }}
          </div>
        </template>
      </pull-to>
    </div>
    <router-view class="router-view-search-customer" />
    <mt-popup
      v-model="popupTop"
      popup-transition="popup-fade"
      position="top">
      <div class="wrap">
      	<input type="text" placeholder="航班号" v-model="transp_flight_num" />
        <input type="text" placeholder="出发地" v-model="flt_airport"/>
        <input type="text" placeholder="到达地" v-model="arr_airport"/>
        <input type="text" placeholder="飞行日期" readonly @click="showFromDatePicker" :value="fromDate"  />
         <input type="text" id="card" placeholder="客户类型" readonly @click="showPopupPicker()" :value="Lvl ? Lvl.name : ''" :name = "Lvl ? Lvl.value : ''" />
      </div>
      <div class="wrap">
        <mt-button type="primary" @click="search">查询</mt-button>
      </div>
    </mt-popup>
    <mt-datetime-picker
      ref="fromDatePicker"
      type="date"
      v-model="currentFromDate"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      :endDate= "DATE"
      :startDate = "startDATE"
      @confirm="fromDatePickerConfirm">
    </mt-datetime-picker>
     <mt-popup-picker
      ref="popupPicker"
      :dataSource="pickerData"
      @confirm="popupPickerConfirm"
      v-model="currentLvl"/>
      <mt-popup-picker
      ref="TpopupPicker"
      :dataSource="TpickerData"
      @confirm="TpopupPickerConfirm"
      v-model="TcurrentLvl"/>
       <mt-popup v-model="popupVisible1" popup-transition="popup-fade" class="mint-popup-1" >
      <p class="pp">
      	<div class="named">
      		 <span>{{state.data[index] ? state.data[index].ch_nm : '' }}</span>
      	</div>
      	<div class="kaType">
      		<label>注册证件号:</label><input type="text" placeholder="请输入证件号/会员号" v-model="crets" />
      		<span  class="dingwei" @click="empty(0)" v-show="crets !== ''"><i class="mintui mintui-field-error hui" ></i></span>
	      	<!--<input type="text"  placeholder="关联类型" readonly @click="TshowPopupPicker()" :value="TLvl ? TLvl.name : ''" :name = "TLvl ? TLvl.value : ''" />
	      	<i class="mintui mint-cell-allow-right jiantou" id="colorf"></i>-->
	      </div>
	      <div class="kaNum">
      		<label>会员卡号:</label><input type="text" placeholder="请输入证件号/会员号" v-model="card" />
      		<span  class="dingweis" @click="empty(1)" v-show="card !== ''"><i class="mintui mintui-field-error hui" ></i></span>
      	</div>
      	<div class="judgment">
      		<div class="cancel" @click="cancel">取消</div>
      		<div class="determine" @click="Refuse('popup','',state.data[index].merg_cust_id,state.data[index].ch_nm,state.data[index].cret_num,state.data[index].fly_dt,state.data[index].schl_flt_dt,state.data[index].transp_flight_num,state.data[index].flt_airport,state.data[index].arr_airport,'3',state.data[index].merg_type)">确定</div>
      	</div>
      </p>
    </mt-popup>
  </div>
</template>

<script>
import PullTo from 'vue-pull-to'
import {mapState, mapActions, mapGetters} from 'vuex'
import { Popup } from 'mint-ui'
import MtPopupPicker from '@/components/MtPopupPicker'
import { MessageBox, Toast } from 'mint-ui'
import { Indicator } from 'mint-ui'
import sa from'sa-sdk-javascript';

const TpickerData = [{name: '证件号',value:"01"}, {name: '会员号',value:"02"}]
const pickerData = [{name: '企业客户',value:"01"}, {name: '两舱客户',value:"02"}, {name: '红名单',value:"03"}]
export default {
  name: 'customer',
  components: {
    PullTo,
    Popup,
    MtPopupPicker,
    sa,
  },
  data() {
    return {
      iconLink: '',
      popupTop: false,
      TLvl: null,
      TpickerData: TpickerData,
      TcurrentLvl: TpickerData[0],
      Lvl: null,
      type: null,
      fromDate : null,
      pickerData: pickerData,
      currentLvl: pickerData[0],
      currentFromDate: null,
      iconLink: '',
      transp_flight_num:'',
      flt_airport:'',
      arr_airport:'',
      fly_dt:'',
      currentPage:1,
      outputFromDate:'',
      popupVisible1:false,
      crets:'',
      card:'',
      index:'',
    }
  },
  methods: {
	popup(index) {
		sa.track('importButtonClick', {
        AppOfButton: '尊鹏之音',
        AppId:'11646658',
        loginId:Login_cd,
        PageOfButton: '待发展客户列表',
        firstModel: '',
        secondModel: '',
        buttonName:'已是会员',
        buttonID:'',
	    });
		this.popupVisible1= true
		this.TLvl = ''
		this.crets = ''
		this.card = ''
		this.index = index
	},
  	empty(flag) {
  		if(flag == 0){
  			this.crets = ''
  		}else{
  			this.card = ''
  		}
  	},
  	cancel() {
  		this.popupVisible1= false
  	},
  	determine() {
  		this.popupVisible1= false
  		this.isMember({
	      params: {"login_cd":Login_cd,"transp_flight_num":this.transp_flight_num,"flt_airport":this.flt_airport,"arr_airport":this.arr_airport,"fly_dt":(this.fromDate == null) ? '' : this.fromDate,"cust_type":(this.Lvl == null) ? '' : this.Lvl.value,"currentPage":this.currentPage}, 			
	      loaded: null
	    })
  	},
  	search() {
  		sa.track('importButtonClick', {
        AppOfButton: '尊鹏之音',
        AppId:'11646658',
        loginId:Login_cd,
        PageOfButton: '待发展客户列表',
        firstModel: '客户搜索',
        secondModel: '',
        buttonName:'客户查询',
        buttonID:'',
	    });
    	Indicator.open({
			  text: '加载中',
			  spinnerType: 'fading-circle'
			});
			this.currentPage = 1
      	this.popupTop = false
    	this.refreshDeveloped({
	      params: {"login_cd":Login_cd,"transp_flight_num":this.transp_flight_num,"flt_airport":this.flt_airport,"arr_airport":this.arr_airport,"fly_dt":(this.fromDate == null) ? '' : this.fromDate,"cust_type":(this.Lvl == null) ? '' : this.Lvl.value,"currentPage":this.currentPage}, 			
	      loaded: null
	    })
    }, 
    TshowPopupPicker() {
      this.$refs.TpopupPicker.open()
    },
    TpopupPickerConfirm() {
      this.TLvl = this.TcurrentLvl
    },
    popupPickerConfirm() {
      this.Lvl = this.currentLvl
    },
    showPopupPicker() {
      this.$refs.popupPicker.open()
    },
    showFromDatePicker() {
      this.$refs.fromDatePicker.open()
    },
    fromDatePickerConfirm(value) {
     
      if(this.currentFromDate){
      	 this.fromDate = this.currentFromDate;
      }else{
      	var date =new Date();
			  this.fromDate  = new Date(date.getTime() - 1 * 24 * 60 * 60 * 1000);
      }
//	    this.fromDate = '2017-12-20'
      this.fromDate = this.fromDate.getFullYear() + '-' + (this.fromDate.getMonth() + 1) + '-' + this.fromDate.getDate();
			},
    showSearchPanel() {
    	sa.track('importButtonClick', {
        AppOfButton: '尊鹏之音',
        AppId:'11646658',
        loginId:Login_cd,
        PageOfButton: '待发展客户列表',
        firstModel: '',
        secondModel: '',
        buttonName:'客户搜索',
        buttonID:'',
	    });
      this.popupTop = true
    },
    admission(index){
//  	Indicator.open({
//			  text: '加载中',
//			  spinnerType: 'fading-circle'
//			});
			sa.track('importButtonClick', {
        AppOfButton: '尊鹏之音',
        AppId:'11646658',
        loginId:Login_cd,
        PageOfButton: '待发展客户列表',
        firstModel: '',
        secondModel: '',
        buttonName:'入会',
        buttonID:'',
	    });
    	this.$router.push({
        path: '/search/developed/applyMember',
        query: {
          index: index,
        }
      })
    },
    showSearchPanel() {
      this.popupTop = true
    },
    Refuse(FLAG,evt,MERG_CUST_ID,CH_NME,CRET_NUM,FLY_DT,SCHL_FLT_DT,TRANSP_FLIGHT_NUM,FLT_AIRPORT,ARR_AIRPORT,REJECT_FLG,MERGE_TYPE){
			if(REJECT_FLG=='1'){
		    		sa.track('importButtonClick', {
			        AppOfButton: '尊鹏之音',
			        AppId:'11646658',
			        loginId:Login_cd,
			        PageOfButton: '待发展客户列表',
			        firstModel: '',
			        secondModel: '',
			        buttonName:'拒绝',
			        buttonID:'',
				    });
		    	}else{
		    		sa.track('importButtonClick', {
			        AppOfButton: '尊鹏之音',
			        AppId:'11646658',
			        loginId:Login_cd,
			        PageOfButton: '待发展客户列表',
			        firstModel: '',
			        secondModel: '',
			        buttonName:'永久拒绝',
			        buttonID:'',
				    });
		    	}
			var  Data = new Date(parseInt(("/Date("+FLY_DT+")/").substr(6, 13))).getFullYear()+"-"+(new Date(parseInt(("/Date("+FLY_DT+")/").substr(6, 13))).getMonth()+1)+"-"+new Date(parseInt(("/Date("+FLY_DT+")/").substr(6, 13))).getDate();
      var schl_fly_dt = this.computeTime(SCHL_FLT_DT);
     	var DATA = [];
				var arrData = {
	    		"MERG_CUST_ID":MERG_CUST_ID,
	    		"CH_NME":CH_NME,
	    		"CRET_NUM":CRET_NUM,
	    		"FLY_DT":Data,
	    		"SCHL_FLT_DT":schl_fly_dt,
	    		"TRANSP_FLIGHT_NUM":TRANSP_FLIGHT_NUM,
	    		"FLT_AIRPORT":FLT_AIRPORT,
	    		"ARR_AIRPORT":ARR_AIRPORT,
	    		"FFP_CD_NUM":'',
	    		"REG_CRET_NUM":'',
	    		"REJECT_FLG":REJECT_FLG,
	    		"MERGE_TYPE":MERGE_TYPE,
	    	};
			if(FLAG == 'popup'){
				arrData.FFP_CD_NUM = this.card; 
			  arrData.REG_CRET_NUM= this.crets;		
			  DATA.push(arrData);
	    	this.refuseFun({
	      	params: {
	        	"login_cd": Login_cd,
	        	"data":JSON.stringify(DATA),
	        	"writeFlag": "reject",
	       },
	       flag:'1',
	       events: evt.target,
	       refresh : this.refresh
	     	})
	    	this.popupVisible1= false
	    }else{
	    	MessageBox({
	        title: '提示',
	        message: '确定拒绝吗？',
	        showCancelButton: true,
	        confirmButtonText: '是',
	        cancelButtonText: '否',
	        confirmButtonHighlight: false
	      }).then((action) => {
	        if(action == 'confirm') {
				    	DATA.push(arrData);
				    	this.refuseFun({
				      	params: {
				        	"login_cd": Login_cd,
				        	"data":JSON.stringify(DATA),
				        	"writeFlag": "reject"
				       },
				       events: evt.target,
				       refresh : this.refresh
	     			})
	        } 
	      })
	    }
    },
    goBack() {
      this.$router.go(-1)
    },
    refresh(loaded) {
    	this.currentPage = 1
    	this.refreshDeveloped({
	      params: {"login_cd":Login_cd,"transp_flight_num":this.transp_flight_num,"flt_airport":this.flt_airport,"arr_airport":this.arr_airport,"fly_dt":(this.fromDate == null) ? '' : this.fromDate,"cust_type":(this.Lvl == null) ? '' : this.Lvl.value,"currentPage":this.currentPage}, 			
	      loaded: loaded
	    })
    },
    loadMore(loaded) {
    	this.currentPage += 1
			this.loadMoreDeveloped({
	     params: {"login_cd":Login_cd,"transp_flight_num":this.transp_flight_num,"flt_airport":this.flt_airport,"arr_airport":this.arr_airport,"fly_dt":(this.fromDate == null) ? '' : this.fromDate,"cust_type":(this.Lvl == null) ? '' : this.Lvl.value,"currentPage":this.currentPage}, 			
	      loaded: loaded
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
    computeTime(time){
    	var date = new Date(time);  
	    var y = date.getFullYear();    
	    var m = (date.getMonth() + 1)< 10 ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1);
	    var d = date.getDate()< 10 ? ('0' + date.getDate()) : date.getDate();      
	    var h = date.getHours()< 10 ? ('0' + date.getHours()) : date.getHours(); 
	    var minute = date.getMinutes()< 10 ? ('0' + date.getMinutes()) : date.getMinutes();  
	    var second = date.getSeconds()< 10 ? ('0' + date.getSeconds()) : date.getSeconds();    
	    return y + '-' + m + '-' + d+' '+ h +':'+minute+':'+second;  
    },
    ...mapActions([
      'refreshRepairPerson',
      'loadMoreRepairPerson',
      'crdetsSave',
      'refreshDeveloped',
      'loadMoreDeveloped',
      'isMember',
      'refuseFun'
    ])
  },
  computed: {
    ...mapState({
      state: function (state) {
        return {
          customer: state.customer.customer,
          data: state.customer.developed
        }
      }
    }),
    DATE(){
    	var date =new Date();
			var TwoDays  = new Date(date.getTime() + 1 * 24 * 60 * 60 * 1000);
			return TwoDays
    },
    startDATE(){
    	var date =new Date();
			var Days  = new Date(date.getTime() - 1 * 24 * 60 * 60 * 1000);
			return Days
    },
  },
 	beforeMount () {
 		 sa.init({
			server_url: urlmai,
		});
		console.log('mai',sa.init.server_url)
		sa.login(Login_cd);
		sa.quick('autoTrack');
		
    this.refreshDeveloped({
      params: {"login_cd":Login_cd,"transp_flight_num":this.transp_flight_num,"flt_airport":this.flt_airport,"arr_airport":this.arr_airport,"fly_dt":'2018-04-17',"cust_type":(this.Lvl == null) ? '' : this.Lvl.value,"currentPage":this.currentPage}, 			
      loaded: null
    })
   
  },
  watch: {
      '$route' (to,from) {
        if(to.path == '/search/developed'){
        	this.refreshDeveloped({
			      params: {"login_cd":Login_cd,"transp_flight_num":this.transp_flight_num,"flt_airport":this.flt_airport,"arr_airport":this.arr_airport,"fly_dt":(this.fromDate == null) ? '' : this.fromDate,"cust_type":(this.Lvl == null) ? '' : this.Lvl.value,"currentPage":this.currentPage}, 			
			      loaded: null
			    });
        }
      }
    }
}
</script>

<style scoped rel="stylesheet/less" lang="less">
  @import "../less/vue-pull-to.less";
  @import "../less/common.less";
  .list li {
    overflow: hidden;
    line-height: normal !important;
    height: auto;
    font-size: @font-size-small;
    padding: 5px;
    a{
    	display: inline-block;
	    width: auto;
	    float: right;
	    padding: 4px;
	    text-align: center;
		  background-color: #ffeded;
	    color: #d10e0e;
	    border: 1px solid #d10e0e;
	    font-size: 12px;
	    line-height: 15px;
	    border-radius: 5px;
	    margin-left: 6px;
    }
    a.huicolor{
	  	background: #ccc;
	    color: #fff !important;
	    border: 1px solid #999 !important;
	  }
    .fa-male, .fa-female {
      color: #666;
    }
    a.mint-cell.mint-cell-swipe {
      color: #666;
    }
    .mint-cell-value a {
      display: inline-block;
      width: 32px;
      height: 48px;
      line-height: 48px;
      text-align:center;
      color: lightGray;
    }
  }
  .list li:nth-child(even) {
    background-color: white;
  }
  .list li.warn{
  	text-align: center;
  	font-size: @font-size-normal;
  	font-weight: 500;
  	color: #333;
  }
  .router-view-search-customer {
    position: absolute;
    top: 0;
    bottom: 0;
    display:block;
    width: 100%;
    overflow: hidden;
    background-color: white;
  }
  .mint-cell-wrapper {
    font-size: @font-size-normal;
  }
  .tupian label{
  	line-height: 20px;
  }
  .tupian a{
  	line-height: 30px;
  }
  .tupian img{
  	width:25px;
  	padding-bottom: 1px;
  }
  .tupian img.behind{
  	width:15px;
  	padding-left: 5px;
  	padding-bottom: 4px;
  }
 	input:nth-child(3){
  	float:left;
  	width:45%;
  }
  .mint-popup-1{
    z-index: 2009;
   /* padding: 20px 40px 0px 40px;*/
    width: 85%;
    border-radius: 3px;
   
  
  }
  .mint-popup-top {
    top: 88px;
    width: 100%;
    padding: 5px;
    border-bottom: 1px solid @border-color-normal;
    .wrap:first-child {
      margin-left: 5px;
      margin-right: 30px;
      input[type=text] {
        width: 100%;
        margin-right: -10px;
      }
      input[type=text]:nth-child(2),input[type=text]:nth-child(4),input[type=text]:nth-child(6) {
        float: left;
        width: 45%;
      }
      input[type=text]:nth-child(3),input[type=text]:nth-child(5),input[type=text]:nth-child(7) {
        float: right;
        width: 45%;
        margin-right: -20px;
      }
    }
    .wrap:last-child {
      margin-left: 5px;
      margin-right: 8px;
    }
  }
  .refuse a{
  	display: inline-block;
    text-decoration: none;
    width: auto !important;
    height: 20px !important;
    line-height: 20px !important;
    padding: 0 5px;
    margin-left: 10px;
    background-color: #e60000;
    color: #fff !important;
    font-size: 12px;
    border-radius: 5px;
  }
  .tupian{
  	display: inline-block;
  	width:10%;
  	float: left;
  }
  .buttonstyle{
  	display: inline-block;
  	width:70%;
  	float: right;
  }
  .spanstyle{
  	display: inline-block;
  	width:30%;
  	float: left;
  	line-height: 25px;
  }
  .spanstyle span:nth-child(1){
  	padding-right: 5px;
  	border: 0px;
  	color: #000;
  	font-size: 14px;
  }
  .spanstyle span{
  	/*border: 2px solid red;*/
    padding: 0 0px;
    border-radius: 5px;
    color: red;
    font-size: 12px;
  }
  .twoline{
  	display: inline-block;
  	width:100%;
  	padding: 10px 0 0px 0;
  }
  .twoline span{
  	font-size: 13px;
  	    padding: 10px 0;
  }
  .listzi{
  	border-bottom: 1px solid #eee;
  }
  .fire{
  	margin-left: 25px !important;
  }
  .hand{
  	width:15%;
  }
  #time{
  	font-size: 13px;
  }
  .vip{
  	  display: block;
  	  padding: 0 0 8px 3px;
  	  color: #EE8262;;
  }
  .jiantou{
  	transform: rotate(90deg);
  	position: absolute;
  	top: 38px;
    left: 82%;;
  }
  .pp{
  	
  }
  .kaNum{
  	padding: 10px 20px 15px;
    border-bottom: 1px solid #ddd;
    padding: 10px 21px;
    position: relative;
  }
  .kaNum label{
  	 width: 30%;
    display: inline-block;
		color: #666;
		font-size: 14px;
  }
  .kaType{
  	padding: 0 21px;
  	position: relative;
  }
  .kaNum input{
  	width: 50%;
    padding-right: 30px;
    font-size: 14px;
  }
  .kaType label{
	  width: 30%;
    display: inline-block;
    color: #666;
    font-size: 14px;
  }
  .kaType input{
    width: 50%;
    padding-right: 30px;
    font-size: 14px;
  }
  .judgment{
  	line-height: 40px;
  	height: 40px;
  }
  .cancel{
  	display: inline-block;
    width: 50%;
    text-align: center;
    border-right: 1px solid #ddd;
  }
  .determine{
  	text-align: center;
    display: inline-table;
    width: 50%;
    float: right;
    position: absolute;
  }
  .named{
  	padding: 15px 20px 5px 21px;
    min-height: 36px;
    position: relative;
  }
  .hui{
	color: #ABABAB;
}
.dingwei{
	  position: absolute;
    top: 7px;
    right: 28px;
    width: 30px;
    height: 21px;
}
.dingweis{
	  position: absolute;
    top: 17px;
    right: 28px;
    width: 30px;
    height: 21px;
}
</style>
