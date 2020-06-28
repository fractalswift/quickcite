import firebase from 'firebase';

import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import NotLoggedIn from '../components/NotLoggedIn';

export default function HistoryScreen() {
  const [isSignedIn, setSignedIn] = useState(false);

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      console.log('user is signed in');
      console.log(user);

      setSignedIn(true);
    } else {
      // No user is signed in.
      console.log('no user is signed in');
      setSignedIn(false);
    }
  });

  console.log('signed in? :', isSignedIn);

  return (
    <View style={styles.container}>
      <ScrollView>
        {isSignedIn ? (
          <Text> Your history here </Text>
        ) : (
          <NotLoggedIn screenTitle='history' />
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
