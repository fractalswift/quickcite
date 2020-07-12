import React, { createContext, useState, useEffect } from 'react';

import useAuth from '../hooks/useAuth';
import useSaved from '../hooks/useSaved';
import useCitations from '../hooks/useCitations';

const UserContext = createContext([{}, () => {}]);

const UserProvider = (props) => {
  const {
    isSignedIn,
    getUser,
    getUserStatus,
    user,
    signOut,
    signIn,
  } = useAuth();

  const {
    savedArticles,
    getSavedArticles,
    unsaveArticle,
    saveArticle,
  } = useSaved();

  const {
    collections,
    getCollections,
    createCollection,
    saveCitation,
    deleteCollection,
    trigger,
  } = useCitations();

  useEffect(() => {
    getUserStatus();
    if (isSignedIn) {
      getUser();
      getSavedArticles(user.uid);
      getCollections(user.uid);
    }
  }, [isSignedIn, user, trigger]);

  return (
    <UserContext.Provider
      value={{
        isSignedIn,
        user,
        savedArticles,
        signOut,
        signIn,
        saveArticle,
        unsaveArticle,
        getSavedArticles,
        collections,
        createCollection,
        getCollections,
        deleteCollection,
        saveCitation,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
