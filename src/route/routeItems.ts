/** @format */

import React from 'react'
import Login from '../view/login/Login'
export interface Route {
  path: string
  name: string
  meta: {
    icon?: Function | string
    hidden?: boolean
  }
  component: React.ReactNode
  routes?: Array<Route>
}

const routeItems: Array<Route> = [
  {
    path: '/test',
    name: '测试',
    meta: {},
    component: Login,
    routes: [
      {
        path: '/test',
        name: '测试',
        meta: {},
        component: Login,
      },
    ],
  },
]

export default routeItems
