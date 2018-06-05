<template>
  <div>
  	<div class="nav-sub theme-bgc clearfix">
      {{ $route.name }}
      <a class="nav-sub-btn pull-left" @click="$router.go(-1)">
        <i class="fa fa-chevron-left"></i>
      </a>
      <a @click="customerManagerAdd" class="nav-sub-btn pull-right" >
      	<i class="fa fa-plus"></i>
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
        <li v-for="(item,index) in state.data">
         <dl class="clearfix" @click="expand(index)">
           <dt>{{ item.department }}</dt>
           <dd>
             <i :class="index == itemIndex ? 'fa fa-caret-down fa-lg' : 'fa fa-caret-up fa-lg'"></i>
           </dd>
         </dl>
         <ul v-if="index == itemIndex">
           <li v-for="subItem in item.listDepartment" @click="check(subItem.dep_id)">
             <dl class="clearfix faStyle">
               <dt>
                 <label>{{ subItem.dep_user_name }}</label>
                 <label>{{ subItem.position }}</label>
               </dt>
               <i v-show="subItem.checked ? true : false" class="fa fa-check-circle" style="float: right;margin-right: 12px;"></i> 
             	 <i v-show="subItem.checked ? false : true" class="fa fa-circle-thin"></i>
             </dl>
           </li>
         </ul>
        </li>
      </ul>
    </pull-to>
  </div>
    <a class="submit" @click="release()">
     	注销客户经理
    </a>
     <router-view class="router-view-other-customerManager" />
  </div>
  
</template>

<script>
import PullTo from 'vue-pull-to'
import {mapState, mapActions, mapGetters} from 'vuex'
import { Toast } from 'mint-ui'
import { Indicator } from 'mint-ui'
import sa from'sa-sdk-javascript'

export default {
  name: 'customerManager',
  components: {
    PullTo
  },
  route: {
    canReuse: false,
  },
  data() {
    return {
      iconLink: '',
      itemIndex: 0
    };
  },
  methods: {
  	customerManagerAdd() {
  		this.$router.push('/other/customerManager/customerManagerAdd')
			sa.track('importButtonClick', {
        AppOfButton: '尊鹏之音',
        AppId:'11646658',
        loginId:Login_cd,
        PageOfButton: '客户经理管理',
        firstModel: '功能管理',
        secondModel: '',
        buttonName:'新建客户经理',
        buttonID:'',
	    });
  	},
  	release(){
  		sa.track('importButtonClick', {
        AppOfButton: '尊鹏之音',
        AppId:'11646658',
        loginId:Login_cd,
        PageOfButton: '客户经理管理',
        firstModel: '功能管理',
        secondModel: '',
        buttonName:'注销客户经理',
        buttonID:'',
	    });
  		let id =null
  		for(let i = 0; i < this.state.data.length; i++) {
  			let record = this.state.data[i]
  			for(let j = 0; j < record.listDepartment.length; j++) {
					if(record.listDepartment[j].checked){
	    				id = record.listDepartment[j].login_cd
		    		}
  			}	
    	}
  		if(id){
  			this.releaseCustomerMgt({
  				params: {
	        	loginCd: id,
	       },
	       router : this.$router
  			})
  		}else{
  			Toast({
            message: '请选择客户经理',
            position: 'bottom',
            duration: 2000
         })
  		}
  	},
    expand(index) {
      if(this.itemIndex == index) {
        this.itemIndex = -1;
      } else {
        this.itemIndex = index
      }
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
     refresh(loaded) {
       this.refreshCustomerMgt({
	     	params: {
	        	login_cd: Login_cd
	        },
	      loaded: loaded
    })
    },
    check(id) {
   		this.setCustomerMgtChecked(id);
    },
    ...mapActions([
      'loadMoreCustomer',
      'refreshCustomerMgt',
      'setCustomerID',
      'setCustomerMgtChecked',
      'releaseCustomerMgt'
    ])
  },
  computed: {
    ...mapState({
      state: function (state) {
        return {
          id: state.customer.customerID,
          data: state.customer.data
        }
      }
     
    }),
    ...mapGetters([
      'customer'
    ])
  },
  beforeMount () {
  	sa.init({
			server_url: urlmai, 
		});
		sa.login(Login_cd);
		sa.quick('autoTrack');
		
  	Indicator.open({
			  text: '加载中',
			  spinnerType: 'fading-circle'
			});
    this.refreshCustomerMgt({
     	params: {
        	login_cd: Login_cd
        },
      loaded: null
    })
    console.log('$route.path', this.$route.path)
  },
   watch: {
      '$route' (to,from) {
        if(to.path == '/other/customerManager'){
        	this.refreshCustomerMgt({
			     	params: {
			        	login_cd: Login_cd
			        },
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
  padding-left: 0;
  height: auto;
  line-height: @line-height-normal;
}
.list{margin-top: 0px;
			margin-bottom: 44px;
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
.list {
  >li {
    border-bottom: 1px solid #ccc;
    >dl {
      padding: 0 10px;
      background-color: white;
      dt {
        width: 50%;
        height: 100%;
        float: left;
        font-size: @font-size-normal;
        color: @font-color-normal;
        height: 36px;
        line-height: 36px;
      }
      dd {
        width: 50%;
        height: 100%;
        line-height: 36px;
        float:left;
        text-align: right;
        i {
          margin-right: 12px;
          color: #e60000;
          line-height: 36px;
        }
      }
    }
    >ul {
      >li {
        background-color: #eee;
        height: 60px;
        >dl {
          padding: 10px;
          dt {
            width: 50%;
            float: left;
            label {
              display: block;
            }
            label:first-child {
              font-size: @font-size-normal;
              color: @font-color-normal;
            }
            label:last-child {
              font-size: @font-size-small;
              color: @font-color-gray;
            }
          }
          dd {
            width: 50%;
            float: left;
            text-align: right;
            a {
              display: inline-block;
              width: 40px;
              height: 40px;
              text-align: center;
              i {
                line-height: 40px;
                color: @font-color-gray;
              }
            }
          }
        }
      }
      >li:before {
        display: block;
        content: ' ';
        height: 1px;
        background-color: #ccc;
        margin-left: 10px;
      }
      >li:first-child:before {
        margin-left: 0;
      }
    }
  }
}
.router-view-other-customerManager {
    position: absolute;
    top: 0;
    bottom: 0;
    display:block;
    width: 100%;
    overflow: hidden;
    background-color: white;
  }
.faStyle i{
		float: right;
		margin-right: 12px;
		line-height: 36px;
}
</style>
