/** @format */
import React, {FC, useEffect, useRef, useState} from 'react'
import {Link} from 'react-router-dom'
import cx from 'classnames'
import Header from './component/Header/Header'
import Breadcrumb from './component/Breadcrumb/Breadcrumb'
import {History} from 'history'
import './style.less'
import {RouteItem} from '../route/routeItems'
import {UserInterface} from '../lib/userData'
import Menu from './component/Menu/Menu'
import Icon from '../commpent/icon/Icon'
import {Tooltip} from 'antd'
import logo from '../assets/images/我的.svg'
import project from '../../package.json'
import ConfigurationDrawer from './component/ConfigurationDrawer/ConfigurationDrawer'
import Tabs from './component/Tabs/Tabs'

interface LayoutProps {
  routeItems: Array<RouteItem>
  history: History
  userData: UserInterface | null
}
const Layout: FC<LayoutProps> = props => {
  const {routeItems, history, userData} = props
  const layoutRef = useRef<HTMLDivElement | null>(null)
  const [collapsed, setCollapsed] = useState(true)
  const handleClickCollapse = () => {
    setCollapsed(!collapsed)
  }
  const handleClickMask = () => {
    setCollapsed(true)
  }
  useEffect(() => {
    layoutRef.current?.style.setProperty('--layout-menu-width', collapsed ? '56px' : '220px')
  }, [collapsed])
  const collapseBtn = (
    <Tooltip title={collapsed ? '展开' : '收起'}>
      <Icon
        type={collapsed ? 'iconzhankai' : 'iconshouqi'}
        className={'layout-right-headerBtn'}
        onClick={handleClickCollapse}
      />
    </Tooltip>
  )
  return (
    <div className={'layout'} ref={layoutRef}>
      <div className={cx('layout-mask', {
        'layout-mask-collapsed': collapsed
      })} onClick={handleClickMask}
      />
      <aside className={cx('layout-aside', {
        'layout-aside-collapsed': collapsed
      })}>
        <div
          className={cx('layout-aside-logo', {
            'layout-aside-logo-collapsed': collapsed,
          })}>
          <Link to={'/'}>
            <img src={logo} />
            {/*<logo />*/}
            {!collapsed && <h1 className={'text-ellipsis-1'}>{project.name}</h1>}
          </Link>
        </div>
        <div className={'layout-aside-menu'}>
          <Menu collapsed={collapsed} routeItems={routeItems} history={history} />
        </div>
      </aside>
      <ConfigurationDrawer />
      <div className={'layout-right'}>
        <Header
          history={history}
          userData={userData}
          collapseBtn={collapseBtn}
          breadcrumb={<Breadcrumb routes={routeItems} history={history} />}
        />
        <Tabs history={history} routeItems={routeItems} />
        <div className={'layout-right-content'}>{props.children}</div>
      </div>
    </div>
  )
}

export default Layout