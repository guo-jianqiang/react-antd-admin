/** @format */

import React, {FC, useEffect, useRef, useState} from 'react'
import {History} from 'history'
import {Menu, Dropdown, Tooltip} from 'antd'
import {RouteItem} from '../../../route/routeItems'
import {treeForeach, isEmpty} from '../../../lib/until'
import {getItem, removeItem, setItem} from '../../../lib/localStorage'
import cx from 'classnames'
import {CloseCircleOutlined, LeftOutlined, RightOutlined} from '@ant-design/icons'
import './style.less'
import {MenuInfo} from 'rc-menu/lib/interface'
import {aliveControlInterface} from '../../Layout'

const LAYOUT_TAB = '__layout_tab__'
const TAB_ACTIONS = {
  REFRESH: 'REFRESH', // 刷新
  ADD: 'ADD', // 添加
  DEL: 'DEL', // 删除
  DEL_RIGHT: 'DEL_RIGHT', // 删除右边
  DEL_LEFT: 'DEL_LEFT', // 删除左边
  DEL_OTHER: 'DEL_OTHER', // 删除其他
  DEL_ALL: 'DEL_ALL', // 删除所有
}

interface TabsProps<T> {
  scrollDistance?: number
  history: History
  routeItems: Array<T>
  aliveControl: aliveControlInterface
}

type TabsStaticFun = {
  clearTabsCache: () => void
}

export type TabsType = FC<TabsProps<RouteItem>> & TabsStaticFun

const Tabs: TabsType = props => {
  const localTabs = !isEmpty(getItem(LAYOUT_TAB)) ? getItem(LAYOUT_TAB) : []
  const {history, routeItems, scrollDistance = 200, aliveControl} = props
  const [tabs, setTabs] = useState<Array<RouteItem>>(localTabs)
  const prevTabs = useRef<Array<RouteItem>>(tabs)
  const routeRef = useRef<RouteItem | null>(null)
  const tabAction = useRef<string>(TAB_ACTIONS.ADD)
  useEffect(() => {
    treeForeach<RouteItem>(routeItems, route => {
      if (route.path === history.location.pathname) {
        addTab(route)
      }
    })
    scrollIntoTab()
  }, [history.location.pathname])
  useEffect(() => {
    setItem(LAYOUT_TAB, tabs)
    scrollIntoTab()
    if (routeRef.current && tabAction.current !== TAB_ACTIONS.ADD) {
      if (routeRef.current?.path !== history.location.pathname) history.push(routeRef.current?.path)
      prevTabs.current.forEach(prevTab => {
        if (!tabs.find(tab => tab.path === prevTab.path)) {
          aliveControl.dropByCacheKey(prevTab.path)
        }
      })
    }
    prevTabs.current = [...tabs]
  }, [tabs])
  const handleClickRefreshRoute = (tab: RouteItem) => () => {
    aliveControl.refreshByCacheKey(tab.path)
  }
  const scrollIntoTab = () => {
    const pathname = history.location.pathname
    const tabNode: HTMLElement | null = window.document.getElementById(pathname)
    tabNode && tabNode.scrollIntoView()
  }
  const isTabFixed = (tab: RouteItem) => tab.meta.tabFixed
  const addTab = (route: RouteItem) => {
    routeRef.current = route
    if (tabs.find(tab => tab.path === route.path)) return
    setTabs((prevTabs: Array<RouteItem> = []) => {
      prevTabs.push(route)
      if (routeRef.current) routeRef.current = route
      tabAction.current = TAB_ACTIONS.ADD
      return [...prevTabs]
    })
  }
  const handleClickDelRightTabs = (route: RouteItem, index: number) => () => {
    setTabs((prevTabs: Array<RouteItem> = []) => {
      const deletedTabs = prevTabs.slice(index + 1)
      const fixedTabs = deletedTabs.filter(item => isTabFixed(item))
      const leftTabs = prevTabs.slice(0, index + 1)
      const existCurrentRoute = leftTabs.find(item => item.path === history.location.pathname)
      if (routeRef.current && !existCurrentRoute) routeRef.current = route
      tabAction.current = TAB_ACTIONS.DEL_RIGHT
      return [...fixedTabs, ...leftTabs]
    })
  }
  const handleClickDelLeftTabs = (route: RouteItem, index: number) => () => {
    setTabs((prevTabs: Array<RouteItem> = []) => {
      const deletedTabs = prevTabs.slice(0, index)
      const fixedTabs = deletedTabs.filter(item => isTabFixed(item))
      const rightTabs = prevTabs.slice(index)
      const existCurrentRoute = rightTabs.find(item => item.path === history.location.pathname)
      if (routeRef.current && !existCurrentRoute) routeRef.current = route
      tabAction.current = TAB_ACTIONS.DEL_LEFT
      return [...fixedTabs, ...rightTabs]
    })
  }
  const handleClickDelOtherTabs = (route: RouteItem) => () =>
    setTabs((prevTabs: Array<RouteItem> = []) => {
      const fixedTabs = prevTabs.filter(item => isTabFixed(item) && item.path !== route.path)
      if (routeRef.current) routeRef.current = route
      tabAction.current = TAB_ACTIONS.DEL_OTHER
      return [...fixedTabs, route]
    })
  const handleClickCloseTab = (tab: RouteItem) => (e: any | null) => {
    e && e.target && e.stopPropagation()
    setTabs((prevTabs: Array<RouteItem> = []) => {
      const index = prevTabs.findIndex(item => item.path === tab.path)
      prevTabs.splice(index, 1)
      if (prevTabs.length) {
        if (routeRef.current && prevTabs[index - 1]) routeRef.current = prevTabs[index - 1]
      }
      tabAction.current = TAB_ACTIONS.DEL
      return [...prevTabs]
    })
  }
  const handleClickDelAllTabs = () => {
    setTabs((prevTabs: Array<RouteItem> = []) => {
      const fixedTabs = prevTabs.filter(item => item.meta.tabFixed)
      if (fixedTabs.length) {
        if (routeRef.current) routeRef.current = fixedTabs[0]
      }
      tabAction.current = TAB_ACTIONS.DEL_ALL
      return [...fixedTabs]
    })
  }
  const handleClickTab = (route: RouteItem) => (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation()
    route.path !== history.location.pathname && history.push(route.path)
    if (routeRef.current) routeRef.current = route
  }

  const handleClickScrollLeft = () => {
    const tabWrapperNode: HTMLElement | null = window.document.getElementById('layout-tab')
    if (tabWrapperNode) {
      tabWrapperNode.scrollLeft = tabWrapperNode.scrollLeft - scrollDistance
    }
  }

  const handleClickScrollRight = () => {
    const tabWrapperNode: HTMLElement | null = window.document.getElementById('layout-tab')
    if (tabWrapperNode) {
      tabWrapperNode.scrollLeft = tabWrapperNode.scrollLeft + scrollDistance
    }
  }

  const HandleClickTabMenu = (tab: RouteItem, i: number) => (e: MenuInfo) => {
    switch (e.key) {
      case TAB_ACTIONS.REFRESH:
        handleClickRefreshRoute(tab)()
        break
      case TAB_ACTIONS.DEL:
        handleClickCloseTab(tab)(null)
        break
      case TAB_ACTIONS.DEL_OTHER:
        handleClickDelOtherTabs(tab)()
        break
      case TAB_ACTIONS.DEL_RIGHT:
        handleClickDelRightTabs(tab, i)()
        break
      case TAB_ACTIONS.DEL_LEFT:
        handleClickDelLeftTabs(tab, i)()
        break
      case TAB_ACTIONS.DEL_ALL:
        handleClickDelAllTabs()
        break
    }
  }

  const tabMenu = (tab: RouteItem, i: number) => (
    <Menu onClick={HandleClickTabMenu(tab, i)}>
      <Menu.Item key={TAB_ACTIONS.REFRESH} disabled={!tab.meta.isCache}>
        刷新
      </Menu.Item>
      <Menu.Item key={TAB_ACTIONS.DEL} disabled={tab.meta.tabFixed}>
        关闭
      </Menu.Item>
      <Menu.Item key={TAB_ACTIONS.DEL_OTHER}>关闭其他</Menu.Item>
      <Menu.Item key={TAB_ACTIONS.DEL_RIGHT}>关闭右边</Menu.Item>
      <Menu.Item key={TAB_ACTIONS.DEL_LEFT}>关闭左边</Menu.Item>
      <Menu.Item key={TAB_ACTIONS.DEL_ALL}>关闭所有</Menu.Item>
    </Menu>
  )
  return (
    <div className="tabs">
      <div className={'tabs-scrollbar tabs-scrollbar-left'} onClick={handleClickScrollLeft}>
        <Tooltip title="左滑">
          <LeftOutlined />
        </Tooltip>
      </div>
      <div className="tabs-wrapper" id={'layout-tab'}>
        {tabs.map((tab, i) => (
          <Dropdown overlay={tabMenu(tab, i)} trigger={['contextMenu']} key={tab.path}>
            <span
              id={tab.path}
              className={cx('tabs-wrapper-item', {
                'tabs-wrapper-active': tab.path === history.location.pathname,
              })}
              onClick={handleClickTab(tab)}>
              <span className={'tabs-wrapper-item-name text-ellipsis-1'}>{tab.meta.name}</span>
              {!tab.meta.tabFixed && (
                <CloseCircleOutlined className="tabs-wrapper-item-close" onClick={handleClickCloseTab(tab)} />
              )}
            </span>
          </Dropdown>
        ))}
      </div>
      <div className={'tabs-scrollbar tabs-scrollbar-right'} onClick={handleClickScrollRight}>
        <Tooltip title="右滑">
          <RightOutlined />
        </Tooltip>
      </div>
    </div>
  )
}

Tabs.clearTabsCache = () => {
  removeItem(LAYOUT_TAB)
}

export default Tabs
