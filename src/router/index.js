import Vue from 'vue'
import Router from 'vue-router'
import Task from '@/components/Task'
import Search from '@/components/Search'
import Port from '@/components/Port'
import PortDetail from '@/components/PortDetail'
import Message from '@/components/Message'
import CustomerSelect from '@/components/CustomerSelect'
import CustomerDetail from '@/components/CustomerDetail'
import CustomerFlight from '@/components/CustomerFlight'
import CustomerService from '@/components/CustomerService'
import Customer from '@/components/Customer'
import Personal from '@/components/Personal'
import Contact from '@/components/Contact'
import ContactRecords from '@/components/ContactRecords'
import ContactInternal from '@/components/ContactInternal'
import Other from '@/components/Other'
import Previous from '@/components/Previous'
import Memo from '@/components/Memo'
import MemoEdit from '@/components/MemoEdit'
import MessageSend from '@/components/MessageSend'
import Remark from '@/components/Remark'
import RemarkEdit from '@/components/RemarkEdit'
import CustomerManager from '@/components/CustomerManager'
import CustomerManagerAdd from '@/components/CustomerManagerAdd'
import CustomerTrusteeship from '@/components/CustomerTrusteeship'
import CustomerTrusteeshipCancel from '@/components/CustomerTrusteeshipCancel'
import ChangePhone from '@/components/ChangePhone'
import CustomerAllocation from '@/components/CustomerAllocation'
import CustomerAllocationNext from '@/components/CustomerAllocationNext'
import CustomerAllocationFilter from '@/components/CustomerAllocationFilter'
import Repair from '@/components/Repair'
import Developed from '@/components/Developed'
import RepairDetail from '@/components/RepairDetail'
import RepairDetailEdit from '@/components/RepairDetailEdit'
import RepairPerson from '@/components/RepairPerson'
import ApplyMember from '@/components/ApplyMember'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    redirect: '/task'
  }, {
    name: '任务',
    path: '/task',
    component: Task
  }, {
    name: '搜索',
    path: '/search',
    component: Search,
    children: [{
      name: '客户信息',
      path: 'customer',
      component: Customer,
      children: [{
        name: '客户详情',
        path: 'detail',
        component: CustomerDetail,
        children: [{
          name: '乘机记录',
          path: 'flight',
          component: CustomerFlight
        }, {
          name: '服务历史',
          path: 'service',
          component: CustomerService
        }, {
          name: '历史备注',
          path: 'remark',
          component: Remark,
          children: [{
            name: '备注',
            path: 'edit',
            component: RemarkEdit
          }]
        }]
      }, {
        name: '请选择',
        path: 'select',
        component: CustomerSelect
      }]
    }, {
      name: '三日内进出港',
      path: 'port',
      component: Port,
      children: [{
        name: '三日内进出港详情',
        path: 'detail',
        component: PortDetail
      }]
    }, {
      name: '短信模版',
      path: 'message',
      component: Message,
      children: [{
        name: '发送短信',
        path: 'send',
        component: MessageSend
      }]
    },{
	    name: '待修复客户列表',
	    path: 'repairPerson',
	    component: RepairPerson,
	      children: [{
	        name: '待修复客户详情',
	        path: 'repairDetail',
	        component: RepairDetail,
	         children: [{
		        name: '修复编辑',
		        path: 'repairDetailEdit',
		        component: RepairDetailEdit
		      }]
	  	}]
	    
    },{
      name: '待发展客户名单',
      path: 'developed',
      component: Developed,
      children: [{
        name: '入会申请',
        path: 'applyMember',
        component: ApplyMember,
	    }]
    }]
  }, {
    name: '本月目标',
    path: '/personal',
    component: Personal,
    children: [{
      name: '历史完成情况',
      path: 'previous',
      component: Previous
    }, {
      name: '备忘录',
      path: 'memo',
      component: Memo,
      children: [{
        name: ' 备忘录 ',
        path: 'edit',
        component: MemoEdit
      }]
    }]
  }, {
    name: '通讯',
    path: '/contact',
    component: Contact,
    redirect: '/contact/records',
    children: [{
      name: '通话记录',
      path: 'records',
      component: ContactRecords
    }, {
      name: '内部通讯',
      path: 'internal',
      component: ContactInternal
    }]
  }, {
    name: '功能管理',
    path: '/other',
    component: Other,
    children: [{
      name: '绑定新的电话号码',
      path: 'changePhone',
      component: ChangePhone,
    },{
      name: '托管客户',
      path: 'customerTrusteeship',
      component: CustomerTrusteeship,
      children: [{
	      name: '托管客户',
	      path: 'customerTrusteeshipCancel',
	      component: CustomerTrusteeshipCancel,
	    }]
    },{
      name: '客户分配',
      path: 'customerAllocation',
      component: CustomerAllocation,
      children: [{
	      name: '客户分配',
	      path: 'customerAllocationNext',
	      component: CustomerAllocationNext,
	      children: [{
		      name: '联系人筛选',
		      path: 'customerAllocationFilter',
		      component: CustomerAllocationFilter,
		    }]
	    }]
    },{
      name: '客户经理管理',
      path: 'customerManager',
      component: CustomerManager,
      children: [{
	      name: '新建客户经理',
	      path: 'customerManagerAdd',
	      component: CustomerManagerAdd,
	    }]
    }]
  }]
})
