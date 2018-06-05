/**
 * Created by youmc on 2017/1/16.
 */

import {remarkAction} from '../actions/remarkAction'
import {remarkGetter} from '../getters/remarkGetter'
import {remarkMutation} from '../mutations/remarkMutation'

export const remarkModule = {
  state: {
    data: [],
    remark: null
  },
  actions: remarkAction,
  getters: remarkGetter,
  mutations: remarkMutation
}
