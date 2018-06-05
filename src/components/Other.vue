<template>
  <div>
    <div class="nav-sub theme-bgc clearfix">
      {{ $route.name }}
      <a class="nav-sub-btn pull-left" @click="goBack">
        <i class="fa fa-chevron-left"></i>
      </a>
      <a class="nav-sub-btn pull-right"></a>
    </div>
    <div class="pull-to-wrap">
      <pull-to>
        <ul class="list">
        	<a  @click="changePhone">
          	<li  class="clearfix">
	            <p>修改手机号</p>
	            <i class="fa fa-angle-right"></i>
          	</li>
           </a>
           <a @click="jump">
           	
          	<li  class="clearfix">
	            <p>托管客户</p>
	            <i class="fa fa-angle-right"></i>
          	</li>
           </a>
           <a  @click="customerAllocation">
          	<li  class="clearfix">
	            <p>客户分配</p>
	            <i class="fa fa-angle-right"></i>
          	</li>
           </a>
           <a  @click="customerManager">
          	<li  class="clearfix">
	            <p>客户经理管理</p>
	            <i class="fa fa-angle-right"></i>
          	</li>
           </a>
        </ul>
      </pull-to>
    </div>
    <router-view class="router-view-other" />
  </div>
</template>

<script>
import {mapState, mapActions, mapGetters} from 'vuex'
import PullTo from 'vue-pull-to'
import { Indicator } from 'mint-ui'
import sa from'sa-sdk-javascript';

export default {
  name: 'other',
  components: {
    PullTo
  },
  data() {
    return {
    	URL: '',
      iconLink: ''
    }
  },
  methods: {
    goBack() {
      this.setOtherFlag(false)
      this.$router.go(-1)
    },
    changePhone() {
    	this.$router.push('/other/changePhone')
			sa.track('importButtonClick', {
        AppOfButton: '尊鹏之音',
        AppId:'11646658',
        loginId:Login_cd,
        PageOfButton: '功能管理',
        firstModel: '功能管理列表',
        secondModel: '',
        buttonName:'修改手机号',
        buttonID:'',
	    });
    },
    jump() {
    	sa.track('importButtonClick', {
        AppOfButton: '尊鹏之音',
        AppId:'11646658',
        loginId:Login_cd,
        PageOfButton: '功能管理',
        firstModel: '功能管理列表',
        secondModel: '',
        buttonName:'托管客户',
        buttonID:'',
	    });
    	this.otherJump({
    		  params: {"login_cd":Login_cd},
    		  router : this.$router
    	}); 
    	
    },
    customerAllocation() {
    	this.$router.push('/other/customerAllocation')
			sa.track('importButtonClick', {
        AppOfButton: '尊鹏之音',
        AppId:'11646658',
        loginId:Login_cd,
        PageOfButton: '功能管理',
        firstModel: '功能管理列表',
        secondModel: '',
        buttonName:'客户分配',
        buttonID:'',
	    });
    },
    customerManager() {
    	this.$router.push('/other/customerManager')
			sa.track('importButtonClick', {
        AppOfButton: '尊鹏之音',
        AppId:'11646658',
        loginId:Login_cd,
        PageOfButton: '功能管理',
        firstModel: '客户经理管理',
        secondModel: '',
        buttonName:'修改手机号',
        buttonID:'',
	    });
    },
    ...mapActions([
      'setOtherFlag',
      'otherJump'
    ])
  },
  computed: {
    ...mapState({
      state: function (state) {
        return {
         customer: state.customer.customer,
          data: state.customer.other
        }
      }
    }),
  },
  beforeMount () {
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
    height: auto;
    border-top: 1px solid @border-color-normal;
    padding: 15px 10px;
    p, i {
      color: @font-color-normal;
      font-size: font-size-large;
      line-height: @line-height-normal;
    }
    p {
      float: left;
    }
    i {
      float: right;
    }
  }
  .list li:nth-child(even) {
    background-color: white;
  }
  .list li:last-child {
    border-bottom: 1px solid @border-color-normal;
  }
  .theme-bgc {background-color: @color-theme;}
  .router-view-other {
    position: absolute;
    top: 0px;
    bottom: 0;
    display:block;
    width: 100%;
    overflow: hidden;
    background-color: white;
  }
</style>
