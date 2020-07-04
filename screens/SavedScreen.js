import firebase from 'firebase';
import checkAuth from '../hooks/checkAuth';

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
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

      <ScrollView>
        {isSignedIn ? (
          <AllSaved
            navigation={navigation}
            page={page}
            savedArticles={savedArticles}
            unsaveArticle={unsaveArticle}
          />
        ) : (
          <NotLoggedIn screenTitle='saved articles and citations' />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  contentContainer: {
    paddingTop: 30,
  },
  optionIconContainer: {
    marginRight: 12,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  option: {
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: '#ededed',
  },
  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionText: {
    fontSize: 15,
    alignSelf: 'flex-start',
    marginTop: 1,
  },
});
