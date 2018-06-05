<template>
  <div>
    <div class="nav-sub clearfix">
      {{ $route.name }}
      <a class="nav-sub-btn pull-left" @click="goBack">
        <i class="fa fa-chevron-left"></i>
      </a>
      <a class="nav-sub-btn pull-right" @click="customerAllocationFilter" >
        <i class="fa fa-filter"></i>
      </a>
      
    </div>
    <div class="header">
		    <label>将客户分配给</label>
		    <label>{{position}}&nbsp;{{dep_user_name}}</label>
		</div>
    <pull-to>
        <ul class="list">
          <li v-for="item in state.data" @click="check(item.merg_cust_id)">
            <mt-cell-swipe>
              <div slot="title" class="wrap">
               {{ item.ch_nme }}
               	({{ (item.gdr == "1")? "男" : "女"}})&nbsp;
               	<div class="job">单位：{{ item.comp}}</div>
              </div>
              <div>
                <i v-show="item.checked ? true : false" class="fa fa-check-circle"></i>
                <i v-show="item.checked ? false : true" class="fa fa-circle-thin"></i>
              </div>
            </mt-cell-swipe>
          </li>
        </ul>	
    </pull-to>
    <a class="submitLeft">
    	<span class="spanLeft" @click="selectAll()">
    			 <i v-show="selected ? true : false" class="fa fa-check-circle"></i>
           <i v-show="selected ? false : true" class="fa fa-circle-thin"></i>
    			全选
    	</span>
     	<span class="spanRight">供选择{{selectedLengthFun}}人</span>
    </a>
    <a class="submit" @click="custormerTrust">
     	客户分配
    </a>
    <mt-popup
      v-model="popupTop"
      popup-transition="popup-fade"
      position="top">
      <div class="wrap">
        <input type="text" placeholder="姓名" />
        <input type="text" placeholder="会员号" />
        <input type="text" placeholder="客户类型" readonly @click="showPopupPicker" :value="type ? type.name : ''" />
      </div>
      <div class="wrap">
        <mt-button type="primary" @click="search">查询</mt-button>
      </div>
    </mt-popup>
    <mt-popup-picker
      ref="popupPicker"
      :dataSource="pickerData"
      @confirm="popupPickerConfirm"
      v-model="currentType"/>
      <router-view class="router-view-other-customerAllocationNext" />
  </div>
</template>

<script>
import PullTo from 'vue-pull-to'
import {mapState, mapActions, mapGetters} from 'vuex'
import MtPopupPicker from '@/components/MtPopupPicker'
import { Toast } from 'mint-ui'
import { Indicator } from 'mint-ui'
import sa from'sa-sdk-javascript'

const pickerData = [{name: '金卡'}, {name: '白金卡'}, {name: '终身白金卡'}, {name: '终身白金卡'}, {name: '集团要客'}, {name: '体验型集团要客'}, {name: '预备降级旅客'}, {name: '预备升级旅客'}, {name: '流失旅客'}, {name: '高频高价旅客'}, {name: '银卡'}]
export default {
  name: 'customerTrusteeship',
  components: {
    PullTo,
    MtPopupPicker
  },
  data() {
    return {
      popupTop: false,
      pickerData: pickerData,
      type: null,
      currentType: pickerData[0],
      iconLink: '',
      selected: false,
      selectedLength: 0
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
        let selection = false;
        for(let i = 0, len = this.state.data.length; i < len; ++i) {
          let record = this.state.data[i];
          if(record.checked) {
            selection = true;
            break;
          }
        }
        if(selection) {
          Toast({
            message: '发送成功',
            position: 'bottom',
            duration: 2000
          })
          this.$router.go(-2)
        } else {
          Toast({
            message: '请选择发送对象',
            position: 'bottom',
            duration: 2000
          })
        }
      }
    },
    selectAllalert(){
    	alert("2222")
    },
    customerAllocationFilter() {
    	this.$router.push('/other/customerAllocation/customerAllocationNext/customerAllocationFilter')
			sa.track('importButtonClick', {
        AppOfButton: '尊鹏之音',
        AppId:'11646658',
        loginId:Login_cd,
        PageOfButton: '客户分配',
        firstModel: '功能管理',
        secondModel: '',
        buttonName:'客户筛选',
        buttonID:'',
	    });
    },
    custormerTrust(){
    	sa.track('importButtonClick', {
        AppOfButton: '尊鹏之音',
        AppId:'11646658',
        loginId:Login_cd,
        PageOfButton: '客户分配',
        firstModel: '功能管理',
        secondModel: '',
        buttonName:'客户分配',
        buttonID:'',
	    });
    	let selectData = [];
    	for(let i = 0, len = this.state.data.length; i < len; ++i) {
    		let record = this.state.data[i]
    		if(record.checked){
    			selectData.push(record.merg_cust_id)
    		}
    	}
    	var tologincd =  window.localStorage.getItem('tologincd');
    	this.custormerTrustFun({
        params: {
        	login_cd:Login_cd,
        	user_id: tologincd,
        	data : selectData
        },
      router : this.$router
      })
    },
    check(id,all) {
			this.setCustomerAllocationNextChecked(id)
    },
    selectAll(){
  	 	if(this.selected){
				this.selected = false;
				var flag = false;
    	}else{
    		this.selected = true;
    		var flag = true;
    	}
    	this.selectAllCustomerAllocationNext(flag)
    },
    search() {
      this.popupTop = false
    },
    showPopupPicker() {
      this.$refs.popupPicker.open()
    },
    popupPickerConfirm() {
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
    	alert("1")
//    this.refreshCustomerAllocationNext({
//      params: null,
//      loaded: loaded,
//      router : this.$router
//    })
    },
    loadMore(loaded) {
      this.loadMoreCustomer({
        params: null,
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
      'refreshCustomerAllocationNext',
      'setCustomerID',
      'setCustomerAllocationNextChecked',
      'selectAllCustomerAllocationNext',
      'custormerTrustFun'
    ])
  },
  computed: {
    ...mapState({
      state: function (state) {
        return {
          data: state.customer.allocationNext
        }
      }
    }),
    ...mapGetters([
      'customer'
    ]),
    selectedLengthFun: function () {
    	this.selectedLength = 0;
    	for(let i = 0, len = this.state.data.length; i < len; ++i) {
    		let record = this.state.data[i]
    		if(record.checked){
    			this.selectedLength += 1;
    		}
    	}
      return this.selectedLength
    },
    position: function () {
      var pos = window.localStorage.getItem('pos');
      return pos
    },
    dep_user_name: function () {
    	var dep_username = window.localStorage.getItem('dep_username');
      return dep_username
    },
  },
  beforeMount () {
  	sa.init({
			server_url: urlmai, 
		});
		sa.login(Login_cd);
		sa.quick('autoTrack');
		
  	Indicator.open({
			  text: '加载中',
			  spinnerType: 'fading-circle'
			});
  	var data = window.localStorage.getItem('Data');
    this.refreshCustomerAllocationNext({
      params: {'login_cd':Login_cd,'data':''},
      loaded: null,
      routerData : data
    })
    console.log('$route.path', this.$route.path)
  },
  watch: {
      '$route' (to,from) {
        if(to.path == '/other/customerAllocation/customerAllocationNext'){
        	var Data = window.localStorage.getItem('Data');
        	console.log(Data)
        	this.refreshCustomerAllocationNext({
			      params: {'login_cd':Login_cd,'data':''},
			      loaded: null,
			      routerData : Data
			    })
        }
      }
    }
}
</script>

<style scoped rel="stylesheet/less" lang="less">
  @import "../less/vue-pull-to.less";
  @import "../less/common.less";
  .list {
  	margin-top: 118px;
  	margin-bottom: 44px;
  }
  .list li {
    overflow: hidden;
    height: auto;
    font-size: @font-size-small;
    padding: 0;
    .wrap {
      padding: 10px 0;
      font-size: @font-size-normal;
      line-height: @line-height-normal;
      span {
        display: block;
        font-size: @font-size-normal;
        color: @font-color-normal;
      }
      span.red {
        color: @color-theme;
      }
      p {
        font-size: @font-size-small;
        color: @font-color-gray;
      }
    }
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
    padding: 0 20px;
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
    }
    .wrap:last-child {
      margin-left: 5px;
      margin-right: 8px;
    }
  }
  a.submit {
    position: absolute;
    display: block;
    width: 20%;
    right:0px;
    height: 44px;
    line-height: 44px;
    background-color: @color-theme;
    font-size: 14px;
    color: white;
    bottom: 0;
    text-align: center;
    box-shadow: -2px 0px 10px rgba(0, 0, 0, 0.1);
  }
   a.submitLeft {
    position: absolute;
    display: block;
    width: 80%;
    left:0px;
    height: 44px;
    line-height: 44px;
    background-color: @color-theme-2;
    font-size: 14px;
    color: white;
    bottom: 0;
    text-align: center;
    .spanLeft{
    	float: left;
    	padding-left: 10px;
    }
     .spanRight{
    	float: right;
    	padding-right: 15px;
    }
  }
  .pull-to-wrap {
    bottom: 44px;
  }
  li.headli{
  	position: absolute;
    z-index: 9;
    top: 0;
  }
  .header {
		position: fixed;
		z-index: 2;
		width: 100%;
		background: #fff;
		height: 74px;
		border-bottom: 1px solid #aaaaaa;
		top: 44px;
	}
  .header label{
		font-size: 14px;
		color: @font-color-normal;
		margin-top: 10px;
		height: 14px;
		line-height: 44px;
		display: block;
		margin-left: 10px;
	}
	label{
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
	}
	.job{
		font-size: @font-size-small;
	}
	.mint-cell-title{
		
	}
	.router-view-other-customerAllocationNext {
    position: absolute;
    z-index: 10;
    top: 0;
    bottom: 0;
    display:block;
    width: 100%;
    overflow: hidden;
    background-color: white;
  }
</style>

