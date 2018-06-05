/**
 * Created by youmc on 2017/1/16.
 */

export const taskGetter = {
  currentTask(state) {
    let records = []
    for(let i = 0, len = state.data.length; i < len; ++i) {
      let record = state.data[i]
      if(record.current) {
        records.push(record)
      }
    }
    console.log('currentTask', records)
    return records
  },
  previousTask(state) {
    let records = []
    for(let i = 0, len = state.data.length; i < len; ++i) {
      let record = state.data[i]
      if(!record.current) {
        records.push(record)
      }
    }
    return records
  }
}
