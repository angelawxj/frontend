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
        <li class="menu">
          <ul>
            <li>
              <a>
                <label>本月目标</label>
                <i class="fa fa-plus" @click="addTarget"></i>
              </a>
            </li>
          </ul>
        </li>
        <li class="progress-wrap" v-for="item in currentTask">
          <p>
            姓名:&nbsp;{{ item.name }}&nbsp;&nbsp;
            年龄&nbsp;:{{ item.age }}&nbsp;&nbsp;
            性别&nbsp;:{{ item.gender }}
          </p>
          <TaskProgress :progress=item.progress @change="(i) => progressChange(item, i)" />
        </li>
        <li class="sep"></li>
        <li class="menu">
          <ul>
            <li>
              <a @click="expand">
                <label>历史未完成</label>
                <i :class="['fa', (showUncomplete ? 'fa-angle-up' : 'fa-angle-down')]"></i>
              </a>
            </li>
          </ul>
        </li>
        <li class="progress-wrap" v-for="item in previousTask" v-show="showUncomplete">
          <p>
            姓名:&nbsp;{{ item.name }}&nbsp;&nbsp;
            年龄&nbsp;:{{ item.age }}&nbsp;&nbsp;
            性别&nbsp;:{{ item.gender }}
          </p>
          <TaskProgress :progress=item.progress />
        </li>
        <li class="sep"></li>
        <li class="menu">
          <ul>
            <li>
              <a href="#/personal/previous">
                <label>历史完成情况</label>
                <i class="fa fa-angle-right"></i>
              </a>
            </li>
            <li>
              <a href="#/personal/memo">
                <label>备忘录</label>
                <i class="fa fa-angle-right"></i>
              </a>
            </li>
          </ul>
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
    <router-view class="router-view-personal" />
  </div>
</template>

<script>
import PullTo from 'vue-pull-to'
import TaskProgress from '@/components/TaskProgress'
import {mapState, mapActions, mapGetters} from 'vuex'

export default {
  name: 'personal',
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
      showUncomplete: false,
      iconLink: ''
    };
  },
  methods: {
    addTarget() {
      this.$router.push({
        path: '/search/customer/select',
        query: {
          fromPersonal: true
        }
      })
    },
    expand() {
      this.showUncomplete = !this.showUncomplete
    },
    refresh(loaded) {
      console.log('pull-down')
      this.refreshTask({
        params: null,
        loaded: loaded
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
    progressChange(item, i) {
      var task = {}
      task.id = item.id
      task.name = item.name
      task.age = item.age
      task.gender = item.gender
      task.level = item.level
      task.progress = i
      task.current = item.current
      this.saveTask(task)
    },
    ...mapActions([
      'loadMoreTask',
      'refreshTask',
      'saveTask'
    ])
  },
  computed: {
    ...mapState({
      state: function (state) {
        return {
          data: state.task.data
        }
      }
    }),
    ...mapGetters([
      'currentTask',
      'previousTask'
    ])
  },
  beforeMount () {
    if(this.previousTask.length == 0) {
      this.refreshTask({
        params: null,
        loaded: null
      });
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
    border-top: 1px solid @border-color-normal;
    padding: 10px;
    p {
      color: @font-color-normal;
      font-size: @font-size-normal;
      line-height: @line-height-normal;
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
    border-bottom: 1px solid @border-color-normal;
  }
  .list li.progress-wrap {
    border-top: none;
    border-bottom: 1px solid @border-color-normal;
  }
  .list li.progress {
    font-size: @font-size-normal;
    color: @font-color-normal;
    padding-bottom: 0;
  }
  .list li.menu {
    border-top: none;
    border-bottom: none;
    padding: 0;
    li {
      border-top: 1px solid @border-color-normal;
      padding: 0;
      a {
        padding: 10px;
        padding-right: 15px;
        display: block;
        line-height: @line-height-normal;
        font-size: @font-size-normal;
        i {
          float: right;
          line-height: @line-height-normal;
        }
        i.fa.fa-plus {
          width: 32px;
          height: 32px;
          line-height: 32px;
          margin-right: -14px;
          margin-top: -5px;
        }
        .fa-plus:before {
          margin-left: 10px;
        }
      }
    }
    li:last-child {
      border-bottom: 1px solid @border-color-normal;
    }
  }
  .list li.sep {
    padding: 0;
    background-color: #f7f7f7;
    height: 5px;
    border: none;
  }
  .router-view-personal {
    position: absolute;
    top: 0;
    bottom: 0;
    display:block;
    width: 100%;
    overflow: hidden;
    background-color: white;
  }
</style>
