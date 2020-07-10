import firebase from 'firebase';
import { useState } from 'react';

const firebaseConfig = {
  apiKey: 'AIzaSyDcPCEfm-rGSYwyaXj-HIzmwZP1_YAKFQ4',
  authDomain: 'quick-cceec.firebaseapp.com',
  databaseURL: 'https://quick-cceec.firebaseio.com',
  projectId: 'quick-cceec',
  storageBucket: 'quick-cceec.appspot.com',
  messagingSenderId: '1084755414390',
  appId: '1:1084755414390:web:fdc1e0db9f5e37a546be57',
  measurementId: 'G-YDE8TN0TGE',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

const useAuth = () => {
  const [isSignedIn, setSignedIn] = useState(false);
  const [user, setUser] = useState('');

  const getUserStatus = async () => {
    const unsubscribe = firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        console.log('user is signed in');
        setSignedIn(true);
      } else {
        // No user is signed in.
        console.log('no user is signed in');
        setSignedIn(false);
      }
      unsubscribe();
    });
  };

  const getUser = async () => {
    console.log('calling getUser from useAuth');
    const user = await firebase.auth().currentUser;
    if (user) {
      setUser(user);
    }
  };

  return {
    getUserStatus,
    getUser,
    isSignedIn,
    user,
  };
};

export default useAuth;
