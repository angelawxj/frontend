<template>
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
           <li v-for="subItem in item.listDepartment">
             <dl class="clearfix">
               <dt>
                 <label>{{ subItem.dep_user_name }}</label>
                 <label>{{ subItem.position }}</label>
               </dt>
               <dd data-tel = "">
                 <a href="javascript:void(0)" @click="record(subItem.tel)">
                   <i class="fa fa-comment fa-lg"></i>
                 </a>
                 <a href="javascript:void(0)" @click="call(subItem.tel)">
                   <i class="fa fa-phone fa-lg"></i>
                 </a>
               </dd>
             </dl>
           </li>
         </ul>
        </li>
      </ul>
   </pull-to>
</template>
<script>
import PullTo from 'vue-pull-to'
import {mapState, mapActions, mapGetters} from 'vuex'
import { MessageBox, Toast } from 'mint-ui'
import { Indicator } from 'mint-ui'
export default {
  name: 'contactInternal',
  components: {
    PullTo
  },
  data() {
    return {
      iconLink: '',
      itemIndex: 0
    };
  },
  methods: {
    expand(index) {
      if(this.itemIndex == index) {
        this.itemIndex = -1;
      } else {
        this.itemIndex = index
      }
    },
    refresh(loaded) {
      this.refreshContactInternal({
	      params: {"login_cd":Login_cd},
	      loaded: loaded
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
    record(tel){
    	uexSMS.open(tel, '');
    },
    call(tel){
    	uexCall.dial(tel);
    },
     expand(index) {
      if(this.itemIndex == index) {
        this.itemIndex = -1;
      } else {
        this.itemIndex = index
      }
    },
    ...mapActions([
      'refreshContactInternal',
      'loadMoreContactInternal'
    ])
  },
  computed: {
    ...mapState({
      state: function (state) {
        return {
          data: state.contactInternal.data
        }
      }
    })
  },
  beforeMount () {
  	Indicator.open({
	  text: '加载中',
	  spinnerType: 'fading-circle'
	});
    this.refreshContactInternal({
      params: {"login_cd":Login_cd},
      loaded: null
    })
  }
}
</script>

<style scoped rel="stylesheet/less" lang="less">
@import "../less/vue-pull-to.less";
@import "../less/common.less";
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
.full-screen{
	position: absolute;
	top:44px !important;
	}
</style>
