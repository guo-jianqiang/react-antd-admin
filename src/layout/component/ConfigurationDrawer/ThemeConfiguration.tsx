/** @format */

import React, {useContext, useEffect} from 'react'
import {themeColors} from '../../../constant'
import {CheckOutlined} from '@ant-design/icons'
import './style.less'
import {Tooltip} from 'antd'
import ColorPopover from '../../../commpent/ColorPopconfirm/ColorPopover'
import lessVarsUpdate from '../../../lib/less'
import ConfigurationContext from '../../store/configurationContext'
import {actionPrimaryColor} from '../../store/configurationAction'

const ThemeConfiguration = () => {
  const initialColor = window.getComputedStyle(document.documentElement, null).getPropertyValue('--primary-color')
  const configContext = useContext(ConfigurationContext)
  const {state, dispatch} = configContext
  const {primaryColor} = state
  const handleClickColor = (color: string) => () => {
    dispatch(actionPrimaryColor({...state, primaryColor: color}))
  }
  const handleChangeCustomColor = (color: string) => {
    dispatch(actionPrimaryColor({...state, primaryColor: color}))
  }
  useEffect(() => {
    lessVarsUpdate({'@primary-color': primaryColor})
  }, [primaryColor])
  return (
    <div className={'configuration-theme'}>
      <h2 className={'configuration-theme-title'}>主题色</h2>
      <div className={'configuration-theme-colors'}>
        {themeColors.map(item => (
          <Tooltip key={item.id} title={item.name}>
            <div
              key={item.id}
              className={'configuration-theme-colors-item'}
              style={{background: item.color}}
              onClick={handleClickColor(item.color)}>
              {primaryColor === item.color && <CheckOutlined />}
            </div>
          </Tooltip>
        ))}
      </div>
      <h2 className={'configuration-theme-title'}>自定义主题色</h2>
      <ColorPopover color={primaryColor || initialColor} onChange={handleChangeCustomColor} />
    </div>
  )
}

export default ThemeConfiguration
