/** @format */

import {message} from 'antd'

const lessVarsUpdate = (vars: Object) => {
  window.less.modifyVars(vars).then(() => {
    message.success('主题色切换成功')
  })
  window.less.refreshStyles()
}

export default lessVarsUpdate
