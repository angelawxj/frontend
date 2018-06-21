<template>
  <div>
    <pull-to
      :top-load-method="refresh"
      :bottom-load-method="loadmore"
      @top-state-change="stateChange"
      @bottom-state-change="stateChange">
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
        	<img :src= "item.img_url">
          <p>
            <label>{{ item.name }}</label>
            <span>作者：{{item.author}}</span>
          </p>
          <a class="star"  :class="{redstar: arr.indexOf(index) !== -1}" @click="Delete(index,item.id)" :data-select ="isselect">
        		<i class="fa fa-trash-o fa-lg"></i>
      		</a>
      		<div>
					 <textarea rows="10" v-model="text"></textarea>
					 <file-reader @load="text = $event"></file-reader>
					</div>
        </li>
      </ul>
      <template slot="bottom-block" slot-scope="props">
        <div class="bottom-load-wrapper">
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
    </pull-to>
  </div>
</template>

<script>
import PullTo from 'vue-pull-to'
import TaskProgress from '@/components/TaskProgress'
import FileReader from '@/components/FileReader';
import {mapState, mapActions} from 'vuex'
import { MessageBox, Toast } from 'mint-ui'
import { Indicator } from 'mint-ui'



export default {
  name: 'task',
  components: {
    PullTo,
    TaskProgress,
    FileReader
  },
  data() {
    return {
      dataList: [{
        name: '李三',
        age: 24,
        gender: true,
        progress: 1,
        
      }, {
        name: '张晓',
        age: 21,
        gender: false,
        progress: 2
      }],
      iconLink: '',
      index:'0',
      isActive:'',
      isselect:0,
      arr:[],
      text: ""
    };
  },
  methods: {
    refresh(loaded) {
     	this.refreshStar({
      	params: '',
      	loaded: null
    	});
    },
   
    Delete(index,id){
    	
    	 MessageBox({
        title: '提示',
        message: '确定删除吗？',
        showCancelButton: true,
        confirmButtonText: '是',
        cancelButtonText: '否',
        confirmButtonHighlight: false
      }).then((action) => {
      	Indicator.open({
				  text: '加载中',
				  spinnerType: 'fading-circle'
				});
        this.deleteStar({
      		id: id,
      		refresh:this.refresh,
      		loaded: null
    		});
      })
    	
    },
    loadmore(loaded) {
      this.loadMoreTask({
        params: null,
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
    ...mapActions([
      'loadMoreTask',
      'refreshTask',
      'refreshStar',
      'deleteStar'
    ])
  },
  computed: {
    ...mapState({
      state: function (state) {
        return {
          data: state.task.star
        }
      }
      
    })
    
  },
  beforeMount () {
    this.refreshStar({
      params: '',
      loaded: null
    });
  }
}
</script>

<style scoped rel="stylesheet/less" lang="less">
  @import "../less/vue-pull-to.less";
  @import "../less/common.less";
  .img{
  	padding: 30px;
  }

  .list li {
    overflow: hidden;
    height: auto;
    line-height: 12px;
    border-top: 1px solid #eee;
    padding: 10px;
    position: relative;
    .star{
  		position: absolute;
      height: 0;
      right: 15px;
      bottom: 25px;
      
  	}
  	.redstar{
  		position: absolute;
      height: 0;
      right: 15px;
      bottom: 25px;
     
  	}
    img{
    	float: left;
    	width: 150px;
    }
    .author{
    	font-size: 14px;
    }
    p {
	    color: #333;
	    line-height: 21px;
	    display: inline-block;
	    padding-top: 20px;
	    width: 50%;
	    label{
	    	display: block;
	    	padding: 15px;
	    	font-size: 16px;
	    };
	    span{
	    	display: block;
	    	padding: 15px;
	    }
    }
    .task-progress {
      margin-top: 15px;
    }
    .fa-male, .fa-female {
      color: lightGray;
      font-size: 18px;
    }
  }
  .list li:nth-child(even) {
    background-color: white;
  }
  .list li:last-child {
    border-bottom: 1px solid #eee;
  }
  .router-view-search-customer-detail {
    position: absolute;
    top: 0;
    bottom: 0;
    display:block;
    width: 100%;
    overflow: hidden;
    background-color: white;
  }
</style>
