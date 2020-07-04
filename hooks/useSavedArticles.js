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

  return [savedArticles, setSavedArticles, getSavedArticles];
};
