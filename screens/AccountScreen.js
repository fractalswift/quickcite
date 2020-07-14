import React, { useEffect, useContext } from 'react';

import { StyleSheet, View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import Colors from '../constants/Colors';

import { BigButton } from '../components/common';

import NotLoggedIn from '../components/NotLoggedIn';

import { UserContext } from '../providers/UserContext';

import { Alert } from '../components/common';

export default function AccountScreen() {
  const { isSignedIn, signOut, user, resetPassword } = useContext(UserContext);

  useEffect(() => {
    console.log('useEffect in Account Screen called, isSignedIn =', isSignedIn);
    console.log('USER', user.email);
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
              label='Reset password'
              icon='md-key'
              color={Colors.tintColor}
              onPress={() => {
                resetPassword(user.email);
                alert('Please check your email for the reset link.');
              }}
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
