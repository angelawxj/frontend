<template>
  <div>
    <div class="nav-sub clearfix">
      {{ $route.name }}
      <a class="nav-sub-btn pull-left" @click="goBack">
        <i class="fa fa-chevron-left"></i>
      </a>
      <a class="nav-sub-btn pull-right" @click="addMessage">
        <i v-show="addLink" class="fa fa-plus"></i>
      </a>
    </div>
    <div class="pull-to-wrap">
      <pull-to
        :top-load-method="refresh"
        @top-state-change="stateChange">
        <template slot="top-block" slot-scope="props">
          <div class="top-load-wrapper">
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
        <ul class="list">
          <li v-for="item in state.data"  @click="edit(item.temp_id)">
            <mt-cell-swipe
              :right="[
                {
                  content: '删除',
                  style: { background: '#e60000', color: '#fff' },
                  handler: ()=>removeMessageFun(item.temp_id,item.temp_name,item.temp_content)
                }
              ]">
              <div class="wrap" slot="title">
                <span>{{ item.temp_name }}</span>
                <p>{{ item.temp_content }}</p>
              </div>
            </mt-cell-swipe>
          </li>
        </ul>
      </pull-to>
    </div>
    <router-view class="router-view-search-message" />
  </div>
</template>

<script>
import PullTo from 'vue-pull-to'
import {mapState, mapActions} from 'vuex'
import { MessageBox, Toast } from 'mint-ui'
import { Indicator } from 'mint-ui'
import sa from'sa-sdk-javascript';

export default {
  name: 'message',
  components: {
    PullTo
  },
  data() {
    return {
      iconLink: '',
      addLink: false
    }
  },
  methods: {
    edit(id) {
    	sa.track('importButtonClick', {
        AppOfButton: '尊鹏之音',
        AppId:'11646658',
        loginId:Login_cd,
        PageOfButton: '短信模版',
        firstModel: '',
        secondModel: '',
        buttonName:'模版编辑',
        buttonID:'',
	    });
      this.setMessage(id)
      this.$router.push({
        path: '/search/message/send',
        query: {
          fromMessage: true,
          fromCustomer: this.$route.query.fromCustomer,
          tel:this.$route.query.tel
        }
      })
    },
    removeMessageFun(id,title,content) {
    	var vm = this;
      MessageBox({
        title: '提示',
        message: '确定删除吗？',
        showCancelButton: true,
        confirmButtonText: '是',
        cancelButtonText: '否',
        confirmButtonHighlight: false
      }).then((action) => {
        if(action == 'confirm') {
         	let record = {}
		      record.temp_id = id
		      record.temp_name = title
		      record.temp_content = content
		      record.login_cd = Login_cd 
		      record.vaild = '1'
		      record.type = 'edit'
		      this.removeMessage({
		        params: record,
		         router: this.$router,
		         refresh: this.refresh
		      });
		       ;
		      
        } 
      })
    },
    goBack() {
      this.$router.go(-1)
    },
    refresh(loaded) {
       this.refreshMessage({
        params: {"login_cd": Login_cd},
        loaded: loaded,
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
    addMessage() {
    	sa.track('importButtonClick', {
        AppOfButton: '尊鹏之音',
        AppId:'11646658',
        loginId:Login_cd,
        PageOfButton: '短信模版',
        firstModel: '',
        secondModel: '',
        buttonName:'添加编辑',
        buttonID:'',
	    });
      this.$router.push('/search/message/send')
    },
    ...mapActions([
      'refreshMessage',
      'removeMessage',
      'setMessage'
    ])
  },
  computed: {
    ...mapState({
      state: function (state) {
        return {
          data: state.message.data
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
		
    if(!this.$route.query.fromCustomer) {
      this.addLink = true
    }
    if(this.state.data.length == 0) {
    	Indicator.open({
			  text: '加载中',
			  spinnerType: 'fading-circle'
			});
      this.refreshMessage({
        params: {"login_cd": Login_cd},
        loaded: null
      })
  	}
  },
   watch: {
      '$route' (to,from) {
        if(to.path == '/search/message'){
		      this.refreshMessage({
		        params: {"login_cd": Login_cd},
		        loaded: null
		      });
        }
      }
    }
}
</script>

<style scoped rel="stylesheet/less" lang="less">
  @import "../less/vue-pull-to.less";
  @import "../less/common.less";
  .list li {
    overflow: hidden;
    height: auto;
    line-height: 12px;
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
        font-size: @font-size-small;
        color: @font-color-gray;
      }
    }
  }
  .list li:nth-child(even) {
    background-color: white;
  }
  .list li:last-child {

  }
  .router-view-search-message {
    position: absolute;
    top: 0;
    bottom: 0;
    display:block;
    width: 100%;
    overflow: hidden;
    background-color: white;
  }
</style>
