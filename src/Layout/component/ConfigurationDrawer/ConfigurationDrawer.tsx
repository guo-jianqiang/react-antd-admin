/** @format */

import React, {FC, useState} from 'react'
import {Drawer} from 'antd'
import cx from 'classnames'
import {SettingOutlined, CloseOutlined} from '@ant-design/icons'
import './style.less'
import ThemeConfiguration from './ThemeConfiguration'
import ConfigurationBtn from './ConfigurationBtn'
import {SYSTEM_CONFIG_DRAWER_WIDTH} from '../../../constant'
import IconSelect from '../../../commpent/IconSelect/IconSelect'

const ConfigurationDrawer: FC<any> = () => {
  const [visible, setVisible] = useState(false)
  const handleClickCloseDrawer = () => {
    setVisible(!visible)
  }
  return (
    <React.Fragment>
      <ConfigurationBtn drawerWidth={SYSTEM_CONFIG_DRAWER_WIDTH} visible={visible} handleClickBtn={setVisible} />
      <Drawer
        placement="right"
        forceRender
        visible={visible}
        onClose={handleClickCloseDrawer}
        closable={false}
        mask={false}
        width={SYSTEM_CONFIG_DRAWER_WIDTH}>
        <React.Fragment>
          <ThemeConfiguration />
        </React.Fragment>
      </Drawer>
    </React.Fragment>
  )
}

export default ConfigurationDrawer
