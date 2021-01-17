/** @format */
import React, {FC} from 'react'
import {Breadcrumb as AntdBreadcrumb} from 'antd'
import {History} from 'history'
import style from './style.m.less'
import {getTreePath} from '../../../lib/until'
import {RouteItem} from '../../../route/routeItems'

interface BreadcrumbProps {
  routes: Array<RouteItem>
  history: History
}

const Breadcrumb: FC<BreadcrumbProps> = props => {
  const {routes, history} = props
  const routePath = getTreePath(routes, route => route.path === history.location.pathname, 'routes')
  const handleClick = (route: RouteItem) => () => {
    if (route.routes && route.routes.length) return
    history.push(route.path)
  }
  return (
    <AntdBreadcrumb className={style['common-breadcrumb']}>
      {routePath.map((route: RouteItem) => (
        <AntdBreadcrumb.Item key={route.path}>
          <a onClick={handleClick(route)}>{route.meta.name}</a>
        </AntdBreadcrumb.Item>
      ))}
    </AntdBreadcrumb>
  )
}

export default Breadcrumb
