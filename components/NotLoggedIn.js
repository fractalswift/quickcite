import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const NotLoggedIn = ({ screenTitle }) => {
  const [isSignUp, setIsSignUp] = useState(false);

  if (isSignUp) {
    return (
      <View>
        <Text>Please log in to see your {screenTitle}</Text>
        <SignupForm />
        <Text style={styles.switch}>Already have an account?</Text>
        <Text style={styles.switch} onPress={() => setIsSignUp(false)}>
          Sign In
        </Text>
      </View>
    );
  } else {
    return (
      <View>
        <Text>Please log in to see your {screenTitle}</Text>
        <LoginForm />
        <Text style={styles.switch}>Don't have an account?</Text>
        <Text style={styles.switch} onPress={setIsSignUp}>
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
  },
});

export default NotLoggedIn;
