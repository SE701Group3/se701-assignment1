import React from 'react';
import { StyledFirebaseAuth } from 'react-firebaseui';
import firebase from 'firebase';

import './Login.css';

const Login = ({ handleLogin, displayProfile }) => {
  const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccessWithAuthResult: (authResult, redirectUrl) => {
        console.log(authResult); // eslint-disable-line no-console
        console.log(redirectUrl); // eslint-disable-line no-console
        console.log(firebase.auth().currentUser.getIdToken(false)); // eslint-disable-line no-console
        handleLogin(true, authResult.user.displayName, authResult.user.photoURL);
        return false;
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

export default Login;
