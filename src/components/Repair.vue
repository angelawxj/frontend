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
        	<a>
	          	<li v-for="item in state.data" @click="detail(item.arr_airport,item.flt_airport,item.fly_dt,item.transp_flight_num)">
		            <div class="sublist"><span>航班号：</span>{{ item.transp_flight_num }}</div>
		            <div class="sublist"><span>日期：</span>{{new Date(parseInt(("/Date("+item.fly_dt+")/").substr(6, 13))).getFullYear()+"-"+(new Date(parseInt(("/Date("+item.fly_dt+")/").substr(6, 13))).getMonth()+1)+"-"+new Date(parseInt(("/Date("+item.fly_dt+")/").substr(6, 13))).getDate()}}</div>
		            <div class="sublist"><span>出发地：</span>{{item.flt_airport}}</div>
		            <div class="sublist"><span>到达地：</span>{{item.arr_airport}}</div>
		            <div class="last"><mt-badge type="error">{{item.repair_count}}</mt-badge><i class="fa fa-angle-right"></i></div>
	          	</li>
	        </a>
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
import TaskProgress from '@/components/TaskProgress'
import {mapState, mapActions, mapGetters} from 'vuex'
import MtPopupPicker from '@/components/MtPopupPicker'
import { MessageBox, Toast } from 'mint-ui'
import { Badge } from 'mint-ui';
import { Indicator } from 'mint-ui'
const pickerData = [{name: '终身白金卡',value:"01"}, {name: '白金卡',value:"02"}, {name: '金卡',value:"03"}, {name: '银卡',value:"04"},{name: '集团要客',value:"1"}, {name: '卡级别',value:""}]
export default {
  name: 'customer',
  components: {
    PullTo,
    TaskProgress,
    MtPopupPicker,
    Badge
  },
  data() {
    return {
      demo: '',
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
    	Indicator.open({
			  text: '加载中',
			  spinnerType: 'fading-circle'
			});
			this.currentPage = 1
      	this.popupTop = false
    	this.refreshRepair({
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
      this.popupTop = true
    },
    detail(arr_airport,flt_airport,fly_dt,transp_flight_num) {
    	Indicator.open({
			  text: '加载中',
			  spinnerType: 'fading-circle'
			});
//    	var flydt = new Date(parseInt(("/Date("+fly_dt+")/").substr(6, 13))).toLocaleDateString().replace(/年|月/g, "-").replace(/日/g, " ");
        var flydt = new Date(parseInt(("/Date("+fly_dt+")/").substr(6, 13))).getFullYear()+"-"+(new Date(parseInt(("/Date("+fly_dt+")/").substr(6, 13))).getMonth()+1)+"-"+new Date(parseInt(("/Date("+fly_dt+")/").substr(6, 13))).getDate();
//				console.log(flydt);
    	this.$router.push({
        path: '/search/repair/repairPerson',
        query: {
          arr_airport: arr_airport,
          flt_airport: flt_airport,
          fly_dt: flydt,
          transp_flight_num: transp_flight_num,
          cd_lvl:this.Lvl ? this.Lvl.value : ''
        }
      })
    },
     record(tel){
    	uexSMS.open(tel, '');
    },
    messageTo() {
      var vm = this;
      MessageBox({
        title: '提示',
        message: '是否使用模版？',
        showCancelButton: true,
        confirmButtonText: '是',
        cancelButtonText: '否',
        confirmButtonHighlight: false
      }).then((action) => {
        if(action == 'confirm') {
          vm.$router.push({
            path: '/search/message',
            query: {
              fromCustomer: true
            }
          })
        } else {
          vm.$router.push({
            path: '/search/message/send',
            query: {
              fromCustomer: true
            }
          })
        }
      })
    },
    phoneCall(tel) {
     uexCall.dial(tel);
    },
    goBack() {
      this.$router.go(-1)
    },
    refresh(loaded) {
    	this.currentPage = 1
    	this.refreshRepair({
	      params: {"login_cd":Login_cd,"transp_flight_num":this.transp_flight_num,"flt_airport":this.flt_airport,"arr_airport":this.arr_airport,"fly_dt":(this.fromDate == null) ? '' : this.fromDate,"cd_lvl":(this.Lvl == null) ? '' : this.Lvl.value,"currentPage":this.currentPage}, 			
	      loaded: loaded
	    })
	},
    loadMore(loaded) {
    	this.currentPage += 1
			this.loadMoreRepair({
	      params: {"login_cd":Login_cd,"transp_flight_num":'',"flt_airport":'',"arr_airport":'',"fly_dt":(this.fromDate == null) ? '' : this.fromDate,"currentPage":this.currentPage}, 			
	      loaded: loaded
	    });
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
      'loadMoreCustomer',
      'refreshCustomer',
      'loadMoreRepair',
      'refreshRepair'
    ])
  },
  computed: {
    ...mapState({
      state: function (state) {
        return {
          customer: state.customer.customer,
          data: state.customer.repair
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
    ...mapGetters([
      'customer'
    ])
  },
  beforeMount () {
    this.refreshRepair({
      params: {"login_cd":Login_cd,"transp_flight_num":this.transp_flight_num,"flt_airport":this.flt_airport,"arr_airport":this.arr_airport,"fly_dt":(this.fromDate == null) ? '' : this.fromDate,"cd_lvl":(this.Lvl == null) ? '' : this.Lvl.value,"currentPage":this.currentPage}, 			
      loaded: null
    })
  },
  beforeCreate (){
  	Indicator.open({
		  text: '加载中',
		  spinnerType: 'fading-circle'
		});
  }
}
</script>

<style scoped rel="stylesheet/less" lang="less">
  @import "../less/vue-pull-to.less";
  @import "../less/common.less";
  .list li {
    overflow: hidden;
    height: auto;
    line-height:15px;
    font-size: @font-size-small;
    padding: 10px;
    border-bottom: 1px solid #eee;
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
  .sublist li{
  	line-height: 26px;
    font-size: 14px;
    width: 40%;
    float: left;
    span{
    	color: #999;
    }
  }
  .sublist{
  	width:40%;
  	float: left;
  	line-height: 21px;
  	font-size: 14px;
  	span{
  		color: #999;
  	}
  }
  .last{
  	width:20%;
  	display: inline-block;
    text-align: right;
    span{
    	margin-right: 10px;
    }
  }
</style>
