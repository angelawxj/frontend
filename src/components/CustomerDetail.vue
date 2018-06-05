<template>
  <div>
    <div class="nav-sub clearfix">
      {{ $route.name }}
      <a class="nav-sub-btn pull-left" @click="goBack">
        <i class="fa fa-chevron-left"></i>
      </a>
      <a class="nav-sub-btn pull-right" @click="addToTarget">
     <!--   加入工作目标-->
      </a>
    </div>
    <div class="pull-to-wrap">
      <ul class="detail clearfix" v-for="item in state.data" v-if="item.merg_cust_id == id">
        <li>
	        <span>姓名: {{item.ch_nme}}</span>
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
       <!-- <li v-show="state.customer.gender && state.customer.gender != ''">
          <span>姓别:</span>
          <span>{{ state.customer.gender }}</span>
        </li>
        <li v-show="state.customer.post && state.customer.post != ''">
          <span>职务:</span>
          <span>{{ state.customer.post }}</span>
        </li>
        <li v-show="state.customer.company && state.customer.company != ''" style="width: 98%">
          <span>单位:</span>
          <span>{{ state.customer.company }}</span>
        </li>
        <li v-show="state.customer.seatHobby && state.customer.seatHobby != ''">
          <span>座位偏好:</span>
          <span>{{ state.customer.seatHobby }}</span>
        </li>
        <li v-show="state.customer.foodHobby && state.customer.foodHobby != ''">
          <span>餐饮喜好:</span>
          <span>{{ state.customer.foodHobby }}</span>
        </li>
        <li v-show="state.customer.product && state.customer.product != ''">
          <span>使用过产品:</span>
          <span>{{ state.customer.product }}</span>
        </li>-->
      </ul>
      <!--<div class="sep"></div>
      <ul class="menu">
        <li>
          <a href="#/search/customer/detail/service">
            <label>服务历史</label>
            <i class="fa fa-angle-right"></i>
          </a>
        </li>
        <li>
          <a href="#/search/customer/detail/flight">
            <label>乘机记录</label>
            <i class="fa fa-angle-right"></i>
          </a>
        </li>
        <li>
          <a href="#/search/customer/detail/remark">
            <label>历史备注</label>
            <i class="fa fa-angle-right"></i>
          </a>
        </li>
      </ul>-->
      <!--<ul class="buttons">
        <li>
          <a @click="messageTo">
            <i class="fa fa-comment fa-lg"></i>
          </a>
        </li>
        <li>
          <a>
            <i class="fa fa-phone fa-lg"></i>
          </a>
        </li>
      </ul>-->
    </div>
    <router-view class="router-view-search-customer-detail" />
    <mt-popup
      v-model="popupCenter"
      popup-transition="popup-fade"
      position="center">
      <div class="clearfix">
        <label>添加备注</label>
        <i class="fa fa-close" @click="closePopup"></i>
      </div>
      <textarea placeholder="请输入" v-model="demo"></textarea>
    </mt-popup>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapState} from 'vuex'
import { MessageBox, Toast } from 'mint-ui'
export default {
  name: 'customerDetail',
  components: {

  },
  data() {
    return {
      popupCenter: false,
      demo: '',
     
    }
  },
  methods: {
    addToTarget() {
      var task = {}
      task.name = this.state.customer.name
      task.age = this.state.customer.age
      task.gender = this.state.customer.gender
      task.level = this.state.customer.level
      task.progress = 0
      task.current = true
      this.saveTask(task)
      Toast({
        message: '加入成功',
        position: 'bottom',
        duration: 2000
      })
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
          vm.$router.push('/search/message')
        } else {
          vm.$router.push('/search/message/send')
        }
      })
    },
    goBack() {
      this.$router.go(-1)
      let vm = this
      setTimeout(() => {
        vm.setCustomer(null)
      }, 200);
    },
    addTag() {
      this.popupCenter = true
      this.demo = this.customer.demo
    },
    closePopup() {
      this.popupCenter = false
      this.setCustomerDemo({
        id: this.state.customer.id,
        demo: this.demo
      })
    },
    ...mapActions([
      'setCustomer',
      'setCustomerDemo',
      'refreshCustomer',
      'saveTask'
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
    id(){
    	var a = this.$route.query.id;
    	console.log(a)
    	return this.$route.query.id
    }
  }
}
</script>

<style scoped rel="stylesheet/less" lang="less">
  @import "../less/common.less";
  .sep {
    background-color: #f7f7f7;
    height: 5px;
  }
  .detail {
    padding: 10px;
    padding-top: 0px;
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
  .demo {
    padding: 10px;
    line-height: @line-height-normal;
    font-size: @font-size-normal;
    color: @font-color-normal;
    border-top: 1px solid @border-color-normal;
    border-bottom: 1px solid @border-color-normal;
  }
  .menu {
    li {
      border-top: 1px solid @border-color-normal;
      a {
        padding: 10px;
        padding-right: 15px;
        display: block;
        line-height: @line-height-normal;
        font-size: @font-size-normal;
        text-decoration: none;
        color: @font-color-normal;
        i {
          float: right;
          line-height: @line-height-normal;
        }
      }
    }
    li:last-child {
      border-bottom: 1px solid @border-color-normal;
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
  .mint-popup-center {
    border-radius: 8px;
    padding: 10px;
    label {
      line-height: 32px;
    }
    i {
       display: block;
       width: 32px;
       height: 32px;
       line-height: 32px;
       text-align: center;
       float: right;
    }
    textarea {
      font-size: @font-size-normal;
      width: 280px;
      height: 80px;
      margin: 0;
      padding: 0;
      border: none;
      margin-top: 10px;
    }
  }
  .nav-sub {
    .nav-sub-btn.pull-right {
      font-size: @font-size-small;
      width: 96px;
    }
    .nav-sub-btn.pull-left {
      width: 80px;
      text-align:left;
      padding-left: 16px;
    }
  }
  .imgs img{
  	width:25px;
  	position: absolute;
    margin-top: -2px;
    padding: 0 10px;
  }
</style>
