import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import paths from './paths';
import PrivateRoute from './PrivateRoute';
import Login from '../Login';
import Home from '../Home';
import Users from '../Users';
import Profile from '../Profile';
import ResetPassword from '../ResetPassword';
import NotFound from '../NotFound';
import User from '../User';
import Section from '../Section';
import Submenu from '../Submenu';

const RouterComponent = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={paths.LOGIN} component={Login} />
        <Route exact path={paths.RESET_PASSWORD} component={ResetPassword} />
        <PrivateRoute path={paths.ADD_USER} component={User} />
        <PrivateRoute path={paths.MODIFY_USER} component={User} />
        <PrivateRoute path={paths.USERS} component={Users} />
        <PrivateRoute path={paths.PROFILE} component={Profile} />
        <PrivateRoute path={paths.SECTION} component={Section} />
        <PrivateRoute path={paths.SUBMENU_1} component={Submenu} />
        <PrivateRoute path={paths.SUBMENU_2} component={Submenu} />
        <PrivateRoute path={paths.ROOT} component={Home} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default RouterComponent;
