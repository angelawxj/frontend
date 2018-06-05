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
      <input class="title" type="text" placeholder="请输入标题" v-model="title" />
      <textarea class="content" placeholder="请输入内容" v-model="content" ></textarea>
    </div>
    <ul class="buttons">
      <li>
        <a @click="save">
          保存为模板
        </a>
      </li>
      <li>
        <a @click="send">
          发送
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import { Toast, MessageBox } from 'mint-ui'
import sa from'sa-sdk-javascript';

export default {
  name: 'MessageSend',
  components: {

  },
  data() {
    return {
      title: '',
      content: ''
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
      var vm = this
      setTimeout(() => {
        vm.setMessage(null)
      }, 200)
    },
    save() {
    	sa.track('importButtonClick', {
        AppOfButton: '尊鹏之音',
        AppId:'11646658',
        loginId:Login_cd,
        PageOfButton: '发送短信',
        firstModel: '短信模版',
        secondModel: '',
        buttonName:'保存为模版',
        buttonID:'',
	    });
      if(this.title == '') {
        Toast({
          message: '请输入标题',
          position: 'bottom',
          duration: 2000
        })
        return
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
      if(this.state.message) {
        record.temp_id = this.state.message.temp_id
      }
      record.temp_name = this.title
      record.temp_content = this.content
      record.login_cd = Login_cd 
       record.vaild = '0'
       
//      let now = new Date()
//      record.date = now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + now.getDate()
//      console.log('record', record)
			if(this.$route.query.fromMessage) {
				record.type = 'edit'
			}else{
				record.type = 'insert'
			}
      this.saveMessage({
        params: record,
        router: this.$router,
      })
    },
    send() {
    	sa.track('importButtonClick', {
        AppOfButton: '尊鹏之音',
        AppId:'11646658',
        loginId:Login_cd,
        PageOfButton: '发送短信',
        firstModel: '短信模版',
        secondModel: '',
        buttonName:'发送短信',
        buttonID:'',
	    });
	    
      if(this.title == '') {
        Toast({
          message: '请输入标题',
          position: 'bottom',
          duration: 2000
        })
        return
      }
      if(this.content == '') {
        Toast({
          message: '请输入内容',
          position: 'bottom',
          duration: 2000
        })
        return;
      }
      if(this.$route.query.fromCustomer) {
				var selectionTel = this.$route.query.tel;
				Toast({
            message: '功能维护中',
            position: 'bottom',
            duration: 2000
          })
//				this.sendMessage({
//		      params: {'listNum':selectionTel,'templete':this.content},
//		      loaded: null,
//		      router: this.$router
//		    })
      } else {
        this.$router.push({
	        path: '/search/customer/select'
	      })
        window.localStorage.setItem('content',this.content);
      }
    },
    ...mapActions([
      'saveMessage',
      'setMessage',
      'sendMessage'
    ])
  },
  computed: {
    ...mapState({
      state: function (state) {
        return {
          message: state.message.message
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
		
    if(this.state.message != null) {
      this.title = this.state.message.temp_name
      this.content = this.state.message.temp_content
    }
  }
}
</script>

<style scoped rel="stylesheet/less" lang="less">
@import "../less/common.less";
.wrap {
  margin-right: 20px;
}
input.title {
  margin-top: 54px;
  display: block;
  width: 100%;
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
</style>
