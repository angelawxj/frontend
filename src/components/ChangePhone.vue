<template>
  <div>
    <div class="nav-sub clearfix">
      {{ $route.name }}
      <a class="nav-sub-btn pull-left" @click="goBack">
        <i class="fa fa-chevron-left"></i>
      </a>
      <a class="nav-sub-btn pull-right" @click="save">
        
      </a>
    </div>
    <div class="wrap">
    	&nbsp;&nbsp;&nbsp;&nbsp;电话&nbsp;
      <input class="title" type="text" placeholder="请输入新的电话号码" v-model="phone" />
    </div>
    <a class="submit" @click="submit">
	          绑定手机号码
	  </a>
  </div>
</template>

<script>
import {mapState, mapActions, mapGetters} from 'vuex'
import { Toast, MessageBox } from 'mint-ui'
import sa from'sa-sdk-javascript'

export default {
  name: 'changePhone',
  components: {

  },
  data() {
    return {
      phone: ''
    }
  },
  methods: {
  	submit() {
  		sa.track('importButtonClick', {
        AppOfButton: '尊鹏之音',
        AppId:'11646658',
        loginId:Login_cd,
        PageOfButton: '修改手机号',
        firstModel: '功能管理',
        secondModel: '',
        buttonName:'绑定手机号码',
        buttonID:'',
	    });
	    
    	let changePhone= null;
    	changePhone = {}
   		changePhone.login_cd = Login_cd
   		changePhone.bind_phone_num = this.phone
    	this.changePhoneFun({
        params: changePhone,
        loaded: null,
        router : this.$router
      })
    },
    goBack() {
      this.$router.go(-1)
      var vm = this
      setTimeout(() => {
        vm.setMemo(null)
      }, 200)
    },
    save() {
      if(this.title == '') {
        Toast({
          message: '请输入标题',
          position: 'bottom',
          duration: 2000
        })
        return;
      }
      if(this.content == '') {
        Toast({
          message: '请输入内容',
          position: 'bottom',
          duration: 2000
        })
        return;
      }
      let record = {}
      if(this.state.memo) {
        record.id = this.state.memo.id
      }
      record.title = this.title
      record.content = this.content
      let now = new Date()
      record.date = now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + now.getDate()
      console.log('record', record)
      this.saveMemo(record)
    },
    ...mapActions([
      'saveMemo',
      'setMemo',
      'changePhoneFun'
    ])
  },
  computed: {
    ...mapState({
      state: function (state) {
        return {
          memo: state.memo.memo
        }
      }
    })
  },
  beforeMount () {
  	sa.init({
			server_url: urlmai,  
		});
		sa.login(Login_cd);
		sa.quick('autoTrack');
		
    if(this.state.memo != null) {
      this.title = this.state.memo.title
      this.content = this.state.memo.content
    }
  }
}
</script>

<style scoped rel="stylesheet/less" lang="less">
@import "../less/common.less";
.wrap {
  border-bottom: 1px solid #eee;
}
input.title {
  margin-top: 60px;
  width: 80%;
  border: none;
  font-size: @font-size-normal;
}
textarea.content {
  display: block;
  width: 100%;
  border: none;
  height: 200px;
  font-size: @font-size-normal;
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
</style>
