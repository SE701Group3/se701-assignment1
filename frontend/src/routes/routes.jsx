import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Frontpage from '../pages/Frontpage';
import CreatePost from '../pages/CreatePost';
import PostDetail from '../pages/PostDetail';

const paths = {
  FRONTPAGE: '/',
  CREATE_POST: '/new',
  POST_DETAILS: '/post',
};

const routes = (
  <Switch>
    <Route exact path={paths.FRONTPAGE} component={Frontpage} />
    <Route exact path={paths.CREATE_POST} component={CreatePost} />
    <Route exact path={paths.POST_DETAILS} component={PostDetail} />
  </Switch>
);

export default routes;
