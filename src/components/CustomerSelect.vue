<template>
  <div>
    <div class="nav-sub clearfix">
      {{ $route.name }}
      <a class="nav-sub-btn pull-left" @click="goBack">
        <i class="fa fa-chevron-left"></i>
      </a>
      <a class="nav-sub-btn pull-right" @click="filter">
        <i class="fa fa-filter"></i>
      </a>
    </div>
    <div class="pull-to-wrap">
      <pull-to
        :top-load-method="refresh"
        @top-state-change="stateChange">
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
          <li v-for="item in state.data" @click="check(item.merg_cust_id)" class="tupian">
            <mt-cell-swipe>
              <div slot="title" style="font-size: 14px;">
                <img v-show="item.cd_lvl == '01'" src="../assets/customer_card01.png" >
                <img v-show="item.cd_lvl == '02'" src="../assets/customer_card02.png" >
                <img v-show="item.cd_lvl == '03'" src="../assets/customer_card03.png" >
                <img v-show="item.cd_lvl == '04'" src="../assets/customer_card04.png" >
                &nbsp;&nbsp;{{ item.ch_nme }}&nbsp;&nbsp;
                {{ (item.gdr=="1")? "男" : "女"}}
                 <img class="behind" v-show="item.oth_vip_typ == '1'" src="../assets/customer_card1.png" >
                <img class="behind" v-show="item.ifBirth == '是'" src="../assets/birth.png" >
              </div>
              <div>
                <i v-show="item.checked ? true : false" class="fa fa-check-circle" style="float: right;"></i> 
             	 <i v-show="item.checked ? false : true" class="fa fa-circle-thin"></i>
              </div>
            </mt-cell-swipe>
          </li>
        </ul>
      </pull-to>
    </div>
    <a class="submit" @click="submit">
      {{ $route.query.fromPersonal ? '加入工作目标' : '发送' }}
    </a>
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
import {mapState, mapActions, mapGetters} from 'vuex'
import MtPopupPicker from '@/components/MtPopupPicker'
import { Toast } from 'mint-ui'
import { Indicator } from 'mint-ui'
const pickerData = [{name: '终身白金卡',value:"01"}, {name: '白金卡',value:"02"}, {name: '金卡',value:"03"}, {name: '银卡',value:"04"}, {name: '客户类型',value:""}]
const pickerTypeData = [{name: '集团要客',value:"1"}, {name: '客户等级',value:""}]
export default {
  name: 'customer',
  components: {
    PullTo,
    MtPopupPicker
  },
  data() {
    return {
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
    submit() {
      if(this.$route.query.fromPersonal) {
        let task = null;
        for(let i = 0, len = this.state.data.length; i < len; ++i) {
          let record = this.state.data[i]
          if(record.checked) {
            task = {}
            task.name = record.name
            task.age = record.age
            task.gender = record.gender
            task.level = record.level
            task.progress = 0
            task.current = true
            this.saveTask(task)
          }
        }
        if(task == null) {
          Toast({
            message: '请选择工作目标',
            position: 'bottom',
            duration: 2000
          })
        } else {
          Toast({
            message: '添加成功',
            position: 'bottom',
            duration: 2000
          })
          this.$router.go(-1)
        }
      } else {
        let selectionTel = [];
        for(let i = 0, len = this.state.data.length; i < len; ++i) {
          let record = this.state.data[i];
          if(record.checked) {
            selectionTel.push(record.cont_tel_num);
          }
        }
       var content = window.localStorage.getItem('content');
       	Toast({
            message: '功能维护中',
            position: 'bottom',
            duration: 2000
          })
//      this.sendMessage({
//		      params: {'listNum':selectionTel,'templete':content},
//		      loaded: null,
//		      router: this.$router
//		    })
      }
    },
    check(id) {
      this.setCustomerChecked(id)
    },
    filter(){
    	this.$router.push({
        path: '/other/customerAllocation/customerAllocationNext/customerAllocationFilter',
        query: {
          fromCustomerSelect: true
        }
      })	
    },
   	search() {
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
    },
    addToTarget() {
      console.log('addToTarget')
    },
    goBack() {
      this.$router.go(-1)
    },
   refresh(loaded) {
		   this.refreshCustomerAllocationNext({
		    params: {'login_cd':Login_cd,'data':''},
		    loaded: loaded,
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
      'refreshCustomerAllocationNext',
      'setCustomerID',
      'setCustomerChecked',
      'saveTask',
      'sendMessage'
    ])
  },
  computed: {
    ...mapState({
      state: function (state) {
        return {
          id: state.customer.customerID,
          data: state.customer.allocationNext
        }
      }
    }),
    ...mapGetters([
      'customer'
    ])
  },
  beforeMount () {
  	Indicator.open({
		  text: '加载中',
		  spinnerType: 'fading-circle'
		});
  	if(this.$route.query.Data){
  		var Data =this.$route.query.Data
  	}else{
  		var Data = ''
  	}
     this.refreshCustomerAllocationNext({
      params: {'login_cd':Login_cd,'data': ''},
      loaded: null,
      routerData:Data
      
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
    font-size: @font-size-small;
    padding: 0;
    a.mint-cell.mint-cell-swipe {
      color: #666;
    }
    .mint-cell-value i {
      color: @font-color-gray;
    }
  }
  .list li:nth-child(even) {
    background-color: white;
  }
  .mint-cell-wrapper {
    font-size: @font-size-normal;
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
  a.submit {
    position: absolute;
    display: block;
    width: 100%;
    height: 44px;
    line-height: 44px;
    background-color: @color-theme-2;
    font-size: 14px;
    color: white;
    bottom: 0;
    text-align: center;
  }
  .pull-to-wrap {
    bottom: 44px;
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
  
</style>
