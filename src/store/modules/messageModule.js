/**
 * Created by youmc on 2017/1/16.
 */

import {messageAction} from '../actions/messageAction'
import {messageGetter} from '../getters/messageGetter'
import {messageMutation} from '../mutations/messageMutation'

export const messageModule = {
  state: {
    data: [],
    message: null
  },
  actions: messageAction,
  getters: messageGetter,
  mutations: messageMutation
}
