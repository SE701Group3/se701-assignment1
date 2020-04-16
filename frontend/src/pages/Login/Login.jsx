import React from 'react';
import { StyledFirebaseAuth } from 'react-firebaseui';
import firebase from 'firebase';

const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
  callbacks: {
    signInSuccessWithAuthResult: (authResult, redirectUrl) => {
      console.log(authResult.credential.idToken); // eslint-disable-line no-console
      document.cookie = `threaderAuthToken=${authResult.credential.idToken}`;
      console.log(redirectUrl); // eslint-disable-line no-console
      console.log(firebase.auth().currentUser.getIdToken(false)); // eslint-disable-line no-console
      return false;
    },
  },
};

const Login = () => {
  return <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />;
};

export default Login;
