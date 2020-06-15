import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home'
import Login from './components/Login'
import CreateAccount from './components/CreateAccount'
import Logout from './components/Logout'
import PrivateRoute from './PrivateRoute'
import { UserContextComponent } from './UserContextComponent'

export default class App extends Component {
    displayName = App.name

    render() {
        return (
            <UserContextComponent>
                <Layout>
                    <PrivateRoute exact path='/' component={Home} />
                    <Route exact path='/login' login component={Login} />
                    <Route exact path='/createaccount' component={CreateAccount} />
                    <Route exact path='/logout' component={Logout} />
                </Layout>
            </UserContextComponent>
        );
    }
}
