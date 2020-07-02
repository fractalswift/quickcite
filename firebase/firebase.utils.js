const firebase = require('firebase');
// Required for side-effects
require('firebase/firestore');

const config = require('../env/firebaseConfig');

// // Initialize Cloud Firestore through Firebase
// firebase.initializeApp(config);

// const db = firebase.firestore();

export const addData = async () => {
  db.collection('users')
    .add({
      first: 'Ada',
      last: 'Lovelace',
      born: 1815,
    })
    .then(function (docRef) {
      console.log('Document written with ID: ', docRef.id);
    })
    .catch(function (error) {
      console.error('Error adding document: ', error);
    });
};

export const hello = () => {
  db.collection('users')
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
      });
    });
};
