import firebase from 'firebase';

import { useState } from 'react';

export default () => {
  const [isSignedIn, setSignedIn] = useState(false);

  const getUserStatus = async () => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        console.log('user is signed in');
        let { currentUser } = firebase.auth();
        setSignedIn(true);
      } else {
        // No user is signed in.
        console.log('no user is signed in');
        setSignedIn(false);
      }
    });
  };

  const { currentUser } = firebase.auth();

  return [getUserStatus, isSignedIn, currentUser];
};
