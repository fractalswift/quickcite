import React, { useEffect, useContext } from 'react';

import { StyleSheet, View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import Colors from '../constants/Colors';

import { BigButton } from '../components/common';

import useAuth from '../hooks/useAuth';
import NotLoggedIn from '../components/NotLoggedIn';

import { UserContext } from '../providers/UserContext';

export default function AccountScreen() {
  const { isSignedIn, signOut } = useContext(UserContext);

  const { getUserStatus } = useAuth();

  useEffect(() => {
    console.log('useEffect in Account Screen called, isSignedIn =', isSignedIn);
  });

  if (isSignedIn) {
    return (
      <View style={styles.container}>
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
              onPress={getUserStatus}
            />
            <BigButton
              label='Text size'
              icon='md-resize'
              color={Colors.tintColor}
            />
          </View>
        </ScrollView>
      </View>
    );
  } else {
    return <NotLoggedIn screenTitle='settings' />;
  }
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
