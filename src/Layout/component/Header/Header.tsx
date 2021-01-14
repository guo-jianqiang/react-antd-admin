/** @format */

import React, {FC} from 'react'
import {CEC_USER_DATA, UserInterface} from '../../../lib/userData'
import {Menu, Dropdown, Avatar, Tooltip} from 'antd'
import cx from 'classnames'
import {History} from 'history'
import './style.less'
import {LOGIN_PATH} from '../../../constant'
import {removeItem} from '../../../lib/localStorage'
import Icon from '../../../commpent/icon/Icon'

interface HeaderProps {
  userData: UserInterface | null
  breadcrumb: React.ReactNode
  collapseBtn: React.ReactNode
  history: History
}

const Header: FC<HeaderProps> = props => {
  const {history} = props
  const handleClickDrop = () => {
    history.push(LOGIN_PATH)
    removeItem(CEC_USER_DATA)
  }
  const menu = (
    <Menu>
      <Menu.Item onClick={handleClickDrop}>退出</Menu.Item>
    </Menu>
  )
  const {userData, breadcrumb, collapseBtn} = props
  return (
    <div className={'header'}>
      <div className={'header-left'}>
        {collapseBtn}
        {breadcrumb}
      </div>
      <div className={'header-right'}>
        <Tooltip title={userData?.username}>
          <span className={cx('header-right-admin', 'text-ellipsis-1')}>{userData?.username}</span>
        </Tooltip>
        <Dropdown overlay={menu} placement="bottomRight" arrow>
          <Avatar
            size={32}
            className={'header-right-avatar'}
            icon={<Icon type="iconchangjinglu" style={{fontSize: 24}} />}
          />
        </Dropdown>
      </div>
    </div>
  )
}
export default Header
