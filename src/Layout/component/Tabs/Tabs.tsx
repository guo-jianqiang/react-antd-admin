/** @format */

import React, {FC, useEffect, useRef, useState} from 'react'
import {History} from 'history'
import {Menu, Dropdown, Tooltip} from 'antd'
import {RouteItem} from '../../../route/routeItems'
import {treeForeach, isEmpty} from '../../../lib/until'
import {getItem, setItem} from '../../../lib/localStorage'
import cx from 'classnames'
import {CloseCircleOutlined, LeftOutlined, RightOutlined} from '@ant-design/icons'
import './style.less'

const LAYOUT_TAB = '__layout_tab__'
const TAB_ACTIONS = {
  ADD: 'ADD',
  DEL: 'DEL',
  DEL_RIGHT: 'DEL_RIGHT',
  DEL_LEFT: 'DEL_LEFT',
  DEL_OTHER: 'DEL_OTHER',
  DEL_ALL: 'DEL_ALL'
}
interface TabsProps {
  scrollDistance?: number;
  history: History
  routeItems: Array<RouteItem>
}

const Tabs: FC<TabsProps> = props => {
  const localTabs = !isEmpty(getItem(LAYOUT_TAB)) ? getItem(LAYOUT_TAB) : []
  const {history, routeItems, scrollDistance = 200} = props
  const [tabs, setTabs] = useState<Array<RouteItem>>(localTabs)
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
    if (routeRef.current && tabAction.current !== TAB_ACTIONS.ADD) history.push(routeRef.current?.path)
  }, [tabs])
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
  const handleClickDelRightTabs = (route: RouteItem, index: number) => (e: any) => {
    setTabs((prevTabs: Array<RouteItem> = []) => {
      const deletedTabs = prevTabs.slice(index + 1)
      const fixedTabs = deletedTabs.filter(item => isTabFixed(item))
      const leftTabs = prevTabs.slice(0, index + 1)
      if (routeRef.current) routeRef.current = route
      tabAction.current = TAB_ACTIONS.DEL_RIGHT
      return [...fixedTabs, ...leftTabs]
    })
  }
  const handleClickDelLeftTabs = (route: RouteItem, index: number) => (e: any) => {
    setTabs((prevTabs: Array<RouteItem> = []) => {
      const deletedTabs = prevTabs.slice(0, index)
      const fixedTabs = deletedTabs.filter(item => isTabFixed(item))
      const rightTabs = prevTabs.slice(index)
      if (routeRef.current) routeRef.current = route
      tabAction.current = TAB_ACTIONS.DEL_LEFT
      return [...fixedTabs, ...rightTabs]
    })
  }
  const handleClickDelOtherTabs = (route: RouteItem) => (e: any) =>
    setTabs((prevTabs: Array<RouteItem> = []) => {
      const fixedTabs = prevTabs.filter(item => isTabFixed(item) && item.path !== route.path)
      if (routeRef.current) routeRef.current = route
      tabAction.current = TAB_ACTIONS.DEL_OTHER
      return [...fixedTabs, route]
    })
  const handleClickCloseTab = (tab: RouteItem) => (e: any) => {
    e.target && e.stopPropagation()
    setTabs((prevTabs: Array<RouteItem> = []) => {
      const index = prevTabs.findIndex(item => item.path === tab.path)
      prevTabs.splice(index, 1)
      if (history.location.pathname === tab.path && prevTabs.length) {
        if (routeRef.current && prevTabs[index - 1]) routeRef.current = prevTabs[index - 1]
        tabAction.current = TAB_ACTIONS.DEL
      }
      return [...prevTabs]
    })
  }
  const handleClickDelAllTabs = (e: any) => {
    setTabs((prevTabs: Array<RouteItem> = []) => {
      const fixedTabs = prevTabs.filter(item => item.meta.tabFixed)
      if (fixedTabs.length) {
        if (routeRef.current) routeRef.current = fixedTabs[0]
        tabAction.current = TAB_ACTIONS.DEL_ALL
      }
      return [...fixedTabs]
    })
  }
  const handleClickTab = (route: RouteItem) => (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation()
    history.push(route.path)
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

  const tabMenu = (tab: RouteItem, i: number) => (
    <Menu>
      <Menu.Item key="1" disabled={tab.meta.tabFixed} onClick={handleClickCloseTab(tab)}>
        关闭
      </Menu.Item>
      <Menu.Item key="2" onClick={handleClickDelOtherTabs(tab)}>
        关闭其他
      </Menu.Item>
      <Menu.Item key="3" onClick={handleClickDelRightTabs(tab, i)}>
        关闭右边
      </Menu.Item>
      <Menu.Item key="4" onClick={handleClickDelLeftTabs(tab, i)}>
        关闭左边
      </Menu.Item>
      <Menu.Item key="5" onClick={handleClickDelAllTabs}>
        关闭所有
      </Menu.Item>
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
        {/*<div className={'tabs-wrapper-inner'} style={{transform: `translateX(${-scrollLeft}px)`}} ref={tabInnerRef}>*/}
        {/*  */}
        {/*</div>*/}
        {tabs.map((tab, i) => (
          <Dropdown overlay={tabMenu(tab, i)} trigger={['contextMenu']} key={tab.path}>
              <span
                id={tab.path}
                className={cx('tabs-wrapper-item', {
                  'tabs-wrapper-active': tab.path === history.location.pathname,
                })}
                onClick={handleClickTab(tab)}>
                <span className={'tabs-wrapper-item-name'}>{tab.meta.name}</span>
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

export default Tabs
