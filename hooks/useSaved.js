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

  // This adds saved article to user profile

  const saveArticle = async (articleDetails) => {
    const response = await firebase
      .database()
      .ref(`users/${currentUser.uid}/savedArticles`)
      .push(articleDetails);

    // Change the save icon to unsave
    setIsSaved(true);
  };

  return {
    getSavedArticles,
    savedArticles,
  };
};

export default useSaved;
