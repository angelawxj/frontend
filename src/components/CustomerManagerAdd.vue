<template>
  <div>
    <div class="nav-sub clearfix">
      {{ $route.name }}
      <a class="nav-sub-btn pull-left" @click="goBack">
        <i class="fa fa-chevron-left"></i>
      </a>
      <a class="nav-sub-btn pull-right" @click="add">
      
      </a>
    </div>
    <div class="content">
		    <p>温馨提示：带“*”的为必填项，所属部门必须填写正确的部门。</p>
		    <ul class="ct-form">
		        <li>
		            <span class="required">*</span>
		            <label>姓名</label>
		            <input type="text" id="dep_user_name" placeholder="请输入姓名" v-model="dep_user_name" />
		        </li>
		        <li>
		            <span class="required">*</span>
		            <label>工号</label>
		            <input type="text" name="loginCd" id="loginCd" placeholder="请输入工号"  v-model="loginCd" />
		        </li>
		        <li>
		            <span class="required">*</span>
		            <label>电话</label>
		            <input type="text" id="tel" placeholder="请输入电话" v-model="tel" />
		        </li>
		        <li>
		            <span>*</span>
		            <label>备注</label>
		            <input type="text" id="dep_comment" placeholder="请输入备注" v-model="dep_comment"/>
		        </li>
		        <li>
		            <span class="required">*</span>
		            <label>所属营业部</label>
		            <input type="text" id="op_cn_name" placeholder="请输入所属营业部" v-model="op_cn_name" />
		        </li>
		        <li class="arrow">
		            <span class="required">*</span>
		            <label>职务</label>
		            <input type="text" placeholder="请选择经理等级" readonly @click="showPopupPicker" :value="type ? type.name : ''" />		    
		        </li>
		    </ul>
		</div>
		 <mt-popup-picker
      ref="popupPicker"
      :dataSource="pickerData"
      @confirm="popupPickerConfirm"
      v-model="currentType"/>
    <a class="submit" @click="submit">
     	新建客户经理
    </a>
    <router-view class="router-view-personal-memo" />
  </div>
</template>

<script>
import PullTo from 'vue-pull-to'
import {mapState, mapActions} from 'vuex'
import MtPopupPicker from '@/components/MtPopupPicker'
import { Toast, MessageBox } from 'mint-ui'
import sa from'sa-sdk-javascript'
const pickerData = [{name: '主任助理'}, {name: '经理'}, {name: '副经理'}, {name: '工贸负责人'}, {name: '大客户经理'}, {name: '工贸主任'}, {name: '大客户组长'}, {name: '场站站长'}, {name: '工贸柜台'}]

export default {
  name: 'customerManagerAdd',
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
      dep_user_name: '',
      loginCd: '',
      tel: '',
      dep_comment: '',
      op_cn_name: '',
      department: '',
      position: ''
    }
  },
  methods: {
  	submit() {
  		sa.track('importButtonClick', {
        AppOfButton: '尊鹏之音',
        AppId:'11646658',
        loginId:Login_cd,
        PageOfButton: '客户经理管理',
        firstModel: '功能管理',
        secondModel: '',
        buttonName:'新建客户经理保存',
        buttonID:'',
	    });
  		if(this.dep_user_name == '') {
        Toast({
          message: '请输入姓名',
          position: 'bottom',
          duration: 2000
        })
        return
      }
      if(this.loginCd == '') {
        Toast({
          message: '请输入工号',
          position: 'bottom',
          duration: 2000
        })
        return;
      }
      if(this.tel == '') {
        Toast({
          message: '请输入电话',
          position: 'bottom',
          duration: 2000
        })
        return;
      }else{
      	var phoneno = /^1[3|4|5|8][0-9]\d{4,8}$/;
			  if(this.tel.match(phoneno)) {}
			  else {
			  	Toast({
	          message: '请输入正确的电话号码',
	          position: 'bottom',
	          duration: 2000
	        })
        	return;
        }
      }
      if(this.op_cn_name == '') {
        Toast({
          message: '请输入所属营业部',
          position: 'bottom',
          duration: 2000
        })
        return;
      }
      if(this.type == null) {
        Toast({
          message: '请选择经理等级',
          position: 'bottom',
          duration: 2000
        })
        return;
      }else{
      }
    	let addCm = null;
    	addCm = {}
   		addCm.dep_user_name = this.dep_user_name
    	addCm.loginCd = this.loginCd
    	addCm.tel = this.tel
    	addCm.dep_comment = this.dep_comment
    	addCm.op_cn_name = this.op_cn_name
    	addCm.svr_type = '1'
    	addCm.position =  '',
      addCm.department ='北京',
    	this.addCustomerMgtSave({
        params: addCm,
        loaded: null,
         router : this.$router
      })
    },
    add() {
      this.$router.push('/personal/memo/edit')
    },
    edit(id) {
      this.setMemo(id)
      this.$router.push('/personal/memo/edit')
    },
    goBack() {
      this.$router.go(-1)
    },
    refresh(loaded) {
      this.refreshMemo({
        params: null,
        loaded: loaded
      })
    },
     showPopupPicker() {
      this.$refs.popupPicker.open()
    },
    popupPickerConfirm() {
      this.type = this.currentType
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
      'refreshMemo',
      'setMemo',
      'removeMemo',
      'addCustomerMgtSave'
    ])
  },
  computed: {
    ...mapState({
      state: function (state) {
        return {
          data: state.memo.data
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
		
    this.refreshMemo({
      params: null,
      loaded: null
    })
  },
  mounted() {
    this.contentWidth = document.documentElement.clientWidth - 20
  }
}
</script>

<style scoped rel="stylesheet/less" lang="less">
  @import "../less/vue-pull-to.less";
  @import "../less/common.less";
  .list li {
    overflow: hidden;
    height: auto;
    line-height: @line-height-normal;
    padding: 0;
    .wrap {
      padding: 10px 0;
      line-height: @line-height-normal;
      span {
        display: block;
        font-size: @font-size-normal;
        color: @font-color-normal;
      }
      p {
        font-size: @font-size-normal;
        color: @font-color-gray;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  .list li:nth-child(even) {
    background-color: white;
  }
  .list li:last-child {

  }
  .router-view-personal-memo {
    position: absolute;
    top: 0;
    bottom: 0;
    display:block;
    width: 100%;
    overflow: hidden;
    background-color: white;
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
  .content{
  	margin-top:44px;
  }
  p {
		padding: 20px 15px;
		color: red;
		font-size: 14px;
	}
	ul.ct-form {
		padding: 0 15px;
	}
	ul.ct-form>li>span.required:first-child {
		color: red;
	}
	ul.ct-form>li>span:first-child {
		color: white;
		margin-left: 10px;
	}
	ul.ct-form>li {
		border-bottom: 1px solid #e6e6e6;
	}
	ul.ct-form>li>input[type=text], ul.ct-form>li>input[type=password] {
		background-color: transparent;
		display: inline-block;
		width: auto;
		min-width: 68%;
		margin-left: 15px;
		height: 44px;
		border: none;
		background-color: tranparent;
		padding: 0;
		margin-bottom: 0;
		margin-left: 15px;
	}
	.v-modal{
		top:44px!important
  }
</style>
