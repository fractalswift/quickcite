import firebase from 'firebase';
import { useContext, useState } from 'react';
import { AuthContext } from '../providers/AuthContext';

const useSaved = () => {
  const [state, setState] = useContext(AuthContext);

  const getSavedArticles = async (userId) => {
    console.log('calling getSavedArticles from useSaved');

    if (state.user.currentUser) {
      const articles = await firebase
        .database()
        .ref(`users/${state.user.currentUser.uid}/savedArticles`)
        .once('value');

      if (!articles.toJSON()) {
        setState({ ...state, savedArticles: [] });
      } else {
        const updatedArticles = await Object.values(articles.toJSON());
        setState({ ...state, savedArticles: updatedArticles });
        console.log(state);
      }
    }
  };

  return {
    getSavedArticles,
  };
};

export default useSaved;
