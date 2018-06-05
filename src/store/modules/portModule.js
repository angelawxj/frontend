/**
 * Created by youmc on 2017/1/16.
 */

import {portAction} from '../actions/portAction'
import {portGetter} from '../getters/portGetter'
import {portMutation} from '../mutations/portMutation'

export const portModule = {
  state: {
    portID: null,
    data: []
  },
  actions: portAction,
  getters: portGetter,
  mutations: portMutation
}
