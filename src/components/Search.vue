<template>
  <div>
    <ul class="search clearfix">
    	
     <li>
        <a>
          <dl class="plane" @click="customerInfo">
            <dt></dt>
            <dd>客户信息</dd>
          </dl>
        </a>
      </li>
      <li>
        <a>
          <dl class="plane" @click="port">
            <dt></dt>
            <dd>三日进出港</dd>
          </dl>
        </a>
      </li>
      <li>
        <a>
          <dl class="plane" @click="message">
            <dt></dt>
            <dd>短信模板</dd>
          </dl>
        </a>
      </li>
      <li>
        <a>
          <dl class="plane" @click="repair">
            <dt></dt>
            <dd>待修复客户</dd>
          </dl>
        </a>
      </li>
       <li>
        <a>
          <dl class="plane" @click="developed">
            <dt></dt>
            <dd>待发展客户</dd>
          </dl>
        </a>
      </li>
    </ul>
    <router-view class="router-view-search" />
  </div>
</template>

<script>
import { Indicator } from 'mint-ui'
import sa from'sa-sdk-javascript';
export default {
  name: 'search',
  data() {
    return {

    }
  },
  methods: {
		customerInfo(){
			Indicator.open({
			  text: '加载中',
			  spinnerType: 'fading-circle'
			});
			this.$router.push('/search/customer')
			sa.track('importButtonClick', {
        AppOfButton: '尊鹏之音',
        AppId:'11646658',
        loginId:Login_cd,
        PageOfButton: '搜索首页',
        firstModel: '首页功能模块',
        secondModel: '',
        buttonName:'客户信息',
        buttonID:'',
	    });
		},
		port(){
			Indicator.open({
			  text: '加载中',
			  spinnerType: 'fading-circle'
			});
			this.$router.push('/search/port')
			sa.track('importButtonClick', {
        AppOfButton: '尊鹏之音',
        AppId:'11646658',
        loginId:Login_cd,
        PageOfButton: '搜索首页',
        firstModel: '首页功能模块',
        secondModel: '',
        buttonName:'三日进出港',
        buttonID:'',
	    });
		},
		message(){
//			Indicator.open({
//			  text: '加载中',
//			  spinnerType: 'fading-circle'
//			});
			this.$router.push('/search/message')
			sa.track('importButtonClick', {
       AppOfButton: '尊鹏之音',
        AppId:'11646658',
        loginId:Login_cd,
        PageOfButton: '搜索首页',
        firstModel: '首页功能模块',
        secondModel: '',
        buttonName:'短信模版',
        buttonID:'',
	    });
		},
		repair(){
			Indicator.open({
			  text: '加载中',
			  spinnerType: 'fading-circle'
			});
			this.$router.push('/search/repairPerson')
			sa.track('importButtonClick', {
				AppOfButton: '尊鹏之音',
        AppId:'11646658',
        loginId:Login_cd,
        PageOfButton: '搜索首页',
        firstModel: '首页功能模块',
        secondModel: '',
        buttonName:'待修复客户',
        buttonID:'',
	    });
		},
		developed(){
			Indicator.open({
			  text: '加载中',
			  spinnerType: 'fading-circle'
			});
			this.$router.push('/search/developed')
			sa.track('importButtonClick', {
       AppOfButton: '尊鹏之音',
        AppId:'11646658',
        loginId:Login_cd,
        PageOfButton: '搜索首页',
        firstModel: '首页功能模块',
        secondModel: '',
        buttonName:'待发展客户',
        buttonID:'',
	    });
	  }
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
@import "../less/common.less";

.search {
  li {
    float: left;
    width: 32%;
    margin-left: 1%;
   	padding-top:20px;
    a {
      display: block;
      text-decoration: none;
      dl {
        padding: 10px 0;
        dt {
          width: 36px;
          height: 36px;
          margin: 0 auto;
        }
        dd {
          text-align: center;
          margin-top: 10px;
          font-size: @font-size-normal;
          color: @font-color-normal;
          line-height: @line-height-normal;
        }
      }
      dl.plane {
        dt {
          background: url(../assets/logo.png) no-repeat;
          background-size: 100% 100%;
        }
      }
      dl:active {
        background-color: lightGray;
      }
    }
  }
}
.router-view-search {
  position: absolute;
  top: 0;
  bottom: 0;
  display:block;
  width: 100%;
  overflow: hidden;
}
.full-screen{
	position: absolute;
	top:44px !important;
	}
 .v-modal{
	top:0px !important;
	}
</style>
