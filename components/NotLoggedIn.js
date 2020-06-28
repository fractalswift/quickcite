import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const NotLoggedIn = ({ screenTitle }) => {
  const [isSignUp, setIsSignUp] = useState(false);

  if (isSignUp) {
    return (
      <View>
        <Text style={styles.notice}>Please sign up to use {screenTitle}.</Text>
        <SignupForm />
        <Text style={styles.switch}>Already have an account?</Text>
        <Text style={styles.signUp} onPress={() => setIsSignUp(false)}>
          Sign In
        </Text>
      </View>
    );
  } else {
    return (
      <View>
        <Text style={styles.notice}>
          Please sign in to see your {screenTitle}.
        </Text>
        <LoginForm />
        <Text style={styles.switch}>Don't have an account?</Text>
        <Text style={styles.signUp} onPress={setIsSignUp}>
          Sign Up
        </Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  switch: {
    fontSize: 20,
    marginTop: 20,
    textAlign: 'center',
    marginTop: 40,
    marginLeft: 40,
    marginRight: 40,
  },
  notice: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    marginLeft: 40,
    marginRight: 40,
  },
  signUp: {
    fontSize: 24,
    marginTop: 10,
    textAlign: 'center',
    marginTop: 20,
    marginLeft: 40,
    marginRight: 40,
    textDecorationLine: 'underline',
    color: '#2f95dc',
  },
});

export default NotLoggedIn;
