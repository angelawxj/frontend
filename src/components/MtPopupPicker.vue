<template>
  <mt-popup
    class="popup-picker"
    v-model="popupBottom"
    popup-transition="popup-fade"
    position="bottom">
    <div class="picker-toolbar">
      <span class="mint-datetime-action mint-datetime-cancel" @click="closePopupPicker">取消</span>
      <span class="mint-datetime-action mint-datetime-confirm" @click="confirmPopupPicker">确定</span>
    </div>
    <mt-picker ref="popupPicker" @change="onValuesChange" :slots="slots" value-key="name"></mt-picker>
  </mt-popup>
</template>

<script>
export default {
  name: 'mtPopupPicker',
  props: {
    dataSource: {
      type: Array,
      default: []
    },
    value: {
      type: Object
    }
  },
  data() {
    return {
      popupBottom: false,
      slots: [{
        flex: 1,
        values: this.dataSource,
        className: 'slot',
        textAlign: 'center'
      }]
    }
  },
  watch: {
    dataSource(val) {
      this.slots.values = val
    }
  },
  computed: {
    outputDate() {
      return this.date.getFullYear() + '-' + (this.date.getMonth() + 1) + '-' + this.date.getDate();
    }
  },
  methods: {
    open() {
      console.log('this.value', this.value);
      if(this.value) {
        this.$refs.popupPicker.setSlotValue(0, this.value)
      } else {
        if(this.dataSource && this.dataSource.length > 0) {
          this.$refs.popupPicker.setSlotValue(0, this.dataSource[0])
        }
      }
      this.popupBottom = true
    },
    onValuesChange(picker, values) {
      if(values[0]) {
        this.$emit('input', values[0])
      }
    },
    closePopupPicker() {
      this.popupBottom = false
    },
    confirmPopupPicker() {
      this.popupBottom = false
      this.$emit('confirm')
    }
  }
}
</script>

<style scoped rel="stylesheet/less" lang="less">
.popup-picker {
  width: 100%;
  .picker-toolbar {
    border-bottom: solid 1px #eaeaea;
  }
}
</style>
