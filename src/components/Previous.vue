<template>
  <div>
    <div class="nav-sub clearfix">
      {{ $route.name }}
      <a class="nav-sub-btn pull-left" @click="$router.go(-1)">
        <i class="fa fa-chevron-left"></i>
      </a>
      <a class="nav-sub-btn pull-right">

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
          <li class="progress">
            本月完成进度
            <mt-progress :value="20" :bar-height="7">
              <div slot="end" style="padding-left: 10px">20%</div>
            </mt-progress>
          </li>
          <li class="sep"></li>
          <li class="progress">
            上月完成进度
            <mt-progress :value="85" :bar-height="7">
              <div slot="end" style="padding-left: 10px">85%</div>
            </mt-progress>
          </li>
          <li class="expand" @click="expand">
            <i :class="['fa', showIndex ? 'fa-angle-up' : 'fa-angle-down']"></i>
          </i>
          <li v-for="item in state.data" v-show="showIndex">
            <dl class="clearfix">
              <dt>{{ item[0] }}</dt>
              <dd>{{ item[1] }}</dd>
            </dl>
          </li>
        </ul>
      </pull-to>
    </div>
  </div>
</template>

<script>
import PullTo from 'vue-pull-to'
import {mapState, mapActions} from 'vuex'

export default {
  name: 'previous',
  components: {
    PullTo
  },
  data() {
    return {
      showIndex: false,
      iconLink: ''
    };
  },
  methods: {
    refresh(loaded) {
      this.previousTask(loaded)
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
    expand() {
      this.showIndex = !this.showIndex
    },
    ...mapActions([
      'previousTask'
    ])
  },
  computed: {
    ...mapState({
      state: function (state) {
        return {
          data: state.task.previous
        }
      }
    })
  },
  beforeMount () {
    this.previousTask(null);
  }
}
</script>

<style scoped rel="stylesheet/less" lang="less">
  @import "../less/vue-pull-to.less";
  @import "../less/common.less";
  .mt-progress .mt-progress-progress {
    background-color: #e60000;
  }
  .list li {
    overflow: hidden;
    height: auto;
    line-height: 12px;
    border-top: 1px solid @border-color-normal;
    padding: 10px;
    padding-right: 20px;
    dt,dd {
      height: 21px;
      line-height: @line-height-normal;
      font-size: @font-size-normal;
    }
    dt {
      color: @font-color-gray;
      float: left;
    }
    dd {
      color: @font-color-normal;
      float: right;
    }
  }
  .list li.expand {
    border-top: none;
  }
  .list li:nth-child(even) {
    background-color: white;
  }
  .list li:last-child {
    border-bottom: 1px solid @border-color-normal;
  }
  .list li.progress {
    font-size: @font-size-normal;
    color: @font-color-normal;
    padding-bottom: 0;
  }
  .list li.sep {
    padding: 0;
    background-color: #f7f7f7;
    height: 5px;
  }
  .list li.expand {
    text-align: center;
    padding: 5px;
    border-bottom: 1px solid @border-color-normal;
    margin-bottom: -1px;
  }
</style>
