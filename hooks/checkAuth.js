import firebase from 'firebase';

import { useState } from 'react';
import springer from '../api/springer';
import api_keys from '../env/api_keys.json';

export default () => {
  const [isSignedIn, setSignedIn] = useState(false);

  const getUserStatus = async () => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        console.log('user is signed in');
        setSignedIn(true);
      } else {
        // No user is signed in.
        console.log('no user is signed in');
        setSignedIn(false);
      }
    });
  };

  return [getUserStatus, isSignedIn];
};
