import React from 'react';
import { StyledFirebaseAuth } from 'react-firebaseui';
import firebase from 'firebase';

const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
  callbacks: {
    signInSuccessWithAuthResult: (authResult, redirectUrl) => {
      console.log(authResult.credential.idToken); // eslint-disable-line no-console
      console.log(redirectUrl);
      document.cookie = `threaderAuthToken=${authResult.user.xa}`;

      return true;
    },
  },
  signInSuccessUrl: '/',
};

const GetAuthToken = () => {
  const cookieName = 'threaderAuthToken';
  // Get name followed by anything except a semicolon
  const cookieString = RegExp(`${cookieName}=[^;]+`).exec(document.cookie);
  // Return everything after the equal sign, or an empty string if the cookie name not found
  return decodeURIComponent(cookieString ? cookieString.toString().replace(/^[^=]+./, '') : '');
};

const Login = () => {
  return <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />;
};

export { Login, GetAuthToken };
