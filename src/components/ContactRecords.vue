<template>
  <div>
    <!--<div class="segment">
      <a :class="segmentIndex == 0 ? 'active' : ''" @click="leftClick">
        所有通话
      </a>
      <a :class="segmentIndex == 1 ? 'active' : ''" @click="rightClick">
        未接来电
      </a>
    </div>-->
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
          <li v-for="item in state.data">
            <mt-cell-swipe
              :right="[
                {
                  content: '删除',
                  style: { background: '#e60000', color: '#fff' },
                  handler: remove
                }
              ]">
              <div class="wrap" slot="title">
                <span :class="item.flag ? '' : 'red'">{{ item.phone }}</span>
                <p>{{ item.type }}</p>
              </div>
              <div class="time">{{ item.time }}</div>
            </mt-cell-swipe>
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
  name: 'contactRecords',
  components: {
    PullTo
  },
  data() {
    return {
      segmentIndex: 0,
      iconLink: ''
    }
  },
  methods: {
    leftClick() {
      if(this.segmentIndex == 1) {
        this.refreshContactRecords({
          params: {"login_cd": Login_cd},
          loaded: null
        })
        this.segmentIndex = 0
      }
    },
    rightClick() {
      if(this.segmentIndex == 0) {
        this.getNoanswerContactRecords({
          params: null,
          loaded: null
        })
        this.segmentIndex = 1
      }
    },
    remove() {

    },
    goBack() {
      this.$router.go(-1)
    },
    refresh(loaded) {
      if(this.segmentIndex == 0) {
        this.refreshContactRecords({
		     params: {"login_cd": Login_cd},
		      loaded: loaded
		    })
      } else {
        this.getNoanswerContactRecords({
          params: null,
          loaded: loaded
        })
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
    ...mapActions([
      'refreshContactRecords',
      'getNoanswerContactRecords'
    ])
  },
  computed: {
    ...mapState({
      state: function (state) {
        return {
          data: state.contactRecords.data
        }
      }
    })
  },
  beforeMount () {
    this.refreshContactRecords({
     params: {"login_cd": Login_cd},
      loaded: null
    })
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
      span.red {
        color: @color-theme;
      }
      p {
        font-size: @font-size-small;
        color: @font-color-gray;
      }
    }
    .time {
      font-size: @font-size-normal;
      color: @font-color-gray;
    }
  }
  .list li:nth-child(even) {
    background-color: white;
  }
  .list li:last-child {

  }
  .segment {
    position: absolute;
    top: 0;
    z-index: 9;
    width: 100%;
    height: 43px;
    line-height: 43px;
    border: 1px solid @border-color-normal;
    text-align: center;
    background-color: white;
    a {
      display: inline-block;
      text-decoration: none;
      height: 30px;
      line-height: 30px;
      border: 1px solid @color-theme;
      padding: 0 10px;
      background-color: transparent;
      color: @color-theme;
      font-size: @font-size-normal;
    }
    a.active {
      background-color: @color-theme;
      color: @font-color-white;
    }
    a:first-child {
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
    }
    a:last-child {
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
      margin-left: -4px;
    }
  }
</style>
