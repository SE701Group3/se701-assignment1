import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Switch } from "react-router-dom";


import Frontpage from "./pages/Frontpage";
import CreatePost from "./pages/CreatePost"
import './App.css';

const paths = {
  FRONTPAGE: '/',
  CREATE_POST: '/new'
}

function App() {
  return (
    <Router>
    <Switch>
      <Route exact path={paths.FRONTPAGE} component={Frontpage} />
      <Route exact path={paths.CREATE_POST} component={CreatePost} />
    </Switch>
    </Router>
  );
}

export default App;
