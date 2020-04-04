import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import firebase from 'firebase/app';

import './App.css';
import routes from './routes/routes';

const firebaseConfig = JSON.parse(atob(process.env.REACT_APP_FIREBASE_CONFIG));

firebase.initializeApp(firebaseConfig);

function App() {
  return (
    <Router>
      <div className="App">{routes}</div>
    </Router>
  );
}

export default App;
