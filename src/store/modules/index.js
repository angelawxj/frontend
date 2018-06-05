/**
 * Created by youmc on 2017/1/16.
 */

import {pageModule} from './pageModule'
import {customerModule} from './customerModule'
import {portModule} from './portModule'
import {messageModule} from './messageModule'
import {contactRecordsModule} from './contactRecordsModule'
import {contactInternalModule} from './contactInternalModule'
import {taskModule} from './taskModule'
import {memoModule} from './memoModule'
import {remarkModule} from './remarkModule'

export default {
  page: pageModule,
  customer: customerModule,
  port: portModule,
  message: messageModule,
  contactRecords: contactRecordsModule,
  contactInternal: contactInternalModule,
  task: taskModule,
  memo: memoModule,
  remark: remarkModule
}
