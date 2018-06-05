<template>
  <div>
    <ul class="clearfix">
      <li>
        <a :class="[linkIndex == 0 ? 'active' : '']" @click="linkTo(0)">
          <i class="fa fa-clock-o fa-2x" @click="contactRecord(0)"></i>
          <p>通话记录</p>
        </a>
      </li>
      <li>
        <a  :class="[linkIndex == 1 ? 'active' : '']" @click="linkTo(1)">
          <i class="fa fa-user fa-lg" @click="contactInternal(1)"></i>
          <p>内部通讯</p>
        </a>
      </li>
    </ul>
    <router-view/>
  </div>
</template>

<script>
import { Indicator } from 'mint-ui'
export default {
  name: 'contact',
  data() {
    return {
      linkIndex: 0
    }
  },
  methods: {
    linkTo(index) {
//    this.linkIndex = index
    },
    contactRecord(index){
			this.$router.push('/contact/records')
			this.linkIndex = index
		},
		contactInternal(index){
			this.$router.push('/contact/internal')
			this.linkIndex = index
		},
  }
}
</script>

<style scoped rel="stylesheet/less" lang="less">
@import "../less/common.less";
ul{
  position: absolute;
  z-index: 8;
  bottom: 0;
  width: 100%;
  height: 49px;
  border-top: 1px solid @border-color-normal;
  background-color: white;
  li{
    float: left;
    width: 50%;
    height: 100%;
    a {
      display: block;
      text-decoration: none;
      text-align: center;
      i {
        margin-top: 4px;
        display: inline-block;
        text-align: center;
        width: 24px;
        height: 24px;
        line-height: 24px;
        background-color: transparent;
        color: @font-color-gray;
        border: @border-color-normal;
        border-radius: 13px;
      }
      i.fa-clock-o {
        border: 1px solid transparent;
      }
      p {
        font-size: @font-size-small;
        line-height: @line-height-normal;
        color: @font-color-gray;
      }
    }
    a.active {
      i {
        border: 1px solid red;
        color: @font-color-white;
        background-color: red;
      }
      i.fa-clock-o {
        color: red;
        background-color: white;
      }
      p {
        color: red;
      }
    }
  }
}
</style>
