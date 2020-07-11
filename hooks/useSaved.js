import firebase from 'firebase';
import { useState } from 'react';

const useSaved = () => {
  const [savedArticles, setSavedArticles] = useState([]);

  const getSavedArticles = async (userId) => {
    console.log('calling getSavedArticles from useSaved');

    const articles = await firebase
      .database()
      .ref(`users/${userId}/savedArticles`)
      .once('value');

    if (!articles.toJSON()) {
      setSavedArticles([]);
    } else {
      const updatedArticles = await Object.values(articles.toJSON());
      setSavedArticles(updatedArticles);
    }
  };

  const unsaveArticle = async (userId, doi) => {
    firebase
      .database()
      .ref(`users/${userId}/savedArticles`)
      .orderByChild('doi')
      .equalTo(doi)
      .once('value', (snapshot) => {
        if (snapshot.exists()) {
          const userData = snapshot.val();
          const key = Object.keys(userData)[0];

          firebase
            .database()
            .ref(`users/${userId}/savedArticles/${key}`)
            .remove();

          console.log('deleted');
          // update the savedArticles state
          getSavedArticles(userId);
        } else {
          console.log('not there in the first place');
        }
      });
  };

  // This adds saved article to user profile

  const saveArticle = async (articleDetails, userId) => {
    const response = await firebase
      .database()
      .ref(`users/${userId}/savedArticles`)
      .push(articleDetails);

    // update the savedArticles state
    getSavedArticles(userId);
  };

  return {
    getSavedArticles,
    saveArticle,
    unsaveArticle,
    savedArticles,
  };
};

export default useSaved;
