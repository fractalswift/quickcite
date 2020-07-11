import React, { createContext, useState, useEffect } from 'react';

import useAuth from '../hooks/useAuth';
import useSaved from '../hooks/useSaved';

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

  useEffect(() => {
    getUserStatus();
    if (isSignedIn) {
      getUser();
      getSavedArticles(user.uid);
    }
  }, [isSignedIn, user]);

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
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
