import React from 'react';
import { StyledFirebaseAuth } from 'react-firebaseui';
import firebase from 'firebase';

import './Login.css';

/**
 * This Method is for getting the authentication token for the current logged in user from the
 * cookies within your browser. It returns the Authentication token if it exists, otherwise an empty
 * string
 *
 * @returns {string} which is the auth token
 * @constructor
 */
const getAuthToken = () => {
  const cookieName = 'threaderAuthToken';
  // Get name followed by anything except a semicolon
  const cookieString = RegExp(`${cookieName}=[^;]+`).exec(document.cookie);
  // Return everything after the equal sign, or an empty string if the cookie name not found
  return decodeURIComponent(cookieString ? cookieString.toString().replace(/^[^=]+./, '') : '');
};

const Login = ({ handleLogin, displayProfile }) => {
  const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccessWithAuthResult: (authResult, redirectUrl) => {
        console.log(authResult.credential.idToken); // eslint-disable-line no-console
        console.log(redirectUrl); // eslint-disable-line no-console
        document.cookie = `threaderAuthToken=${authResult.user.xa}`;
        handleLogin(true, authResult.user.displayName, authResult.user.photoURL);

        return true;
      },
    },
  };

  return (
    <div className="rootLogin">
      {displayProfile.isLoggedIn ? (
        <div className="displayWrapper">
          <img className="displayImage" src={displayProfile.displayImage} alt="Profile Img" />
          <div className="displayName">{displayProfile.displayName}</div>
        </div>
      ) : (
        <StyledFirebaseAuth
          className="styledFirebaseAuth"
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      )}
    </div>
  );
};

export { Login, getAuthToken };
