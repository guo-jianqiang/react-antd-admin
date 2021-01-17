/** @format */

import {message} from 'antd'
import {getItem} from './localStorage'
import {SYStEM_CONFIG} from '../constant'

const lessVarsUpdate = (vars: any) => {
  window.less.modifyVars(vars).then(() => {
    if (vars['@primary-color'] === getItem(SYStEM_CONFIG).primaryColor) return
    message.success('主题色切换成功')
  })
  window.less.refreshStyles()
}

export default lessVarsUpdate
