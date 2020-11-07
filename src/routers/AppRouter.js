import React, { useContext } from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { LoginScreen } from '../components/login/LoginScreen'
import { DashboardRoutes } from './DashboardRoutes'
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute'
import { AuthContext } from '../auth/AuthContext';
import { SignupScreen } from '../components/login/SignupScreen';

export const AppRouter = () => {
    const {user} = useContext(AuthContext)
    return (
        <Router>
            <div>
                <Switch>
                  <PublicRoute exact path="/login" component={LoginScreen} isAuthenticated = {user.logged}/>
                  <PublicRoute path="/signup" component={SignupScreen} isAuthenticated = {user.logged}/>
                  <PrivateRoute path="/" component ={DashboardRoutes} isAuthenticated={user.logged}/>
                </Switch>
            </div>
        </Router>
    )
}
