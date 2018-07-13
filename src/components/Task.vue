<template>
	
  <div>
      <div class="search">
     		<input type="text" class="head" v-model="searchText">
     		<i class="fa fa-search" @click="search"></i>
     	</div>
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
        <li v-for="(item,index) in state.data" @click="reader">
        	<img :src= "item.img_url">
          <p>
            <label>{{ item.name }}</label>
            <span>作者：{{item.author}}</span>
          </p>
          <a class="star"  :class="{redstar: (arr.indexOf(index) !== -1) || (item.heart == '1')}" @click="star(index,item.id, item.name, item.author,item.img_url)" :data-select ="isselect">
        		<i class="fa fa-heart"></i>
      		</a>
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
import {mapState, mapActions} from 'vuex'
import { MessageBox, Toast } from 'mint-ui'

export default {
  name: 'task',
  components: {
    PullTo,
    TaskProgress
  },
  data() {
    return {
      dataList: [{
        name: '李三',
        age: 24,
        gender: true,
        progress: 1
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
      searchText:'',
      currentPage:1,
    };
  },
  methods: {
    refresh(loaded) {
      this.refreshTask({
        params: null,
        loaded: loaded
      })
    },
    reader() {
    	this.$router.push('/search/customer')
    },
    search() {
    	var name = this.searchText;
      this.searchTask({
        params: name,
        loaded: null
      })
    },
    star(index,id,name,author,img){
    	this.arr.push(index)
    	this.addStar({
      	params: {"id":id,"name":name,"author":author,"img_url":img,"heart":'1'},
      	id:id,
      	loaded: null
    	});
    },
    loadmore(loaded) {
    	this.currentPage += 1
      this.loadMoreTask({
        params: this.currentPage,
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
      'addStar',
      'searchTask',
    ])
  },
  computed: {
    ...mapState({
      state: function (state) {
        return {
          data: state.task.data
        }
      }
      
    })
    
  },
  beforeMount () {
    this.refreshTask({
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
  .search{
  	display: block;
  	background: #fff;
  	position: fixed;
  	width:100%;
  	z-index: 100;
  	.head{
	  	width: 80%;
	    margin: 10px;
	    font-size: 14px;
	    line-height: 1.42857143;
	    color: #555;
	    background-color: #fff;
	    border: 1px solid #ccc;
	    border-radius: 4px;
	    box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
	  }
  }
  .list{
  	font-size: 16px;
    padding-top: 53px;
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
      color: #e60000;
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
