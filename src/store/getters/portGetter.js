/**
 * Created by youmc on 2017/1/16.
 */

export const portGetter = {
  port(state) {
    for(let i = 0, len = state.data.length; i < len; ++i) {
      let record = state.data[i]
      if(record.id == state.portID) {
        return record
      }
    }
    return null
  }
}
