// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'

import { Popup, Progress, DatetimePicker, Picker, CellSwipe, Button, Field, IndexList, IndexSection, Badge, Navbar, TabItem } from 'mint-ui'

import 'font-awesome/css/font-awesome.css'
import "./assets/vue-pull-to/iconfont"
import './less/common.less'

Vue.component(Popup.name, Popup)
Vue.component(Progress.name, Progress)
Vue.component(DatetimePicker.name, DatetimePicker)
Vue.component(Picker.name, Picker)
Vue.component(CellSwipe.name, CellSwipe)
Vue.component(Button.name, Button)
Vue.component(Field.name, Field);
Vue.component(IndexList.name, IndexList);
Vue.component(IndexSection.name, IndexSection);
Vue.component(Badge.name, Badge);
Vue.component(Navbar.name, Navbar);
Vue.component(TabItem.name, TabItem);

// import axios from 'axios'
// Vue.prototype.$http = axios

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  store,
  router,
  el: '#app',
  template: '<App/>',
  components: { App },
  watch: {
    '$route': function (dest, from) {
      //console.log('dest', dest)
    },
    watch: {
	  '$route' (to, from) {
	      console.log(to);
	      console.log(from);
	  },
},
  }
})
