/** @format */

import React, {useState} from 'react'
import {themeColors, themeColorsInterface} from '../../../constant'
import {CheckOutlined} from '@ant-design/icons'
import './style.less'
import {message, Tooltip} from 'antd'
import ColorPopover from '../../../commpent/ColorPopconfirm/ColorPopover'
import lessVarsUpdate from '../../../lib/less'

const ThemeConfiguration = () => {
  const initialColor = window.getComputedStyle(document.documentElement, null).getPropertyValue('--primary-color')
  const [color, setColor] = useState<themeColorsInterface | null>()
  const handleClickColor = (color: themeColorsInterface) => () => {
    setColor(color)
    lessVarsUpdate({'@primary-color': color.color})
  }
  const handleChangeColor = (color: string) => {
    setColor(null)
    lessVarsUpdate({'@primary-color': color})
  }
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
              onClick={handleClickColor(item)}>
              {color?.id === item.id && <CheckOutlined />}
            </div>
          </Tooltip>
        ))}
      </div>
      <h2 className={'configuration-theme-title'}>自定义主题色</h2>
      <ColorPopover color={color?.color || initialColor} onChange={handleChangeColor} />
    </div>
  )
}

export default ThemeConfiguration
