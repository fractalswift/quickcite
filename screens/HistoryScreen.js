import firebase from 'firebase';
import checkAuth from '../hooks/checkAuth';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import NotLoggedIn from '../components/NotLoggedIn';
import SavedItem from '../components/SavedItem';
import BigButton from '../components/BigButton';

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

export default function HistoryScreen() {
  const [getUserStatus, isSignedIn] = checkAuth();

  useEffect(() => {
    getUserStatus();
  }, [isSignedIn]);

  console.log('signed in? :', isSignedIn);

  return (
    <View style={styles.container}>
      <Text style={styles.articleCount}>
        You have 21 articles in your reading history
      </Text>
      <BigButton label={'Clear all'} icon='md-add-circle' color={'crimson'} />

      <ScrollView>
        {isSignedIn ? (
          <SavedItem
            articleTitle={'An article you read'}
            doi={'fdfwerwdsfsd'}
          />
        ) : (
          <NotLoggedIn screenTitle='history' />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  articleCount: {
    fontSize: 16,
    marginTop: 15,
    textAlign: 'center',
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
