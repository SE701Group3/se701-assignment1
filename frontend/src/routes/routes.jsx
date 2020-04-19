import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Frontpage from '../pages/Frontpage/frontpage';
import PostDetail from '../pages/PostDetail';
import Login from '../common/Header/Login';

// This component allows for easy additions for additional pages
const paths = {
  FRONTPAGE: '/',
  POST_DETAILS: '/post',
  LOGIN: '/login',
};

const routes = (
  <Switch>
    <Route exact path={paths.FRONTPAGE} component={Frontpage} />
    <Route exact path={`${paths.POST_DETAILS}/:id`} component={PostDetail} />
    <Route exact path={paths.LOGIN} component={Login} />
  </Switch>
);

export default routes;
