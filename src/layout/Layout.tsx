/** @format */
import React, {FC, useRef, useReducer} from 'react'
import {Link} from 'react-router-dom'
import cx from 'classnames'
import Header from './component/Header/Header'
import Breadcrumb from './component/Breadcrumb/Breadcrumb'
import {History} from 'history'
import {RouteItem} from '../route/routeItems'
import Menu from './component/Menu/Menu'
import Icon from '../commpent/icon/Icon'
import {Tooltip, BackTop} from 'antd'
import defaultLogo from '../assets/images/我的.svg'
import project from '../../package.json'
import ConfigurationDrawer from './component/ConfigurationDrawer/ConfigurationDrawer'
import Tabs from './component/Tabs/Tabs'
import {configurationReducer} from './store/configurationReducer'
import ConfigurationContext, {getSystemConfig} from './store/configurationContext'
import {actionCollapsed} from './store/configurationAction'
import './style.less'

export interface aliveControlInterface {
  dropByCacheKey: (cacheKey: string) => void
  refreshByCacheKey: (cacheKey: string) => void
  getCachingKeys: () => Array<string>
  clearCache: () => void
}
interface LayoutProps {
  logo?: any
  aliveControl: aliveControlInterface
  routeItems: Array<RouteItem>
  history: History
  username: string
  onClickDrop: () => void
}
type LayoutInnerComponent = {
  Tabs: typeof Tabs
  Header: typeof Header
  Menu: typeof Menu
  Breadcrumb: typeof Breadcrumb
  ConfigurationDrawer: typeof ConfigurationDrawer
}
const Layout: FC<LayoutProps> & LayoutInnerComponent = props => {
  const {routeItems, history, username, aliveControl, onClickDrop, logo} = props
  const [configState, dispatch] = useReducer(configurationReducer, getSystemConfig())
  const contentRef = useRef<HTMLDivElement | null>(null)
  const layoutRef = useRef<HTMLDivElement | null>(null)
  const handleClickCollapse = () => {
    dispatch(actionCollapsed({...configState, collapsed: !configState.collapsed}))
  }
  const handleClickMask = () => {
    dispatch(actionCollapsed({...configState, collapsed: true}))
  }
  const handleClickDrop = () => {
    onClickDrop && onClickDrop()
  }
  const {collapsed} = configState
  const collapseBtn = (
    <Tooltip title={collapsed ? '展开' : '收起'}>
      <Icon
        type={collapsed ? 'iconzhankai' : 'iconshouqi'}
        className={'layout-right-headerBtn'}
        onClick={handleClickCollapse}
      />
    </Tooltip>
  )
  const layoutStyle = {'--layout-menu-width': collapsed ? '56px' : '220px'} as React.CSSProperties
  return (
    <ConfigurationContext.Provider
      value={{
        state: configState,
        dispatch,
      }}>
      <div className={'layout'} ref={layoutRef} style={layoutStyle}>
        <div
          className={cx('layout-mask', {
            'layout-mask-collapsed': collapsed,
          })}
          onClick={handleClickMask}
        />
        <aside
          className={cx('layout-aside', {
            'layout-aside-collapsed': collapsed,
          })}>
          <div
            className={cx('layout-aside-logo', {
              'layout-aside-logo-collapsed': collapsed,
            })}>
            <Link to={'/home'}>
              <img src={logo || defaultLogo} />
              {/* <logo /> */}
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
            username={username}
            collapseBtn={collapseBtn}
            onClickDrop={handleClickDrop}
            breadcrumb={<Breadcrumb routes={routeItems} history={history} />}
          />
          <Tabs history={history} routeItems={routeItems} aliveControl={aliveControl} />
          <div className={'layout-right-content'} ref={contentRef}>
            {props.children}
            <BackTop
              style={{right: 32, bottom: 32}}
              target={() => contentRef.current || window}
              visibilityHeight={200}
            />
          </div>
        </div>
      </div>
    </ConfigurationContext.Provider>
  )
}

Layout.Tabs = Tabs
Layout.Header = Header
Layout.Menu = Menu
Layout.Breadcrumb = Breadcrumb
Layout.ConfigurationDrawer = ConfigurationDrawer

export default Layout
