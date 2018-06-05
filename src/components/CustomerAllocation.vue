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
    <div class="header">
		    <label>请选择客户经理</label>
		</div>
    <pull-to>
        <ul class="list">
          <li v-for="item in state.data" @click="check(item.dep_id)">
            <mt-cell-swipe>
              <div slot="title" class="wrap" >
               {{ item.dep_user_name }}
               	({{ item.login_cd }})&nbsp;
               	<div class="job">{{ item.position }}</div>
              </div>
              <div>
                <i v-show="item.checked ? true : false" class="fa fa-check-circle"></i>
                <i v-show="item.checked ? false : true" class="fa fa-circle-thin"></i>
              </div>
            </mt-cell-swipe>
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
    <a class="submit" @click="submit">
     	下一步
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
      iconLink: ''
    }
  },
  methods: {
    submit() {
    	let id = null
    	let username = ""
    	let pos = ""
    	for(let i = 0, len = this.state.data.length; i < len; ++i) {
    		let record = this.state.data[i]
    		if(record.checked){
					id = record.login_cd ;
					username = record.dep_user_name;
					pos = record.position;
					break
    		}
    	}
    	if(id){
	      this.$router.push({
	        path: '/other/customerAllocation/customerAllocationNext',
//	        query: {
//	          tologincd: id,
//	          dep_username : username,
//	          pos:pos,
//	          data:''
//	        }
	      });
	      window.localStorage.setItem('pos',pos);
	      window.localStorage.setItem('dep_username',username);
	      window.localStorage.setItem('tologincd',id);
	       localStorage.removeItem("Data");
	      
	    }else{
	    	Toast({
          message: '请选择客户经理',
          position: 'bottom',
          duration: 2000
        })
        return;
	    }
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
      this.refreshCustomerTrusteeship({
        params: null,
        loaded: loaded
      })
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
      'refreshCustomerTrusteeship',
      'setCustomerID',
      'setCustomerTrustChecked',
    ])
  },
  computed: {
    ...mapState({
      state: function (state) {
        return {
          data: state.customer.trusteeship
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
    this.refreshCustomerTrusteeship({
      params: null,
      loaded: null,
    })
    console.log('$route.path', this.$route.path)
  }
}
</script>

<style scoped rel="stylesheet/less" lang="less">
  @import "../less/vue-pull-to.less";
  @import "../less/common.less";
  .list {
  	margin-top: 98px;
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
  li.headli{
  	position: absolute;
    z-index: 9;
    top: 0;
  }
  .header {
		position: absolute;
		background: #fff;
		width: 100%;
		z-index: 2;
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
	.router-view-other-customerAllocationNext {
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: 4;
    display:block;
    width: 100%;
    overflow: hidden;
    background-color: white;
  }
</style>

