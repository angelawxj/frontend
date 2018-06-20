<template>
  <div id="app">
  	
    <div class="nav">
    	 <a class="nav-sub-btn pull-left" @click="goBack">
        <i class="fa fa-chevron-left"></i>
      </a>
      <ul class="links clearfix">
        <!--<li>
          <a :class="[linkIndex == 0 ? 'active' : '']" @click="linkTo(0)" href="#/task">任务</a>
        </li>-->
        <li>
          <a :class="[linkIndex == 1 ? 'active' : '']" @click="linkTo(1)" href="#/task">图书</a>
        </li>
        <li>
          <a :class="[linkIndex == 2 ? 'active' : '']" @click="linkTo(2)" href="#/search">经验</a>
        </li>
        <li>
          <a :class="[linkIndex == 3 ? 'active' : '']" @click="linkTo(3)" href="#/personal">收藏</a>
        </li>
      </ul>
    </div>
  <a class="more" href="#/other" @click="linkToOther" v-show="!state.otherFlag"><i class="fa fa-ellipsis-h fa-lg"></i></a>
    <router-view :class="['router-view-app', state.otherFlag ? 'full-screen' : '']" />
    {{this.state.permiss}}
    <div id="pop" v-if="this.state.permiss">
	    <mt-popup v-model="popupVisible" popup-transition="popup-fade" class="mint-popup-1"  :closeOnClickModal='false'>
	      <p>未开通应用权限</p>
	      <label class="out" @click="goBack">退出</label>
	    </mt-popup>
    </div>
  </div>  
</template>
<script src="../static/global.js"></script>	
<script>

import {mapState, mapActions} from 'vuex'
import { Popup } from 'mint-ui'
import sa from'sa-sdk-javascript'

export default {
  name: 'app',
  data() {
    return {
      linkIndex: 0,
      popupVisible: true,
      tel:null
    }
  },
  methods: {
    linkTo(i) {
      this.linkIndex = i
    },
    goBack() {
    	
    },
    linkToOther() {
    	sa.track('importButtonClick', {
        AppOfButton: '尊鹏之音',
        AppId:'11646658',
        loginId:Login_cd,
        PageOfButton: '首页',
        firstModel: '顶部导航',
        secondModel: '',
        buttonName:'功能管理',
        buttonID:'',
	    });
      this.setOtherFlag(true)
    },
    ...mapActions([
      'setOtherFlag',
      'permission'
    ])
  },
  computed: {
    ...mapState({
      state: function (state) {
        console.log(state, state)
        return {
          otherFlag: state.page.otherFlag,
          permiss:state.page.permiss
        }
      }
    })
  },
  beforeMount () {	
  	sa.init({
		  server_url: 'http://47.95.172.102:8106/sa?project=zsshtest',  
		});
		sa.login('admin');
		sa.quick('autoTrack');
		
   	this.permission({
      params: {"login_cd": Login_cd},
      loaded: null, 
    })
  }  	
}
</script>

<style scoped rel="stylesheet/less" lang="less">
.v-modal{
	top:0px !important;
	border-radius: 5px;
}
.out{
	display: inline-block;
	background-color: #e60000;
	padding: 5px 10px;
	color: #fff;
	margin-top: 20px;
}
.nav {
  position: absolute;
  z-index: 9;
  width: 100%;
  height: 44px;
  background-color: #e60000;
  overflow: hidden;
  text-align: center;
  .links {
    font-size: 17px;
    font-weight: bold;
    height: 100%;
    display: inline-block;
    margin: 0 auto;
    li {
      float: left;
      margin-left: 10px;
      a {
        display: block;
        height: 22px;
        line-height: 22px;
        margin-top: 12px;
        color: white;
        text-decoration: none;
        padding: 0 5px;
        border-bottom: 2px solid #e60000;
      }
      a.active {
        border-bottom: 2px solid white;
      }
    }
    li:first-child {
      margin-left: 0;
    }
  }
}
.router-view-app {
  position: absolute;
  top: 44px;
  bottom: 0;
  display:block;
  width: 100%;
  overflow: hidden;
  background-color: white;
}
.router-view-app.full-screen {
  top: 0;
}
.more {
  display: block;
  position: absolute;
  text-align:center;
  width: 44px;
  height: 44px;
  z-index: 10;
  right: 0;
  top: 0;
  text-decoration: none;
  i {
    color: white;
    line-height: 44px;
  }
}
.pull-left {
    display: block;
    position: absolute;
    text-align: center;
    width: 44px;
    height: 44px;
    z-index: 10;
    left: 0;
    top: 0;
    text-decoration: none;
}
.fa-chevron-left{
	color: white;
	line-height: 44px;
}
.mint-popup-1 {
  width: 200px;
  border-radius: 8px;
  padding: 10px;
  top:42%;
  text-align: center;
  transform: translate(-50%, 0);
  h1 {
    font-size: 20px;
    color: #26a2ff;
  }
 
}
.mint-popup-1::before {
  triangle: 10px top #fff;
  content: '';
  position: absolute;
  top: 0px;
  right: 50px;
}


</style>
