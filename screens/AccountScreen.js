import firebase from 'firebase';

import React, { useEffect } from 'react';

import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import Colors from '../constants/Colors';

import BigButton from '../components/BigButton';

import checkAuth from '../hooks/checkAuth';
import NotLoggedIn from '../components/NotLoggedIn';

export default function AccountScreen() {
  const [getUserStatus, isSignedIn] = checkAuth();

  useEffect(() => {
    getUserStatus();
  }, [isSignedIn]);

  const signOut = () => {
    console.log('signing out');
    firebase.auth().signOut();
  };

  return (
    <View style={styles.container}>
      <ScrollView>
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

function DevelopmentModeNotice() {
  if (__DEV__) {
    const learnMoreButton = (
      <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
        Learn more
      </Text>
    );

    return (
      <Text style={styles.developmentModeText}>
        Development mode is enabled: your app will be slower but you can use
        useful development tools. {learnMoreButton}
      </Text>
    );
  } else {
    return (
      <Text style={styles.developmentModeText}>
        You are not in development mode: your app will run at full speed.
      </Text>
    );
  }
}

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/development-mode/'
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/get-started/create-a-new-app/#making-your-first-change'
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
