/**
 * Created by youmc on 2017/1/16.
 */

import {customerAction} from '../actions/customerAction'
import {customerGetter} from '../getters/customerGetter'
import {customerMutation} from '../mutations/customerMutation'

export const customerModule = {
  state: {
    customer: null,
    data: [],
    flight: [],
    service: [],
    trusteeship:[],
    allocationNext:[],
    allocationFilter:[],
    trusteeshipCancel:[],
    other: [],
    repair: [],
    repairDetail: [],
    repairPerson: [],
    developed:[],
  },
  actions: customerAction,
  getters: customerGetter,
  mutations: customerMutation
}
