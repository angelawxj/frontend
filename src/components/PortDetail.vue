<template>
  <div>
    <div class="nav-sub clearfix">
      {{ $route.name }}
      <a class="nav-sub-btn pull-left" @click="$router.go(-1)">
        <i class="fa fa-chevron-left"></i>
      </a>
      <a class="nav-sub-btn pull-right">

      </a>
    </div>
   	<ul class="detail clearfix" v-for="item in state.data" v-if="item.merg_cust_id == id">
        <li>
	        <span>姓名: {{item.ch_fst_nm}}</span>
	        <span class="imgs">
	        	<img v-show="item.cd_lvl == '01'" src="../assets/customer_card01.png" >
            <img v-show="item.cd_lvl == '02'" src="../assets/customer_card02.png" >
            <img v-show="item.cd_lvl == '03'" src="../assets/customer_card03.png" >
            <img v-show="item.cd_lvl == '04'" src="../assets/customer_card04.png" >
	        </span>
	    </li> 
	    <li>
	   		<span>性别: {{item.gdr}}</span>
	   	</li>
	   	<li>
	   		<span>航班号: {{item.transp_flight_num}}</span>
	   	</li>
	   	<li>
	   		<span>生日: {{item.birth}}</span>
	   	</li>
	    <li>
	    	<span>座位偏好: {{item.seat_hobby}}</span>
	   	</li>  
	   	<li>
	   		<span>餐饮喜好: {{item.spml_hobby}}</span>
	   	</li>
	   	<li>
	   		<span>使用过产品: {{item.use_prd_desc}}</span>
	   	</li>
	   	<li>
	   		<span>单位: {{item.comp}}</span>
	   	</li>
    </ul>
    <!--<div class="sep"></div>
    <ul class="detail clearfix">
      <li v-show="port.flightNumber && port.flightNumber != ''">
        <span>航班号:</span>
        <span>{{ port.flightNumber }}</span>
      </li>
      <li v-show="port.flightDate && port.flightDate != ''">
        <span>日期:</span>
        <span>{{ port.flightDate }}</span>
      </li>
      <li v-show="port.flightLeg && port.flightLeg != ''">
        <span>航段:</span>
        <span>{{ port.flightLeg }}</span>
      </li>
      <li v-show="port.flightStatus && port.flightStatus != ''">
        <span>航班状态:</span>
        <span>{{ port.flightStatus }}</span>
      </li>
      <li v-show="port.flightDest && port.flightDest != ''">
        <span>目的地机场:</span>
        <span>{{ port.flightDest }}</span>
      </li>
      <li v-show="port.flightSeat && port.flightSeat != ''">
        <span>座位号:</span>
        <span>{{ port.flightSeat }}</span>
      </li>
    </ul>-->
    <ul class="buttons">
      <li>
        <a @click="messageTo">
          <i class="fa fa-comment fa-lg"></i>
        </a>
      </li>
      <li>
        <a @click.prevent.stop="phoneCall()">
          <i class="fa fa-phone fa-lg"></i>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapState} from 'vuex'
import { Toast, MessageBox } from 'mint-ui'
import { Indicator } from 'mint-ui'
import sa from'sa-sdk-javascript';
export default {
  name: 'portDetail',
  components: {

  },
  data() {
    return {

    }
  },
  methods: {
  	phoneCall() {
  		sa.track('importButtonClick', {
        AppOfButton: '尊鹏之音',
        AppId:'11646658',
        loginId:Login_cd,
        PageOfButton: '三日内进出港详情',
        firstModel: '三日内进出港',
        secondModel: '联系客户',
        buttonName:'打电话',
        buttonID:'',
	    });
//     uexCall.dial(tel);
				var phone = this.$route.query.tel ;
        var url = 'http://14.29.4.235/command?Action=Webcall&PBX=gz.zj.3.0&Account=N00000000459&ServiceNo=95361&Exten=' + phone_num + '&Timeout=40&Variable=called:' + phone;
//     this.getTel({params:''});
       this.phonecall({
	        params: url,
	        loaded: null,
	      })
    },
    messageTo() {
     	sa.track('importButtonClick', {
        AppOfButton: '尊鹏之音',
        AppId:'11646658',
        loginId:Login_cd,
        PageOfButton: '三日内进出港详情',
        firstModel: '三日内进出港',
        secondModel: '联系客户',
        buttonName:'发短信',
        buttonID:'',
	    });
     var tel = this.$route.query.tel ;
      Toast({
        message: '功能维护中',
        position: 'bottom',
        duration: 2000
      })
//   uexSMS.open(tel, '');
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
    ...mapActions([
      'loadMorePort',
      'refreshPort',
      'phonecall',
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
    id(){
    	var a = this.$route.query.id;
    	console.log(a)
    	return this.$route.query.id
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
  .sep {
    background-color: #f7f7f7;
    height: 5px;
    border-bottom: 1px solid @border-color-normal;
  }
  .detail {
    padding: 10px;
    padding-top: 44px;
    border-bottom: 1px solid @border-color-normal;
    li {
      float:left;
      width: 49%;
      margin-top: 10px;
      span {
        font-size: @font-size-normal;
      }
      span:first-child {
        color: @font-color-gray;
      }
      span:last-child {
        color: @font-color-normal;
      }
    }
  }
  .buttons {
    position: absolute;
    bottom: 0;
    width: 100%;
    li {
      float:left;
      width: 50%;
      background: @color-theme-2;
      a {
        display: block;
        height: 44px;
        line-height: 44px;
        color: @font-color-white;
        text-align: center;
      }
    }
    li:first-child {

    }
    li:last-child {
      border-left: 1px solid white;
      margin-left: -1px;
    }
  }
   .imgs img{
  	width:25px;
  	position: absolute;
    margin-top: -2px;
    padding: 0 10px;
  }
</style>
