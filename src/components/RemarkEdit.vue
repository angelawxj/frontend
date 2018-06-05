<template>
  <div>
    <div class="nav-sub clearfix">
      {{ $route.name }}
      <a class="nav-sub-btn pull-left" @click="goBack">
        <i class="fa fa-chevron-left"></i>
      </a>
      <a class="nav-sub-btn pull-right">

      </a>
    </div>
    <div class="wrap">
      <textarea class="content" placeholder="请输入内容" v-model="content" ></textarea>
    </div>
    <a class="save" @click="save">保存</a>
  </div>
</template>

<script>
import {mapState, mapActions, mapGetters} from 'vuex'
import { Toast, MessageBox } from 'mint-ui'
export default {
  name: 'remarkEdit',
  components: {

  },
  data() {
    return {
      title: '',
      content: ''
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
      var vm = this
      setTimeout(() => {
        vm.setRemark(null)
      }, 200)
    },
    save() {
      if(this.content == '') {
        Toast({
          message: '请输入内容',
          position: 'bottom',
          duration: 2000
        })
        return;
      }
      let record = {}
      if(this.state.remark) {
        record.id = this.state.remark.id
      }
      record.content = this.content
      let now = new Date()
      record.date = now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + now.getDate()
      this.saveRemark(record)
    },
    ...mapActions([
      'saveRemark',
      'setRemark'
    ])
  },
  computed: {
    ...mapState({
      state: function (state) {
        return {
          remark: state.remark.remark,
        }
      }
    })
  },
  beforeMount () {
    if(this.state.remark != null) {
      this.content = this.state.remark.content
    }
  }
}
</script>

<style scoped rel="stylesheet/less" lang="less">
@import "../less/common.less";
.wrap {
  margin-right: 20px;
  margin-top: 44px;
}
input.title {
  margin-top: 54px;
  display: block;
  width: 100%;
  border: none;
  font-size: @font-size-normal;
}
textarea.content {
  display: block;
  width: 100%;
  border: none;
  height: 200px;
  font-size: @font-size-normal;
}
.save {
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: @color-theme-2;
  height: 44px;
  line-height: 44px;
  color: white;
  font-size: @font-size-normal;
  text-align: center;
}
</style>
