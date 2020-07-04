import firebase from 'firebase';
import { useEffect, useState } from 'react';
import checkAuth from '../hooks/checkAuth';

export default () => {
  const [savedArticles, setSavedArticles] = useState([]);
  const [getUserStatus, isSignedIn, currentUser] = checkAuth();

  const getSavedArticles = async (userId) => {
    const articles = await firebase
      .database()
      .ref(`users/${currentUser.uid}/savedArticles`)
      .once('value', (snapshot) => {
        if (snapshot.val()) {
          // TODO clean this up
        }
      });

    if (!articles.toJSON()) {
      setSavedArticles([]);
    } else {
      const updatedArticles = Object.values(articles.toJSON());
      setSavedArticles(updatedArticles);
    }
  };

  const unsaveArticle = async (doi) => {
    firebase
      .database()
      .ref(`users/${currentUser.uid}/savedArticles`)
      .orderByChild('doi')
      .equalTo(doi)
      .once('value', (snapshot) => {
        if (snapshot.exists()) {
          const userData = snapshot.val();
          const key = Object.keys(userData)[0];

          firebase
            .database()
            .ref(`users/${currentUser.uid}/savedArticles/${key}`)
            .remove();

          console.log('deleted');
          // update the savedArticles state
          getSavedArticles(currentUser.uid);
        } else {
          console.log('not there in the first place');
        }
      });
  };

  return [savedArticles, setSavedArticles, getSavedArticles, unsaveArticle];
};
