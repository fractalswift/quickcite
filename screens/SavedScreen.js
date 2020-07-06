import checkAuth from '../hooks/checkAuth';

import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import NotLoggedIn from '../components/NotLoggedIn';

import Selector from '../components/Selector';
import AllSaved from '../components/AllSaved';

import useSavedArticles from '../hooks/useSavedArticles';

export default function SavedScreen({ navigation }) {
  const [getUserStatus, isSignedIn, currentUser] = checkAuth();

  // choose whether we display articles or citations component
  const [page, setPage] = useState('Articles');

  const [
    savedArticles,
    setSavedArticles,
    getSavedArticles,
    unsaveArticle,
  ] = useSavedArticles();

  // Get the user's saved articles on sign in / first load
  useEffect(() => {
    console.log('useEffect savedScreen');
    getUserStatus();
    if (isSignedIn) {
      getSavedArticles(currentUser.uid);
    }
  }, [currentUser]);

  return (
    <View style={styles.container}>
      <Selector
        page={page}
        setPage={setPage}
        titles={['Articles', 'Citations']}
      />

      <View>
        {isSignedIn ? (
          <AllSaved
            navigation={navigation}
            page={page}
            savedArticles={savedArticles}
            unsaveArticle={unsaveArticle}
          />
        ) : (
          <ScrollView>
            <NotLoggedIn screenTitle='saved articles and citations' />
          </ScrollView>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fafafa',
  },
});
