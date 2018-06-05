/**
 * Created by youmc on 2017/1/16.
 */

import {pageAction} from '../actions/pageAction'
import {pageGetter} from '../getters/pageGetter'
import {pageMutation} from '../mutations/pageMutation'

export const pageModule = {
  state: {
    otherFlag: false,
    permiss:null
  },
  actions: pageAction,
  getters: pageGetter,
  mutations: pageMutation
}
