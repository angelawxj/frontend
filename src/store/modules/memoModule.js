/**
 * Created by youmc on 2017/1/16.
 */

import {memoAction} from '../actions/memoAction'
import {memoGetter} from '../getters/memoGetter'
import {memoMutation} from '../mutations/memoMutation'

export const memoModule = {
  state: {
    data: [],
    memo: null
  },
  actions: memoAction,
  getters: memoGetter,
  mutations: memoMutation
}
