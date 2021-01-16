/** @format */

import React, {FC, useState} from 'react'
import {Button, Drawer} from 'antd'
import cx from 'classnames'
import {SettingOutlined, CloseOutlined} from '@ant-design/icons'
import './style.less'
import ThemeConfiguration from './ThemeConfiguration'

const ConfigurationDrawer: FC<any> = props => {
  const [visible, setVisible] = useState(false)
  const handleClick = () => {
    setVisible(!visible)
  }
  const Btn = visible ? CloseOutlined : SettingOutlined
  return (
    <React.Fragment>
      <div
        className={cx('configuration-open', {
          'configuration-close': !visible,
        })}
        onClick={handleClick}>
        <Btn style={{fontSize: 24, color: '#fff'}} />
      </div>
      <Drawer placement="right" visible={visible} onClose={handleClick} closable={false} mask={false} destroyOnClose>
        <React.Fragment>
          <ThemeConfiguration />
        </React.Fragment>
      </Drawer>
    </React.Fragment>
  )
}

export default ConfigurationDrawer
