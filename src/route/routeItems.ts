/** @format */

import React from 'react'
import EmptyRoute from './EmptyRoute'
import Login from '../view/login/Login'
import {RouteComponentProps} from 'react-router'

type ComponentType = React.ComponentType<RouteComponentProps<any>> & React.ComponentType<any> & {name: string}
export interface RouteItem {
  path: string
  exact: boolean
  meta: {
    name: string
    icon: Function | string
    hidden?: boolean
  }
  component: ComponentType
  routes?: Array<RouteItem>
}

const routeItems: Array<RouteItem> = [
  {
    path: '/test',
    exact: true,
    meta: {
      icon: 'iconyijibaogao',
      name: '测',
      hidden: true,
    },
    component: EmptyRoute,
    routes: [
      {
        path: '/test/1',
        exact: true,
        meta: {
          icon: 'iconuser',
          name: '测试',
        },
        component: EmptyRoute,
      },
    ],
  },
  {
    path: '/test/2',
    exact: true,
    meta: {
      icon: 'iconuser',
      name: '测试2',
    },
    component: EmptyRoute,
  },
]

export default routeItems
