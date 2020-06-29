import firebase from 'firebase';
import checkAuth from '../hooks/checkAuth';

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import NotLoggedIn from '../components/NotLoggedIn';

import Selector from '../components/Selector';
import SavedArticlesList from '../components/SavedArticlesList';

export default function SavedScreen() {
  const [getUserStatus, isSignedIn] = checkAuth();

  const [page, setPage] = useState('Articles');

  useEffect(() => {
    getUserStatus();
  });

  return (
    <View style={styles.container}>
      {isSignedIn ? (
        <ScrollView>
          <Selector
            page={page}
            setPage={setPage}
            titles={['Articles', 'Citations']}
          />
          <SavedArticlesList />
        </ScrollView>
      ) : (
        <View>
          <NotLoggedIn screenTitle='saved articles and citations' />
        </View>
      )}
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
