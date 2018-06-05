/**
 * Created by youmc on 2017/1/16.
 */

import {contactInternalAction} from '../actions/contactInternalAction'
import {contactInternalGetter} from '../getters/contactInternalGetter'
import {contactInternalMutation} from '../mutations/contactInternalMutation'

export const contactInternalModule = {
  state: {
    data: []
  },
  actions: contactInternalAction,
  getters: contactInternalGetter,
  mutations: contactInternalMutation
}
