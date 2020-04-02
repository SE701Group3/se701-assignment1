import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import firebase from 'firebase/app';

import './App.css';
import routes from './routes/routes';

import firebaseConfig from './firebaseConfig';
firebase.initializeApp(firebaseConfig);

function App() {
  return (
    <Router>
      <div className="App">{routes}</div>
    </Router>
  );
}

export default App;
