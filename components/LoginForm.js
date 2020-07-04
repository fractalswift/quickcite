import firebase from 'firebase';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FormInput from './FormInput';
import { BigButton, Alert, Spinner } from '../components/common';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Clean up to avoid memory leak from loading state
  useEffect(() => {
    return setLoading(false);
  }, [loading]);

  const handleSignIn = async () => {
    console.log('handle called');
    setLoading(true);
    try {
      console.log('signing in!');
      let response = await firebase
        .auth()
        .signInWithEmailAndPassword(email.toString().trim(), password);
      console.log(response);
      setLoading(false);
    } catch (error) {
      setErrorMessage('SignIn failed - check credentials.');
      setLoading(false);
    }
  };

  return (
    <View style={styles.loginForm}>
      <FormInput
        label='Email'
        value={email}
        onChangeText={setEmail}
        placeholder={'you@email.com'}
      />
      <FormInput
        label='Password'
        value={password}
        onChangeText={setPassword}
        placeholder={'password...'}
        secureTextEntry
      />
      {loading ? (
        <Spinner />
      ) : (
        <BigButton
          color='#2f95dc'
          icon='md-log-in'
          label='Sign In'
          onPress={handleSignIn}
        />
      )}
      {errorMessage ? <Alert errorMessage={errorMessage} /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  loginForm: {
    display: 'flex',
    height: 'auto',
    alignItems: 'center',
  },
});

export default LoginForm;
