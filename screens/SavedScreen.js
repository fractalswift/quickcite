import firebase from 'firebase';
import checkAuth from '../hooks/checkAuth';

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import NotLoggedIn from '../components/NotLoggedIn';

import Selector from '../components/Selector';
import AllSaved from '../components/AllSaved';

export default function SavedScreen({ navigation }) {
  const [getUserStatus, isSignedIn, currentUser] = checkAuth();

  // choose whether we display articles or citations component
  const [page, setPage] = useState('Articles');

  const [savedArticles, setSavedArticles] = useState([]);

  const getSavedArticles = async (userId) => {
    const articles = await firebase
      .database()
      .ref(`users/${currentUser.uid}/savedArticles`)
      .once('value', (snapshot) => {
        if (snapshot.val()) {
          setSavedArticles(Object.values(snapshot.val()));
        }
        // setSavedArticles(snapshot);
      });
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
        } else {
          console.log('not there in the first place');
        }
      });
  };

  useEffect(() => {
    getUserStatus();
    if (isSignedIn) {
      getSavedArticles(currentUser.uid);
    }
  }, [isSignedIn, savedArticles]);

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
