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
          <li v-for="item in state.data" class="listzi">
              <ul>
              	<li >
              		<div class="tupian">
              			<img v-show="item.cd_lvl == '01'" src="../assets/customer_card01.png" >
		                <img v-show="item.cd_lvl == '02'" src="../assets/customer_card02.png" >
		                <img v-show="item.cd_lvl == '03'" src="../assets/customer_card03.png" >
		                <img v-show="item.cd_lvl == '04'" src="../assets/customer_card04.png" >
		               
		              </div>
									<div class="spanstyle">
										 <span>{{ item.ch_nme ? item.ch_nme : '' }}</span>
              				<span>{{ item.gdr ? item.gdr : '' }}</span>
              				<img  v-show="item.servded_flg == '3'"  src="../assets/hand3.png" class="hand">
              				<img  v-show="item.servded_flg == '1'"  src="../assets/hand1.png" class="hand">
              				<img  v-show="item.servded_flg == '2'"  src="../assets/hand1.png" class="hand">
									</div>
									
		              <div class="buttonstyle">	
		              	
		              	<a class="fire" @click="refuse($event,item.merg_cust_id,item.ch_nme,item.cret_num,item.fly_dt,item.transp_flight_num,item.flt_airport,item.arr_airport,item.bat_num,item.bat_date,item.crate_date,'2',item.ffp_cd_num)">
                  	永久拒绝
               		 	</a>
                	 <a :class="item.color ? 'huicolor' : ''" @click="refuse($event,item.merg_cust_id,item.ch_nme,item.cret_num,item.fly_dt,item.transp_flight_num,item.flt_airport,item.arr_airport,item.bat_num,item.bat_date,item.crate_date,'1',item.ffp_cd_num)">拒绝</a>	
             		 		 <a @click="record(item.merg_cust_id)" >
                 		修复
                		</a>
             		 		
		              </div>
		              <div class="twoline">
										<!--<span>乘机证件号：</span>-->
              			<span>{{item.transp_flight_num}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              			<span>{{item.flt_airport}}{{item.arr_airport}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              			<span id="time">{{computeTime(item.schl_flt_dt)}}</span>
									</div>
              	</li>
							</ul>
                <!--&nbsp;&nbsp;<label>{{ item.ch_nme ? item.ch_nme : '' }}</label>&nbsp;&nbsp;
                {{ item.gdr ? item.gdr : '' }}
							
                &nbsp;&nbsp;<i v-show="item.remark" class="fa fa-tag" style="font-size: 16px;color: lightGray"></i>
                <a @click="record(item.merg_cust_id)" >
                 		修复
                </a>
                 <a :class="item.color ? 'huicolor' : ''" @click="refuse($event,item.merg_cust_id,item.ch_nme,item.cret_num,item.fly_dt,item.transp_flight_num,item.flt_airport,item.arr_airport,item.bat_num,item.bat_date,item.crate_date,'1')">拒绝</a>	
              </div>
              <div slot="title" style="font-size: 14px;" class="tupian2">
              	乘机证件号：{{item.cret_num}}
              	  <a  @click="refuse($event,item.merg_cust_id,item.ch_nme,item.cret_num,item.fly_dt,item.transp_flight_num,item.flt_airport,item.arr_airport,item.bat_num,item.bat_date,item.crate_date,'2')">
                  	永久拒绝
                </a>
              </div>-->
              <!--<div class="refuse">
                <a @click="record(item.merg_cust_id)" >
                 		修复
                </a>
                <a :class="item.color ? 'huicolor' : ''" @click="refuse($event,item.merg_cust_id,item.ch_nme,item.cret_num,item.fly_dt,item.transp_flight_num,item.flt_airport,item.arr_airport,item.bat_num,item.bat_date,item.crate_date,'1')">拒绝</a>	
                <!--<a  @click="refuse($event,item.merg_cust_id,item.ch_nme,item.cret_num,item.fly_dt,item.transp_flight_num,item.flt_airport,item.arr_airport,item.bat_num,item.bat_date,item.crate_date,'2')">
                  	永久拒绝
                </a>-->
               <!--</div>-->
            <!--<div class="refuse">
            	<span>{{item.id_cret}}</span>
            	<a  @click="refuse($event,item.merg_cust_id,item.ch_nme,item.cret_num,item.fly_dt,item.transp_flight_num,item.flt_airport,item.arr_airport,item.bat_num,item.bat_date,item.crate_date,'2')">
                  	永久拒绝
                </a>
            </div>-->
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
         <input type="text" id="card" placeholder="卡级别" readonly @click="showPopupPicker()" :value="Lvl ? Lvl.name : ''" :name = "Lvl ? Lvl.value : ''" />
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
  </div>
</template>

<script>
import PullTo from 'vue-pull-to'
import {mapState, mapActions, mapGetters} from 'vuex'
import MtPopupPicker from '@/components/MtPopupPicker'
import { MessageBox, Toast } from 'mint-ui'
import { Indicator } from 'mint-ui'
import sa from'sa-sdk-javascript';

const pickerData = [{name: '终身白金卡',value:"01"}, {name: '白金卡',value:"02"}, {name: '金卡',value:"03"}, {name: '银卡',value:"04"},{name: '集团要客',value:"1"}, {name: '卡级别',value:""}]
export default {
  name: 'customer',
  components: {
    PullTo,
    MtPopupPicker,
  },
  data() {
    return {
      iconLink: '',
      popupTop: false,
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
      outputFromDate:''
    }
  },
  methods: {
  	search() {
  		sa.track('importButtonClick', {
        AppOfButton: '尊鹏之音',
        AppId:'11646658',
        loginId:Login_cd,
        PageOfButton: '待修复客户列表',
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
    	this.refreshRepairPerson({
	      params: {"login_cd":Login_cd,"transp_flight_num":this.transp_flight_num,"flt_airport":this.flt_airport,"arr_airport":this.arr_airport,"fly_dt":(this.fromDate == null) ? '' : this.fromDate,"cd_lvl":(this.Lvl == null) ? '' : this.Lvl.value,"currentPage":this.currentPage}, 			
	      loaded: null
	    })
    }, 
    showPopupPicker() {
      this.$refs.popupPicker.open()
    },
    popupPickerConfirm() {
      this.Lvl = this.currentLvl
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
        PageOfButton: '待修复客户列表',
        firstModel: '',
        secondModel: '',
        buttonName:'客户搜索',
        buttonID:'',
	    });
      this.popupTop = true
    },
    record(merg_cust_id){
    	Indicator.open({
			  text: '加载中',
			  spinnerType: 'fading-circle'
			});
			sa.track('importButtonClick', {
        AppOfButton: '尊鹏之音',
        AppId:'11646658',
        loginId:Login_cd,
        PageOfButton: '待修复客户列表',
        firstModel: '',
        secondModel: '',
        buttonName:'客户修复',
        buttonID:'',
	    });
    	this.$router.push({
        path: '/search/repairPerson/repairDetail',
        query: {
          merg_cust_id: merg_cust_id,
        }
      })
    },
    showSearchPanel() {
      this.popupTop = true
    },
    refuse(evt,MERG_CUST_ID,CH_NME,CRET_NUM,FLY_DT,TRANSP_FLIGHT_NUM,FLT_AIRPORT,ARR_AIRPORT,BAT_NUM,BAT_DATE,CRATE_DATE,REJECT_FLG,FFP_CD_NUM){
    	 MessageBox({
        title: '提示',
        message: '确定拒绝吗？',
        showCancelButton: true,
        confirmButtonText: '是',
        cancelButtonText: '否',
        confirmButtonHighlight: false
      }).then((action) => {
        if(action == 'confirm') {
        	console.log(FLY_DT);
//       	var Data = new Date(FLY_DT).toLocaleString().substring(0,10).replace(/\//g,"-");
//       var bat_Data = new Date(BAT_DATE).toLocaleString().substring(0,10).replace(/\//g,"-");
         	var  Data = new Date(parseInt(("/Date("+FLY_DT+")/").substr(6, 13))).getFullYear()+"-"+(new Date(parseInt(("/Date("+FLY_DT+")/").substr(6, 13))).getMonth()+1)+"-"+new Date(parseInt(("/Date("+FLY_DT+")/").substr(6, 13))).getDate();
          var bat_Data = new Date(parseInt(("/Date("+BAT_DATE+")/").substr(6, 13))).getFullYear()+"-"+(new Date(parseInt(("/Date("+BAT_DATE+")/").substr(6, 13))).getMonth()+1)+"-"+new Date(parseInt(("/Date("+BAT_DATE+")/").substr(6, 13))).getDate();

         	var DATA = [];
		    	var arrData = {
		    		"MERG_CUST_ID":MERG_CUST_ID,
		    		"CH_NME":CH_NME,
		    		"CRET_NUM":CRET_NUM,
		    		"FLY_DT":Data,
		    		"TRANSP_FLIGHT_NUM":TRANSP_FLIGHT_NUM,
		    		"FLT_AIRPORT":FLT_AIRPORT,
		    		"ARR_AIRPORT":ARR_AIRPORT,
		    		"BAT_NUM": BAT_NUM,
		    		"BAT_DATE":bat_Data,
		    		"CRATE_DATE":CRATE_DATE,
		    		"REJECT_FLG":REJECT_FLG,
		    		"FFP_CD_NUM":FFP_CD_NUM
		    	};
		    	if(REJECT_FLG=='1'){
		    		sa.track('importButtonClick', {
			        AppOfButton: '尊鹏之音',
			        AppId:'11646658',
			        loginId:Login_cd,
			        PageOfButton: '待修复客户列表',
			        firstModel: '',
			        secondModel: '',
			        buttonName:'客户拒绝',
			        buttonID:'',
				    });
		    	}else{
						sa.track('importButtonClick', {
			        AppOfButton: '尊鹏之音',
			        AppId:'11646658',
			        loginId:Login_cd,
			        PageOfButton: '待修复客户列表',
			        firstModel: '',
			        secondModel: '',
			        buttonName:'永久拒绝',
			        buttonID:'',
				    });
		    	}
		    	DATA.push(arrData);
		    	this.crdetsSave({
		      	params: {
		        	"login_cd": Login_cd,
		        	"data":JSON.stringify(DATA),
		        	"writeFlag": "reject"
		       },
		       events: evt.target
		     	})
        } 
      })
    },
    goBack() {
      this.$router.go(-1)
    },
    refresh(loaded) {
    	this.currentPage = 1
    	this.refreshRepairPerson({
	      params: {"login_cd":Login_cd,"transp_flight_num":this.transp_flight_num,"flt_airport":this.flt_airport,"arr_airport":this.arr_airport,"fly_dt":(this.fromDate == null) ? '' : this.fromDate,"cd_lvl":(this.Lvl == null) ? '' : this.Lvl.value,"currentPage":this.currentPage}, 			
	      loaded: loaded
	    })
    },
    loadMore(loaded) {
    	this.currentPage += 1
			this.loadMoreRepairPerson({
	     params: {"login_cd":Login_cd,"transp_flight_num":this.transp_flight_num,"flt_airport":this.flt_airport,"arr_airport":this.arr_airport,"fly_dt":(this.fromDate == null) ? '' : this.fromDate,"cd_lvl":(this.Lvl == null) ? '' : this.Lvl.value,"currentPage":this.currentPage}, 			
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
	    return y + '-' + m + '-' + d+'    '+ h +':'+minute+':'+second;  
    },
    ...mapActions([
      'refreshRepairPerson',
      'loadMoreRepairPerson',
      'crdetsSave'
    ])
  },
  computed: {
    ...mapState({
      state: function (state) {
        return {
          customer: state.customer.customer,
          data: state.customer.repairPerson
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
//beforeMount () {
//	var $r = this.$route.query;
//  this.refreshRepairPerson({
//    params: {"login_cd":Login_cd,"transp_flight_num":$r.transp_flight_num,"flt_airport":$r.flt_airport,"arr_airport":$r.arr_airport,"fly_dt":$r.fly_dt,"cd_lvl":$r.cd_lvl}, 			
//    loaded: null
//  })
//},
 beforeMount () {
    this.refreshRepairPerson({
      params: {"login_cd":Login_cd,"transp_flight_num":this.transp_flight_num,"flt_airport":this.flt_airport,"arr_airport":this.arr_airport,"fly_dt":(this.fromDate == null) ? '' : this.fromDate,"cd_lvl":(this.Lvl == null) ? '' : this.Lvl.value,"currentPage":this.currentPage}, 			
      loaded: null
    })
    sa.init({
			server_url: urlmai, 
		});
		sa.login(Login_cd);
		sa.quick('autoTrack');
  },
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
	    padding: 5px;
	    text-align: center;
	    background-color: #e60000;
	    color: #fff !important;
	    font-size: 12px;
	    line-height: 15px;
	    border-radius: 5px;
	    margin-left: 10px;
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
  .huicolor{
  	background-color: #ccc;
  	border-color: #ccc;
  }
  .tupian{
  	display: inline-block;
  	width:10%;
  	float: left;
  }
  .buttonstyle{
  	display: inline-block;
  	width:60%;
  	float: right;
  }
  .spanstyle{
  	display: inline-block;
  	width:30%;
  	float: left;
  	line-height: 25px;
    font-size: 14px;
  }
  .spanstyle span{
  	padding-right: 10px;
  }
  .twoline{
  	display: inline-block;
  	width:100%;
  	padding: 5px 0;
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
  	padding-left: 20%;
  	font-size: 13px;
  }
</style>
