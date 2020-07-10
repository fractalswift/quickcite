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

  return {
    getSavedArticles,
    savedArticles,
  };
};

export default useSaved;
