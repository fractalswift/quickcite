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

  const { savedArticles, getSavedArticles } = useSaved();

  useEffect(() => {
    getUserStatus();
    if (isSignedIn) {
      getUser();
      getSavedArticles(user.uid);
    }
  }, [isSignedIn]);

  return (
    <UserContext.Provider
      value={{ isSignedIn, user, savedArticles, signOut, signIn }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
