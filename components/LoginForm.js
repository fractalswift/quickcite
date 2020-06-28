import firebase from 'firebase';
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import FormInput from './FormInput';
import BigButton from './BigButton';
import Alert from './Alert';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignIn = async () => {
    console.log('handle called');
    try {
      console.log('signing in!');
      let response = await firebase
        .auth()
        .signInWithEmailAndPassword(email.toString().trim(), password);
      console.log(response);
    } catch (error) {
      setErrorMessage('SignIn failed - check credentials.');
      console.log(error);
      console.log('email:', email);
      console.log('password:', password);
    }
  };

  return (
    <View
      style={{
        display: 'flex',
        height: 'auto',
        alignItems: 'center',
      }}
    >
      <Text>LOGIN</Text>
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
      <BigButton label='Sign in' onPress={handleSignIn} />
      {errorMessage ? <Alert errorMessage={errorMessage} /> : null}
    </View>
  );
};

export default LoginForm;
