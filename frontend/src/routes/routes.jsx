import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Frontpage from '../pages/Frontpage/frontpage';
import PostDetail from '../pages/PostDetail';

const paths = {
  FRONTPAGE: '/',
  POST_DETAILS: '/post',
};

const routes = (
  <Switch>
    <Route exact path={paths.FRONTPAGE} component={Frontpage} />
    <Route exact path={`${paths.POST_DETAILS}/:id`} component={PostDetail} />
  </Switch>
);

export default routes;
