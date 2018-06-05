/**
 * Created by youmc on 2017/1/16.
 */

import {contactRecordsAction} from '../actions/contactRecordsAction'
import {contactRecordsGetter} from '../getters/contactRecordsGetter'
import {contactRecordsMutation} from '../mutations/contactRecordsMutation'

export const contactRecordsModule = {
  state: {
    data: []
  },
  actions: contactRecordsAction,
  getters: contactRecordsGetter,
  mutations: contactRecordsMutation
}
