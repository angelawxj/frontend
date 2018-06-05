<template>
  <div class="personal">
    <a @click="showToast">toast</a>
    <a @click="showPopupCenter">popup center</a>
    <a @click="showPopupTop">popup top</a>
    <a @click="showDatePicker">date picker: {{ outputDate }}</a>
    <a @click="showPopupPicker">province: {{ province ? province.name : '' }}</a>
    <a @click="showAlert">alert</a>
    <a @click="showConfirm">confirm</a>
    <a @click="showLoading">loading</a>

    <mt-progress :value="20" :bar-height="5"></mt-progress>
    <mt-popup
      v-model="popupCenter"
      popup-transition="popup-fade"
      position="center">
      popupCenter
    </mt-popup>
    <mt-popup
      v-model="popupTop"
      popup-transition="popup-fade"
      position="top">
      popupTop
    </mt-popup>
    <mt-datetime-picker
      ref="datePicker"
      type="date"
      v-model="currentDate"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      @confirm="datePickerConfirm">
    </mt-datetime-picker>
    <mt-popup-picker
      ref="popupPicker"
      :dataSource="pickerData"
      @confirm="popupPickerConfirm"
      v-model="currentProvince"/>
  </div>
</template>

<script>
import MtPopupPicker from '@/components/MtPopupPicker'
import { Toast, MessageBox, Indicator } from 'mint-ui'
const pickerData = [{name: '福建省'}, {name: '广东省'}]
export default {
  name: 'personal',
  components: {
    MtPopupPicker
  },
  data() {
    return {
      popupCenter: false,
      popupTop: false,
      popupBottom: false,
      currentDate: new Date(),
      date: new Date(),
      currentProvince: pickerData[1],
      province: null,
      pickerData: pickerData
    }
  },
  computed: {
    outputDate() {
      return this.date.getFullYear() + '-' + (this.date.getMonth() + 1) + '-' + this.date.getDate()
    }
  },
  methods: {
    showToast() {
      Toast({
        message: '提示',
        position: 'bottom',
        duration: 5000
      })
    },
    showPopupCenter() {
      this.popupCenter = true
    },
    showPopupTop() {
      this.popupTop = true
    },
    showDatePicker() {
      this.$refs.datePicker.open()
    },
    datePickerConfirm() {
      this.date = this.currentDate;
    },
    showPopupPicker() {
      this.$refs.popupPicker.open()
    },
    popupPickerConfirm() {
      console.log(this.province, this.currentProvince)
      this.province = this.currentProvince
    },
    showAlert() {
      MessageBox.alert('message', 'title').then(action => {
        console.log('alert', action)
      })
    },
    showConfirm() {
      MessageBox.confirm('message', 'title').then(action => {
        console.log('confirm', action)
      })
    },
    showLoading() {
      Indicator.open({
        text: 'Loading...',
        spinnerType: 'fading-circle'
      })
      setTimeout(() => {
        Indicator.close()
      }, 2000)
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
