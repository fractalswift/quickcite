import React, { createContext, useState, useEffect } from 'react';

import useAuth from '../hooks/useAuth';
import useSaved from '../hooks/useSaved';

const UserContext = createContext([{}, () => {}]);

const UserProvider = (props) => {
  const { isSignedIn, getUser, getUserStatus, user } = useAuth();

  const { savedArticles, getSavedArticles } = useSaved();

  useEffect(() => {
    getUserStatus();
    if (isSignedIn) {
      getUser();
      getSavedArticles(user.uid);
    }
  }, []);

  return (
    <UserContext.Provider value={{ isSignedIn, user, savedArticles }}>
      {props.children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
