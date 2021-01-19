/** @format */

import React, {useEffect, useState} from 'react'
import {Router, Switch, Redirect, Route} from 'react-router-dom'
import {ACCOUNT_INFO, LOGIN_PATH} from '../constant'
import history from './history'
import Login from '../view/login'
import routeItems, {RouteItem} from './routeItems'
import Layout from '../Layout/Layout'
import {UserInterface} from '../lib/userData'
import userContext from '../context/userContext'
import {getFirstRoute, isEmpty} from '../lib/until'
import {getItem} from '../lib/localStorage'

const Routes = () => {
  const [userData, setUserData] = useState<UserInterface | null>(null)
  useEffect(() => {
    if (history.location.pathname !== LOGIN_PATH) {
      if (isEmpty(getItem(ACCOUNT_INFO))) history.push(LOGIN_PATH)
      setUserData(getItem(ACCOUNT_INFO))
    }
  }, [])
  const renderRoutes = () => {
    let routes: Array<React.ReactNode> = []
    const routeMap = (arr: Array<RouteItem>) => {
      arr.forEach(route => {
        if (!route.meta.hidden) {
          routes.push(<Route key={route.path} exact={route.exact} path={route.path} component={route.component} />)
        }
        if (route.routes && route.routes.length) routeMap(route.routes)
      })
    }
    routeMap(routeItems)
    return routes
  }
  const homePath = getFirstRoute(routeItems).path
  return (
    <userContext.Provider
      value={{
        userData,
        setUserData,
      }}>
      <Router history={history}>
        <Switch>
          <Route exact path="/">
            <Redirect to={isEmpty(userData) ? LOGIN_PATH : homePath} />
          </Route>
          <Route exact path={LOGIN_PATH} component={Login} />
          <Layout routeItems={routeItems} userData={userData} history={history}>
            {renderRoutes()}
          </Layout>
        </Switch>
      </Router>
    </userContext.Provider>
  )
}

export default Routes
