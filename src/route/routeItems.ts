/** @format */

import React from 'react'
import EmptyRoute from './EmptyRoute'
import Table from '../view/table/index'
import ReadMe from '../view/readme/index'

type ComponentType = React.ComponentType<any> & {name: string}
export interface RouteItem {
  path: string
  exact: boolean
  meta: {
    tabFixed?: boolean
    isCache?: boolean
    name: string
    icon: Function | string
    hidden?: boolean
  }
  component: ComponentType
  routes?: Array<RouteItem>
}

const routeItems: Array<RouteItem> = [
  {
    path: '/home',
    exact: true,
    meta: {
      tabFixed: true,
      isCache: true,
      icon: 'iconuser',
      name: '首页',
    },
    component: ReadMe,
  },
  {
    path: '/test',
    exact: true,
    meta: {
      icon: 'iconyijibaogao',
      isCache: true,
      name: '测试管理',
      hidden: true,
    },
    component: EmptyRoute,
    routes: [
      {
        path: '/test/table',
        exact: true,
        meta: {
          icon: 'iconuser',
          name: '列表',
          isCache: true,
        },
        component: Table,
      },
    ],
  },
  {
    path: '/tesafst2',
    exact: true,
    meta: {
      icon: 'iconyijibaogao',
      name: '测试管理2',
      hidden: true,
    },
    component: EmptyRoute,
  },
  {
    path: '/tegst3',
    exact: true,
    meta: {
      icon: 'iconyijibaogao',
      name: '测试管理3',
      hidden: true,
    },
    component: EmptyRoute,
  },
  {
    path: '/tegst10',
    exact: true,
    meta: {
      icon: 'iconyijibaogao',
      name: '测试管理4',
      hidden: true,
    },
    component: EmptyRoute,
  },
  {
    path: '/tefsfst9',
    exact: true,
    meta: {
      icon: 'iconyijibaogao',
      name: '测试管理4',
      hidden: true,
    },
    component: EmptyRoute,
  },
  {
    path: '/te43st8',
    exact: true,
    meta: {
      icon: 'iconyijibaogao',
      name: '测试管理4',
      hidden: true,
    },
    component: EmptyRoute,
  },
  {
    path: '/te23st5',
    exact: true,
    meta: {
      icon: 'iconyijibaogao',
      name: '测试管理4',
      hidden: true,
    },
    component: EmptyRoute,
  },
  {
    path: '/test236',
    exact: true,
    meta: {
      icon: 'iconyijibaogao',
      name: '测试管理4',
      hidden: true,
    },
    component: EmptyRoute,
  },
  {
    path: '/tes2t7',
    exact: true,
    meta: {
      icon: 'iconyijibaogao',
      name: '测试管理4',
      hidden: true,
    },
    component: EmptyRoute,
  },
]

export default routeItems
