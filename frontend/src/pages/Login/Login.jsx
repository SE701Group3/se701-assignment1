import React from 'react';
import { StyledFirebaseAuth } from 'react-firebaseui';
import firebase from 'firebase';

const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
  callbacks: {
<<<<<<< 777c1ec7d7cab2c58e562879ab3cd397808329a5
    signInSuccessWithAuthResult: () => {
=======
    signInSuccessWithAuthResult: (authResult, redirectUrl) => {
      console.log(authResult);
      console.log(redirectUrl);
>>>>>>> add Login page containing login with google button, returns info about user
      return false;
    },
  },
};

const Login = () => {
  return <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />;
};

export default Login;
