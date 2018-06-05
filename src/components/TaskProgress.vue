<template>
  <div class="task-progress clearfix">
      <dl :class="this.progress >= 1 ? 'active' : ''" @click="valueChange(1)">
          <dt></dt>
          <dd>短信介绍</dd>
      </dl>
      <dl :class="this.progress >= 2 ? 'active' : ''" @click="valueChange(2)">
          <dt></dt>
          <dd>机场会面</dd>
      </dl>
      <dl :class="this.progress >= 3 ? 'active' : ''" @click="valueChange(3)">
          <dt></dt>
          <dd>办公室会面</dd>
      </dl>
      <dl :class="this.progress >= 4 ? 'active' : ''" @click="valueChange(4)">
          <dt></dt>
          <dd>非正式场合交流</dd>
      </dl>
  </div>
</template>

<script>
export default {
  name: 'taskProgress',
  props: ['progress'],
  data() {
    return {

    }
  },
  methods: {
    valueChange(i) {
      this.$emit('change', i)
    }
  }
}
</script>

<style scoped rel="stylesheet/less" lang="less">
@import "../less/common.less";
.task-progress {
    width: 280px;
    text-align: center;
    margin-top: 8px;
    dl {
        float: left;
        margin-top: -9px;
        margin-left: 10px;
        dt {
          display: inline-block;
          width: 12px;
          height: 12px;
          border: 2px solid lightgray;
          border-radius: 8px;
          background-color: white;
        }
        dd {
          display: block;
          font-size: @font-size-small;
          margin-top: 5px;
          color: @font-color-gray;
        }
    }
    dl:first-child {
      margin-left: 0;
    }
    dl.active {
      dt {
        background-color: limegreen;
      }
      dd {
        color: @font-color-normal;
      }
    }
}
div.task-progress:before {
    display: block;
    height: 2px;
    background-color: lightgray;
    margin-left: 30px;
}
</style>
