// React
import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import { NavItem } from 'reactstrap';

// Component and helpers
import Profile from './containers/Profile';
import Users from './components/Users';
import UserEdit from './containers/UserEdit';
import Register from './containers/Register';
import Login from './containers/Login';
import ForgotPassword from './containers/ForgotPassword';
import ResetPassword from './containers/ResetPassword';
import reducers from './reducers';

import { AuthRoute, AuthNav, AuthLogin, AuthProfile } from './containers/Auth';

import Feature from '../connector';

function tokenMiddleware(req, options) {
  options.headers['x-token'] = window.localStorage.getItem('token');
  options.headers['x-refresh-token'] = window.localStorage.getItem('refreshToken');
}

function tokenAfterware(res, options) {
  const token = options.headers['x-token'];
  const refreshToken = options.headers['x-refresh-token'];
  if (token) {
    window.localStorage.setItem('token', token);
  }
  if (refreshToken) {
    window.localStorage.setItem('refreshToken', refreshToken);
  }
}

function connectionParam() {
  return {
    token: window.localStorage.getItem('token'),
    refreshToken: window.localStorage.getItem('refreshToken')
  };
}

export default new Feature({
  route: [
    <AuthRoute exact path="/profile" role="user" component={Profile} />,
    <AuthRoute exact path="/users" role="admin" component={Users} />,
    <Route exact path="/users/:id" component={UserEdit} />,
    <Route exact path="/register" component={Register} />,
    <Route exact path="/login" component={Login} />,
    <Route exact path="/forgot-password" component={ForgotPassword} />,
    <Route exact path="/reset-password/:token" component={ResetPassword} />
  ],
  navItem: [
    <NavItem>
      <AuthNav role="admin">
        <NavLink to="/users" className="nav-link" activeClassName="active">
          Users
        </NavLink>
      </AuthNav>
    </NavItem>
  ],
  navItemRight: [
    <NavItem>
      <AuthProfile />
    </NavItem>,
    <NavItem>
      <AuthLogin>
        <span className="nav-link">
          <NavLink to="/login" activeClassName="active">
            Login
          </NavLink>{' '}
          /{' '}
          <NavLink to="/register" activeClassName="active">
            Register
          </NavLink>
        </span>
      </AuthLogin>
    </NavItem>
  ],
  reducer: { user: reducers },
  middleware: tokenMiddleware,
  afterware: tokenAfterware,
  connectionParam: connectionParam
});
