/**
 * Created by youmc on 2017/1/16.
 */

import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import modules from './modules'

Vue.use(Vuex)


const store = new Vuex.Store({
  modules: modules,
  plugins: [createLogger()],
  strict: process.env.NODE_ENV !== 'production'
})

if (module.hot) {
  module.hot.accept(['./modules'], () => {
    const newMutations = require('./modules').default
    store.hotUpdate({
      mutations: newMutations
    })
  })
}

export default store
