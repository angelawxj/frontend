<template>
  <div>
    <div class="nav-sub clearfix">
      {{ $route.name }}
      <a class="nav-sub-btn pull-left" @click="goBack">
        <i class="fa fa-chevron-left"></i>
      </a>
      <a class="nav-sub-btn pull-right">
        <i v-show="state.id == null" class="fa fa-search" @click="showSearchPanel"></i>
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
        <!--<ul class="list">
          <li v-for="item in state.data" @click="detail(item.id)">
            <mt-cell-swipe>
              <div slot="title" style="font-size: 14px;">
                <i :class="['fa fa-credit-card-alt fa-lg', item.level]"></i>
                &nbsp;&nbsp;{{ item.name }}&nbsp;&nbsp;
                {{ item.gender }}
              </div>
              <div style="font-size: 14px;">
                {{ item.flightDate }}&nbsp;&nbsp;
                <i class="fa fa-angle-right"></i>&nbsp;
              </div>
            </mt-cell-swipe>
          </li>
        </ul>-->
                <ul class="list">
          <li v-for="item in state.data" @click="detail(item.merg_cust_id,item.cont_tel_num)">
            <!--<mt-cell-swipe
              :right="[
                {
                  content: '加入工作目标到底 ',
                  style: { background: '#55c1e9', color: '#fff' },
                  handler: ()=>addToTarget(item)
                }
              ]">-->
              <div slot="title" style="font-size: 14px;" class="tupian">
                <img v-show="item.cd_lvl == '01'" src="../assets/customer_card01.png" >
                <img v-show="item.cd_lvl == '02'" src="../assets/customer_card02.png" >
                <img v-show="item.cd_lvl == '03'" src="../assets/customer_card03.png" >
                <img v-show="item.cd_lvl == '04'" src="../assets/customer_card04.png" >
                &nbsp;&nbsp;<label>{{ item.ch_fst_nm }}</label>&nbsp;&nbsp;
                {{ item.gdr }}
                <img class="behind" v-show="item.oth_vip_typ == '1'" src="../assets/customer_card1.png" >
                <img class="behind" v-show="item.ifBirth == '是'" src="../assets/birth.png" >
                &nbsp;&nbsp;<i v-show="item.remark" class="fa fa-tag" style="font-size: 16px;color: lightGray"></i>
              </div>
              <div class="lianxi">
              	<span>ZH</span>
              		{{ item.transp_flight_num }}&nbsp;&nbsp;
                 	<i class="fa fa-angle-right"></i>&nbsp;
              </div>
              <div>
              		<div class="sublist"><span>出发地：</span>{{item.flt_airport}}</div>
              	<!--<div class="sublist"><span>航班号：</span>{{ item.transp_flight_num }}</div>-->
            	<div class="lianxi1">{{new Date(parseInt(("/Date("+item.fly_dt+")/").substr(6, 13))).toLocaleDateString()}}</div>
            
            	<!--<div class="sublist"><span>到达地：</span>{{item.arr_airport}}</div>-->
              </div>
           <!-- </mt-cell-swipe>-->
          </li>
          <!--<li class="warn" ref="finish">已经全部加载完毕</li>-->
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
    <router-view class="router-view-search-port" />
    <mt-popup
      v-model="popupTop"
      popup-transition="popup-fade"
      position="top">
      <div class="wrap clearfix">
        <input type="text" placeholder="航班号" v-model="fly_no" />
        <input type="text" placeholder="出发地" v-model="flt_airport"/>
        <input type="text" placeholder="到达地" v-model="arr_airport"/>
        <input type="text" placeholder="出发时间" readonly @click="showFromDatePicker" :value="outputFromDate" />
        <input type="text" placeholder="到达时间" readonly @click="showToDatePicker" :value="outputToDate" />
         <input type="text" id="" placeholder="客户等级" readonly @click="showPopupPicker()" :value="Lvl ? Lvl.name : ''" />
        <input type="text" id="" placeholder="客户类型" readonly @click="showPopupPickerType()" :value="type ? type.name : ''" />
      <!--	<i class="fa fa-angle-down fa-lg"></i>-->
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
      @confirm="fromDatePickerConfirm">
    </mt-datetime-picker>
    <mt-datetime-picker
      ref="toDatePicker"
      type="date"
      v-model="currentToDate"
      year-format="{value} 年"
      month-format="{value} 月"
      :endDate= "DATE"
      date-format="{value} 日"
      @confirm="toDatePickerConfirm">
    </mt-datetime-picker>
    <mt-popup-picker
      ref="popupPicker"
      :dataSource="pickerData"
      @confirm="popupPickerConfirm"
      v-model="currentLvl"/>
      <mt-popup-picker
      ref="popupPickerType"
      :dataSource="pickerTypeData"
      @confirm="popupPickerTypeConfirm"
      v-model="currentType"/>
  </div>
</template>

<script>
import PullTo from 'vue-pull-to'
import TaskProgress from '@/components/TaskProgress'
import {mapState, mapActions} from 'vuex'
import MtPopupPicker from '@/components/MtPopupPicker'
import { Toast } from 'mint-ui'
import { Indicator } from 'mint-ui'
import sa from'sa-sdk-javascript';

const pickerData = [{name: '终身白金卡',value:"01"}, {name: '白金卡',value:"02"}, {name: '金卡',value:"03"}, {name: '银卡',value:"04"}, {name: '客户类型',value:""}]
const pickerTypeData = [{name: '集团要客',value:"1"}, {name: '客户类型',value:""}]
export default {
  name: 'port',
      components: {
        PullTo,
        TaskProgress,
        MtPopupPicker
      },
  data() {
    return {
      popupTop: false,
      fromDate: null,
      currentFromDate: null,
      toDate: null,
      currentToDate: null,
      iconLink: '',
      currentPage: 1,
      fly_no: '',
      flt_airport: '',
      arr_airport: '',
      FromDate : '',
      ToDate: '',
      Lvl: null,
      type: null,
      pickerData: pickerData,
      pickerTypeData: pickerTypeData,
      currentType: pickerData[0],
      currentLvl: pickerTypeData[0],
    }
  },
  methods: {
    detail(id,tel) {
    	sa.track('importButtonClick', {
        AppOfButton: '尊鹏之音',
        AppId:'11646658',
        loginId:Login_cd,
        PageOfButton: '三日内进出港',
        firstModel: '',
        secondModel: '',
        buttonName:'查看客户',
        buttonID:'',
	    });
      console.log(id)
    	this.$router.push({
        path: '/search/port/detail',
        query: {
          id: id,
          tel:tel
        }
     })
    },
    goBack() {
      this.$router.go(-1)
    },
    search() {
    	sa.track('importButtonClick', {
        AppOfButton: '尊鹏之音',
        AppId:'11646658',
        loginId:Login_cd,
        PageOfButton: '三日内进出港',
        firstModel: '三日内进出港搜索',
        secondModel: '',
        buttonName:'查询客户',
        buttonID:'',
	    });
    	Indicator.open({
			  text: '加载中',
			  spinnerType: 'fading-circle'
			});
			this.currentPage = 1
      this.popupTop = false
      let searchCm = null;
      var a = this.currentFromDate
    	searchCm = {}
    	searchCm.login_cd = Login_cd
    	searchCm.fly_no = this.fly_no
    	searchCm.flt_airport = this.flt_airport
    	searchCm.arr_airport = this.arr_airport
    	searchCm.beginDate = this.FromDate
    	searchCm.endDate = this.ToDate
    	searchCm.cdLvl =(this.Lvl == null) ? '' : this.Lvl.value
    	searchCm.cdType = (this.type == null) ? '' : this.type.value
    	searchCm.currentPage = this.currentPage
    	this.refreshPort({
      params: searchCm,
      loaded: null
    })
    },
    showSearchPanel() {
      this.popupTop = true
      sa.track('importButtonClick', {
        AppOfButton: '尊鹏之音',
        AppId:'11646658',
        loginId:Login_cd,
        PageOfButton: '三日内进出港',
        firstModel: '',
        secondModel: '',
        buttonName:'搜索客户',
        buttonID:'',
	    });
    },
    showFromDatePicker() {
      this.$refs.fromDatePicker.open()
    },
    fromDatePickerConfirm(value) {
      this.fromDate = this.currentFromDate;
      if(this.fromDate){
      	this.FromDate = (this.fromDate.getFullYear() + '-' + (this.fromDate.getMonth() + 1) + '-' + this.fromDate.getDate())
   		}
      },
    showToDatePicker() {
      this.$refs.toDatePicker.open()
    },
    toDatePickerConfirm() {
      this.toDate = this.currentToDate;
    	this.ToDate = (this.toDate.getFullYear() + '-' + (this.toDate.getMonth() + 1) + '-' + this.toDate.getDate())
    },
    refresh(loaded) {
    	this.currentPage = 1
      this.refreshPort({
        params: {"login_cd":Login_cd,"fly_no":this.fly_no,"flt_airport":this.flt_airport,"arr_airport":this.arr_airport, "beginDate":this.FromDate,"endDate":this.ToDate,"cdLvl":(this.Lvl == null) ? '' : this.Lvl.value,"cdType":(this.type == null) ? '' : this.type.value,"currentPage":1},
        loaded: loaded
      })
    },
    loadMore(loaded) {
    	this.currentPage += 1
      this.loadMorePort({
        params: {"login_cd":Login_cd,"fly_no":this.fly_no,"flt_airport":this.flt_airport,"arr_airport":this.arr_airport, "beginDate":this.FromDate,"endDate":this.ToDate,"cdLvl":(this.Lvl == null) ? '' : this.Lvl.value,"cdType":(this.type == null) ? '' : this.type.value,"currentPage":this.currentPage},
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
     showPopupPicker() {
      this.$refs.popupPicker.open()
    },
    showPopupPickerType() {
      this.$refs.popupPickerType.open()
    },
    popupPickerConfirm() {
      this.Lvl = this.currentLvl
    },
    popupPickerTypeConfirm() {
      this.type = this.currentType
    },
    ...mapActions([
      'loadMorePort',
      'refreshPort',
      'setPortID'
    ])
  },
  computed: {
    ...mapState({
      state: function (state) {
        return {
          data: state.port.data
        }
      }
    }),
    DATE(){
    	var date =new Date();
			var threeDays  = new Date(date.getTime() + 2 * 24 * 60 * 60 * 1000);
			return threeDays
    },
    outputFromDate() {
      if(this.fromDate == null) {
        return '';
      }
      return this.fromDate.getFullYear() + '-' + (this.fromDate.getMonth() + 1) + '-' + this.fromDate.getDate()
    },
    outputToDate() {
      if(this.toDate == null) {
        return '';
      }
      return this.toDate.getFullYear() + '-' + (this.toDate.getMonth() + 1) + '-' + this.toDate.getDate()
    },
  },
  beforeMount () {
  	sa.init({
			server_url: urlmai, 
		});
		sa.login(Login_cd);
		sa.quick('autoTrack');
		
    this.refreshPort({
      params: {"login_cd":Login_cd,"fly_no":"","flt_airport":"","arr_airport":"", "beginDate":"","endDate":"","cdLvl":"","cdType":"","currentPage":1},
      loaded: null
    })
  }
}
</script>

<style scoped rel="stylesheet/less" lang="less">
  @import "../less/vue-pull-to.less";
  @import "../less/common.less";
  .list li {
    overflow: hidden;
    height: auto;
    padding: 0 10px;
    border-bottom: 1px solid #eee;
    a.mint-cell.mint-cell-swipe {
      color: @font-color-normal;
    }
    .mint-cell-value {
      color: @font-color-gray;
    }
  }
  .list li:nth-child(even) {
    background-color: white;
  }
  .router-view-search-port {
    position: absolute;
    top: 0;
    bottom: 0;
    display:block;
    width: 100%;
    overflow: hidden;
    background-color: white;
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
  .tupian{
  	display: inline-block;
  	position: relative;
  	color: #666;
  }
  .tupian label{
  	padding-left: 32px;
  }
 .tupian img{
  	width:25px;
  	padding-bottom: 1px;
  	position: absolute;
  	top:13px
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
  .lianxi1{
  	display: inline-block;
  	float: right;
  	color: #999;
  	line-height: 20px;
  	padding-right: 20px;
  	font-size: 14px;
  }
   .lianxi{
  	display: inline-block;
  	float: right;
  	color: #999;
  	font-size: 14px;
  }
  .sublist{
  	width:40%;
  	float: left;
  	line-height: 20px;
  	font-size: 14px;
  	padding-bottom: 10px;
  	span{
  		color: #999;
  	}
  }
</style>
