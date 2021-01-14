/** @format */
import React, {FC, useEffect, useRef, useState} from 'react'
import Header from './component/Header/Header'
import Breadcrumb from './component/Breadcrumb/Breadcrumb'
import {History} from 'history'
import './style.less'
import {RouteItem} from '../route/routeItems'
import {UserInterface} from '../lib/userData'
import Menu from './component/Menu/Menu'
import Icon from '../commpent/icon/Icon'
import {Tooltip} from 'antd'

interface LayoutProps {
  routeItems: Array<RouteItem>
  history: History
  userData: UserInterface | null
}

const Layout: FC<LayoutProps> = props => {
  const {routeItems, history, userData} = props
  const layoutRef = useRef<HTMLDivElement | null>(null)
  const [collapsed, setCollapsed] = useState(false)
  const handleClickCollapse = () => {
    setCollapsed(!collapsed)
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
      <aside className={'layout-left'}>
        <Menu collapsed={collapsed} routeItems={routeItems} history={history} />
      </aside>
      <header className={'layout-right'}>
        <Header
          history={history}
          userData={userData}
          collapseBtn={collapseBtn}
          breadcrumb={<Breadcrumb routes={routeItems} history={history} />}
        />
        <div className={'layout-right-content'}>{props.children}</div>
      </header>
    </div>
  )
}

export default Layout
