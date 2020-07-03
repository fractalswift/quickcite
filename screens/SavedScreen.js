import firebase from 'firebase';
import checkAuth from '../hooks/checkAuth';

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import NotLoggedIn from '../components/NotLoggedIn';

import Selector from '../components/Selector';
import AllSaved from '../components/AllSaved';

const dummyData = [
  {
    title:
      ' est ex dolor anim ullamco do. Ad do labore labore pariatur dolore. Laborum laborum amet dolore sit eu et adipisicing nostrud quis. Enim fugiat nulla nisi ullamco dolor sint excepteur nostrud culpa reprehenderit dolore laborum reprehenderit cillum. Consectetur cupidatat eiusmod sunt elit incididunt commodo dolore veniam fugiat.',
    doi: '3262738:wejklj',
    identifier: '12dft003',
  },
  {
    title:
      ' ex dolor anim ullamco do. Ad do labore labore pariatur dolore. Laborum laborum amet dolore sit eu et adipisicing nostrud quis. Enim fugiat nulla nisi ullamco dolor sint excepteur nostrud culpa reprehenderit dolore laborum reprehenderit cillum. Consectetur cupidatat eiusmod sunt elit incididunt commodo dolore veniam fugiat.',
    doi: '3262738:wejklj',
    identifier: '12df4t43',
  },
  {
    title:
      'lamco do. Ad do labore labore pariatur dolore. Laborum laborum amet dolore sit eu et adipisicing nostrud quis. Enim fugiat nulla nisi ullamco dolor sint excepteur nostrud culpa reprehenderit dolore laborum reprehenderit cillum. Consectetur cupidatat eiusmod sunt elit incididunt commodo dolore veniam fugiat.',
    doi: '3262738:wejklj',
    identifier: '122dft43',
  },
  {
    title:
      'bore pariatur dolore. Laborum laborum amet dolore sit eu et adipisicing nostrud quis. Enim fugiat nulla nisi ullamco dolor sint excepteur nostrud culpa reprehenderit dolore laborum reprehenderit cillum. Consectetur cupidatat eiusmod sunt elit incididunt commodo dolore veniam fugiat.',
    doi: '3262738:wejklj',
    identifier: '12dft43',
  },
  {
    title:
      'pariatur dolore. Laborum laborum amet dolore sit eu et adipisicing nostrud quis. Enim fugiat nulla nisi ullamco dolor sint excepteur nostrud culpa reprehenderit dolore laborum reprehenderit cillum. Consectetur cupidatat eiusmod sunt elit incididunt commodo dolore veniam fugiat.',
    doi: '3262738:wejklj',
    identifier: '12dft23',
  },
  {
    title:
      ' Laborum laborum amet dolore sit eu et adipisicing nostrud quis. Enim fugiat nulla nisi ullamco dolor sint excepteur nostrud culpa reprehenderit dolore laborum reprehenderit cillum. Consectetur cupidatat eiusmod sunt elit incididunt commodo dolore veniam fugiat.',
    doi: '3262738:wejklj',
    identifier: '12dgt43',
  },
];

export default function SavedScreen({ navigation }) {
  const [getUserStatus, isSignedIn] = checkAuth();

  // choose whether we display articles or citations component
  const [page, setPage] = useState('Articles');

  const [savedArticles, setSavedArticles] = useState([]);

  const { currentUser } = firebase.auth();

  const getSavedArticles = async (userId) => {
    console.log(currentUser.uid);
    const articles = await firebase
      .database()
      .ref(`users/${currentUser.uid}/savedArticles`)
      .once('value', (snapshot) => {
        setSavedArticles(Object.values(snapshot.val()));
        console.log(savedArticles);
        // setSavedArticles(snapshot);
      });
  };

  useEffect(() => {
    getUserStatus();
    if (isSignedIn) {
      getSavedArticles(currentUser.uid);
    }
  }, []);

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
