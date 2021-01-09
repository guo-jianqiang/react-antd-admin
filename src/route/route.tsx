import React from "react"
import {Router, Switch, Redirect, Route} from 'react-router-dom'
import {LOGIN_PATH} from '../constant'
import history from "./history";
import Login from "../view/login";

const Routes = () => {
    return <Router history={history}>
        <Switch>
            {/*<Route exact path="/">*/}
            {/*    <Redirect to={LOGIN_PATH} />*/}
            {/*</Route>*/}
            <Route exact path={LOGIN_PATH} component={Login} />
            <Redirect to={LOGIN_PATH} from={'/'} />
        </Switch>
    </Router>
}

export default Routes