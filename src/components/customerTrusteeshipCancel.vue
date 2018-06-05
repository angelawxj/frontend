<template>
  <div>
    <div class="nav-sub clearfix">
      {{ $route.name }}
      <a class="nav-sub-btn pull-left" @click="goBack">
        <i class="fa fa-chevron-left"></i>
      </a>
      <a class="nav-sub-btn pull-right">
        
      </a>
      
    </div>
   <pull-to>
      <ul class="list">
	      <li>
	           	托管客户<span>{{($route.query.flag == '1')? state.data.count : countd}}</span>人
	      </li>
	   </ul>
    </pull-to>
    <a class="submit" @click="submit">
      	撤回托管客户
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
  </div>
</template>

<script>
import PullTo from 'vue-pull-to'
import {mapState, mapActions, mapGetters} from 'vuex'
import MtPopupPicker from '@/components/MtPopupPicker'
import { Toast } from 'mint-ui'
const pickerData = [{name: '金卡'}, {name: '白金卡'}, {name: '终身白金卡'}, {name: '终身白金卡'}, {name: '集团要客'}, {name: '体验型集团要客'}, {name: '预备降级旅客'}, {name: '预备升级旅客'}, {name: '流失旅客'}, {name: '高频高价旅客'}, {name: '银卡'}]
export default {
  name: 'customerTrusteeshipCancel',
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
      count:''
    }
  },
  methods: {
    submit() {
    this.refreshCustomerTrusteeshipRecall({
    	 router : this.$router
    })
    },
    check(id) {
      this.setCustomerTrustChecked(id)
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
//  	this.customerTrusteeshipCancel({
//	      params:{'login_cd':'A00001','to_cd':this.$route.query.loginCd},
//	      loaded: null
//	    })
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
      'customerTrusteeshipCancel',
      'setCustomerID',
      'setCustomerTrustChecked',
      'refreshCustomerTrusteeshipRecall'
    ])
  },
  computed: {
    ...mapState({
      state: function (state) {
      	console.log(state.customer.trusteeshipCancel)
        return {
          data: state.customer.trusteeshipCancel
        }
      }
    }),
    ...mapGetters([
      'customer'
    ]),
    countd: function(){
	    	this.count = this.$route.query.count
	    	return this.count
    }
  },
  beforeMount () {
  	if(this.$route.query.flag == '1'){
	     this.customerTrusteeshipCancel({
	      params:{'login_cd':Login_cd,'to_cd':this.$route.query.loginCd},
	      loaded: null,
	     
	    })
	  }
  }
}
</script>

<style scoped rel="stylesheet/less" lang="less">
  @import "../less/vue-pull-to.less";
  @import "../less/common.less";
  .list {
  	margin-top: 44px;
  	margin-bottom: 44px;
  }
  .list li {
    overflow: hidden;
    height: auto;
     padding: 0;
    padding-left: 10px;
    font-size: @font-size-normal;
   
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
    position: fixed;
    display: block;
    width: 100%;
    height: 44px;
    line-height: 44px;
    background-color: @color-gold;
    font-size: 14px;
    color: white;
    bottom: 0;
    text-align: center;
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
		z-index: 10;
		background: #fff;
		width: 100%;
		height: 54px;
		border-bottom: 1px solid #aaaaaa;
		top: 44px;
	}
  .header label{
		font-size: 14px;
		color: @font-color-normal;
		margin-top: 10px;
		height: 44px;
		line-height: 44px;
		display: block;
		margin-left: 10px;
	}
	label{
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
	}
	.job{
		font-size: @font-size-small;
		height: 21px;
	}
	.mint-cell-title{
		
	}
</style>


