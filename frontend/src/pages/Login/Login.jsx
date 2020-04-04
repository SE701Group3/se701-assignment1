import React from 'react';
import { StyledFirebaseAuth } from 'react-firebaseui';
import firebase from 'firebase';

const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
  callbacks: {
    signInSuccessWithAuthResult: (authResult, redirectUrl) => {
      console.log(authResult);
      console.log(redirectUrl);
      return false;
    },
  },
};

const Login = () => {
  return <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />;
};

export default Login;
