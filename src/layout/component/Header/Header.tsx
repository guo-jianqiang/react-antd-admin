/** @format */

import React, {FC} from 'react'
import {removeUserData, UserInterface} from '../../../lib/userData'
import {Menu, Dropdown, Avatar, Tooltip} from 'antd'
import cx from 'classnames'
import {History} from 'history'
import './style.less'
import {LOGIN_PATH} from '../../../constant'
import Icon from '../../../commpent/icon/Icon'

export interface HeaderProps {
  username: string
  breadcrumb: React.ReactNode
  collapseBtn: React.ReactNode
  history: History
  onClickDrop: () => void
}

const Header: FC<HeaderProps> = props => {
  const {history, onClickDrop} = props
  const handleClickDrop = () => {
    history.push(LOGIN_PATH)
    onClickDrop && onClickDrop()
  }
  const menu = (
    <Menu>
      <Menu.Item onClick={handleClickDrop}>退出</Menu.Item>
    </Menu>
  )
  const {username, breadcrumb, collapseBtn} = props
  return (
    <header className={'header'}>
      <div className={'header-left'}>
        {collapseBtn}
        {breadcrumb}
      </div>
      <div className={'header-right'}>
        <Tooltip title={username}>
          <span className={cx('header-right-admin', 'text-ellipsis-1')}>{username}</span>
        </Tooltip>
        <Dropdown overlay={menu} placement="bottomRight" arrow>
          <Avatar
            size={32}
            className={'header-right-avatar'}
            icon={<Icon type="iconchangjinglu" style={{fontSize: 24}} />}
          />
        </Dropdown>
      </div>
    </header>
  )
}
export default Header
