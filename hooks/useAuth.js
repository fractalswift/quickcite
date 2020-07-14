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
        console.log('useAuth hook says isSignedIn = ', isSignedIn);
        setSignedIn(false);
      }
      unsubscribe();
    });
  };

  const getUser = async () => {
    console.log('calling getUser from useAuth');
    const user = await firebase.auth().currentUser;
    if (user) {
      console.log('setting user');
      setUser(user);
    }
  };

  const signIn = async (email, password) => {
    try {
      let response = await firebase
        .auth()
        .signInWithEmailAndPassword(email.toString().trim(), password);

      // once we are signed in reset the user object so it is passed down
      if (response) {
        console.log('succes, response =', response);
        getUser();
        getUserStatus();
      }
    } catch (error) {
      console.log('error signing in:');
      console.log(error);
    }
  };

  const signOut = async () => {
    console.log('signing out...');
    let response = firebase.auth().signOut();

    if (response) {
      getUserStatus();
    }
  };

  const resetPassword = async (userEmail) => {
    console.log('sending reset email');

    try {
      const response = await auth.sendPasswordResetEmail(userEmail);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getUserStatus,
    getUser,
    isSignedIn,
    user,
    signIn,
    signOut,
    resetPassword,
  };
};

export default useAuth;
