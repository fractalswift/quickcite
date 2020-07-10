import firebase from 'firebase';

import React, { useEffect, useContext } from 'react';

import { StyleSheet, View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import Colors from '../constants/Colors';

import { BigButton } from '../components/common';

import checkAuth from '../hooks/checkAuth';
import NotLoggedIn from '../components/NotLoggedIn';

import { UserContext, UserProvider } from '../providers/UserContext';

import Message from './Message';

export default function AccountScreen() {
  const [getUserStatus, isSignedIn] = checkAuth();

  const [state, setState] = useContext(UserContext);

  useEffect(() => {
    getUserStatus();
  }, [isSignedIn, state]);

  const signOut = () => {
    console.log('signing out');
    firebase.auth().signOut();
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Message />
        <BigButton
          label='Change State'
          icon='md-log-out'
          onPress={() =>
            setState((state) => ({ ...state, testState: 'Clicked!' }))
          }
          color={Colors.tintColor}
        />
        {isSignedIn ? (
          <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
          >
            <View style={styles.welcomeContainer}>
              <BigButton
                label='Sign out'
                icon='md-log-out'
                onPress={signOut}
                color={Colors.tintColor}
              />
              <BigButton
                label='Dark mode'
                icon='md-moon'
                color={Colors.tintColor}
              />
              <BigButton label='Sync' icon='md-sync' color={Colors.tintColor} />
              <BigButton
                label='Security'
                icon='md-key'
                color={Colors.tintColor}
              />
              <BigButton
                label='Text size'
                icon='md-resize'
                color={Colors.tintColor}
              />
            </View>
          </ScrollView>
        ) : (
          <NotLoggedIn screenTitle='account settings' />
        )}
      </ScrollView>
    </View>
  );
}

AccountScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  contentContainer: {
    paddingTop: 30,
  },

  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
});
