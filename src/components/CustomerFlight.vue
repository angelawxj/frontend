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
          <li v-for="item in state.data">
            <ul class="clearfix">
              <li>
                <span>航班号:</span>
                <span>{{ item.flightNumber }}</span>
              </li>
              <li>
                <span>日期:</span>
                <span>{{ item.flightDate }}</span>
              </li>
              <li>
                <span>舱位:</span>
                <span>{{ item.flightSeat }}</span>
              </li>
              <li>
                <span>始发地:</span>
                <span>{{ item.flightOrigin }}</span>
              </li>
              <li>
                <span>到达地:</span>
                <span>{{ item.flightDest }}</span>
              </li>
              <li>
                <span>使用服务:</span>
                <span>{{ item.product }}</span>
              </li>
            </ul>
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
  name: 'customerFlight',
  components: {
    PullTo
  },
  data() {
    return {
      iconLink: ''
    };
  },
  methods: {
    refresh(loaded) {
      this.refreshCustomerFlight({
        loaded: loaded,
        params: null
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
      'refreshCustomerFlight'
    ])
  },
  computed: {
    ...mapState({
      state: function (state) {
        return {
          data: state.customer.flight
        }
      }
    })
  },
  beforeMount () {
    this.refreshCustomerFlight({
      loaded: null,
      params: null
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
    border-top: 1px solid @border-color-normal;
    padding: 10px 0;
    padding-right: 20px;
    ul {
      li {
        border-top: none;
        border-bottom: none;
        line-height: 26px;
        font-size: @font-size-normal;
        width: 46%;
        float: left;
        padding: 0;
        margin-left: 3%;
        span:first-child {
          color: @font-color-gray;
        }
        span:last-child {
          color: @font-color-normal;
        }
      }
    }
  }
  .list li:nth-child(even) {
    background-color: white;
  }
  .list>li:last-child {
    border-bottom: 1px solid #eee;
  }
</style>
