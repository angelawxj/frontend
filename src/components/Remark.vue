<template>
  <div>
    <div class="nav-sub clearfix">
      {{ $route.name }}
      <a class="nav-sub-btn pull-left" @click="goBack">
        <i class="fa fa-chevron-left"></i>
      </a>
      <a class="nav-sub-btn pull-right" @click="add">
        <i class="fa fa-edit"></i>
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
          <li v-for="item in state.data" @click="edit(item.id)">
            <mt-cell-swipe
              :right="[
                {
                  content: '删除',
                  style: { background: '#e60000', color: '#fff', 'line-height': '48px'},
                  handler: ()=>removeRemark(item.id)
                }
              ]">
              <div class="wrap" slot=""title>
                <p :style="{width: (contentWidth + 'px')}">{{ item.date }}&nbsp;&nbsp;<span style="color:#333">{{ item.content }}</span></p>
              </div>
            </mt-cell-swipe>
          </li>
        </ul>
      </pull-to>
    </div>
    <router-view class="router-view-personal-remark" />
  </div>
</template>

<script>
import PullTo from 'vue-pull-to'
import {mapState, mapActions} from 'vuex'

export default {
  name: 'remark',
  components: {
    PullTo
  },
  data() {
    return {
      iconLink: '',
      contentWidth: 0
    }
  },
  methods: {
    add() {
      this.$router.push('/search/customer/detail/remark/edit')
    },
    edit(id) {
      this.setRemark(id)
      this.$router.push('/search/customer/detail/remark/edit')
    },
    goBack() {
      this.$router.go(-1)
    },
    refresh(loaded) {
      this.refreshRemark({
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
      'refreshRemark',
      'setRemark',
      'removeRemark'
    ])
  },
  computed: {
    ...mapState({
      state: function (state) {
        return {
          data: state.remark.data
        }
      }
    })
  },
  beforeMount () {
    this.refreshRemark({
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
      p {
        font-size: @font-size-normal;
        color: @font-color-gray;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        span {
          font-color: @font-color-normal;
        }
      }
    }
  }
  .list li:nth-child(even) {
    background-color: white;
  }
  .list li:last-child {

  }
  .router-view-personal-remark {
    position: absolute;
    top: 0;
    bottom: 0;
    display:block;
    width: 100%;
    overflow: hidden;
    background-color: white;
  }
</style>
