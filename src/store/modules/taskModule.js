/**
 * Created by youmc on 2017/1/16.
 */

import {taskAction} from '../actions/taskAction'
import {taskGetter} from '../getters/taskGetter'
import {taskMutation} from '../mutations/taskMutation'

export const taskModule = {
  state: {
    data: [],
    previous: [],
    star: [],
  },
  actions: taskAction,
  getters: taskGetter,
  mutations: taskMutation
}
