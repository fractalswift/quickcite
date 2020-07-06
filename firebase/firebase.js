import firebase from 'firebase/app';
import 'firebase/auth';
// import "firebase/firestore";

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
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
