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
        	{{state}}
          <li v-for="item in state.data" @click="detail(item.merg_cust_id)">
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
                &nbsp;&nbsp;<label>{{ item.ch_nme }}</label>&nbsp;&nbsp;
             {{ item.gdr }}
                <img class="behind" v-show="item.oth_vip_typ == '1'" src="../assets/customer_card1.png" >
                <img class="behind" v-show="item.ifBirth == '是'" src="../assets/birth.png" >
                &nbsp;&nbsp;<i v-show="item.remark" class="fa fa-tag" style="font-size: 16px;color: lightGray"></i>
              </div>
              <div class="lianxi">
                <a @click.prevent.stop="messageTo(item.cont_tel_num)" >
                  <i class="fa fa-comment fa-lg"></i>
                </a>
                <a @click.prevent.stop="phoneCall(item.cont_tel_num)">
                  <i class="fa fa-phone fa-lg"></i>
                </a>
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
    <router-view class="router-view-search-customer" />
    <mt-popup
      v-model="popupTop"
      popup-transition="popup-fade"
      position="top">
      <div class="wrap">
        <input type="text" placeholder="姓名" v-model="userName"/>
        <input type="text" placeholder="会员号" v-model="cdNo"/>
        <input type="text" id="" placeholder="客户等级" readonly @click="showPopupPicker()" :value="Lvl ? Lvl.name : ''" />
        <input type="text" id="" placeholder="客户类型" readonly @click="showPopupPickerType()" :value="type ? type.name : ''" />
      </div>
      <div class="wrap">
        <mt-button type="primary" @click="search">查询</mt-button>
      </div>
    </mt-popup>
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
import {mapState, mapActions, mapGetters} from 'vuex'
import MtPopupPicker from '@/components/MtPopupPicker'
import { MessageBox, Toast } from 'mint-ui'
import { Indicator } from 'mint-ui'
import sa from'sa-sdk-javascript';

const pickerData = [{name: '终身白金卡',value:"01"}, {name: '白金卡',value:"02"}, {name: '金卡',value:"03"}, {name: '银卡',value:"04"}, {name: '客户类型',value:""}]
const pickerTypeData = [{name: '集团要客',value:"1"}, {name: '客户等级',value:""}]
export default {
  name: 'customer',
  components: {
    PullTo,
    TaskProgress,
    MtPopupPicker
  },
  data() {
    return {
      demo: '',
      popupTop: false,
      Lvl: null,
      type: null,
      pickerData: pickerData,
      pickerTypeData: pickerTypeData,
      currentType: pickerData[0],
      currentLvl: pickerTypeData[0],
      iconLink: '',
      cdNo:'',
      userName:'',
      currentPage:1
      
    }
  },
  methods: {
    addToTarget(item) {
      var task = {}
      task.name = item.name
      task.age = item.age
      task.gender = item.gender
      task.level = item.level
      task.progress = 0
      task.current = true
      this.saveTask(task)
      Toast({
        message: '加入成功',
        position: 'bottom',
        duration: 2000
      })
    },
    search() {
    	sa.track('importButtonClick', {
        AppOfButton: '尊鹏之音',
        AppId:'11646658',
        loginId:Login_cd,
        PageOfButton: '客户信息',
        firstModel: '客户信息搜索',
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
    	searchCm = {}
    	searchCm.userId = Login_cd
    	searchCm.userName = this.userName
    	searchCm.cdNo = this.cdNo
    	searchCm.cdLvl =(this.Lvl == null) ? '' : this.Lvl.value
    	searchCm.cdType = (this.type == null) ? '' : this.type.value
    	searchCm.currentPage = this.currentPage
    	this.refreshCustomer({
        params: searchCm,
        loaded: null,
      })
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
    showSearchPanel() {
      this.popupTop = true
      sa.track('importButtonClick', {
        AppOfButton: '尊鹏之音',
        AppId:'11646658',
        loginId:Login_cd,
        PageOfButton: '客户信息',
        firstModel: '',
        secondModel: '',
        buttonName:'搜索客户',
        buttonID:'',
	    });
    },
    detail(id) {
    	this.$router.push({
        path: '/search/customer/detail',
        query: {
          id: id
        }
     })
    },
     record(tel){
    	uexSMS.open(tel, '');
    },
    messageTo(tel) {
     Toast({
        message: '功能维护中',
        position: 'bottom',
        duration: 2000
      })
//  uexSMS.open(tel, '');
//    var vm = this;
//    MessageBox({
//      title: '提示',
//      message: '是否使用模版？',
//      showCancelButton: true,
//      confirmButtonText: '是',
//      cancelButtonText: '否',
//      confirmButtonHighlight: false
//    }).then((action) => {
//      if(action == 'confirm') {
//        vm.$router.push({
//          path: '/search/message',
//          query: {
//            fromCustomer: true,
//            tel:tel
//          }
//        })
//      } else {
//        vm.$router.push({
//          path: '/search/message/send',
//          query: {
//            fromCustomer: true,
//            tel:tel
//          }
//        })
//      }
//    })
    },
    phoneCall(tel) {
//  uexCall.dial(tel);
	var phone = tel;
//  this.getTel({params:''});
	var url = 'http://14.29.4.235/command?Action=Webcall&PBX=gz.zj.3.0&Account=N00000000459&ServiceNo=95361&Exten=' + phone_num + '&Timeout=40&Variable=called:' + phone;
        this.phonecall({
         	params: url,
         	loaded: null,
     	})
    },
    goBack() {
      this.$router.go(-1)
    },
    refresh(loaded) {
    	this.currentPage = 1
      this.refreshCustomer({
        params: {"userId":Login_cd,"userName":this.userName,"cdNo":this.cdNo,"cdLvl":(this.Lvl == null) ? '' : this.Lvl.value,"cdType":(this.type == null) ? '' : this.type.value,"currentPage":1},
        loaded: loaded
      })
    },
    loadMore(loaded) {
		    	this.currentPage += 1
		      this.loadMoreCustomer({
		        params: {"userId":Login_cd,"userName":this.userName,"cdNo":this.cdNo,"cdLvl":(this.Lvl == null) ? '' : this.Lvl.value,"cdType":(this.type == null) ? '' : this.type.value,"currentPage":this.currentPage},
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
    ...mapActions([
      'loadMoreCustomer',
      'refreshCustomer',
      'setCustomer',
      'saveTask',
      'phonecall',
      'getTel'
    ])
  },
  computed: {
    ...mapState({
      state: function (state) {
        return {
          customer: state.customer.customer,
          data: state.customer.data
        }
      }
    }),
    ...mapGetters([
      'customer',
      'hasRemark'
    ])
  },
  beforeMount () {
    this.refreshCustomer({
      params:null,
      loaded: null
    })
  },
  beforeCreate (){
  	sa.init({
			server_url: urlmai, 
		});
		sa.login(Login_cd);
		sa.quick('autoTrack');
		
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
    font-size: @font-size-small;
    padding: 0 10px;
    border-bottom: 1px solid #eee;
    .fa-male, .fa-female {
      color: #666;
    }
    a{
    	  display: inline-block;
		    width: 32px;
		    height: 48px;
		    line-height: 48px;
		    text-align: center;
		    color: #d3d3d3;
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
      input:nth-child(3) {
	    	width:45%;
	    	float: left;
	    }
	    input:nth-child(4) {
	    	width:45%;
	    	float: right;
	    	margin-right: -21.5px;
	    }
    }
    .wrap:last-child {
      margin-left: 5px;
      margin-right: 8px;
    }
  }
  .lianxi{
  	display: inline-block;
  	float: right;
  }
  .fa-lg {
    font-size: 21px;
  }
</style>
