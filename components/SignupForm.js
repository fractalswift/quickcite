import firebase from 'firebase';
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import FormInput from './FormInput';
import BigButton from './BigButton';

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [errorMesssage, setErrorMessage] = useState('');

  const handleSignUp = () => {
    console.log('signing up!');
    firebase.auth().createUserWithEmailAndPassword(email, password);
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
      <FormInput
        label='Password2'
        value={password}
        onChangeText={setPassword}
        placeholder={'Confirm password...'}
        secureTextEntry
      />
      <BigButton label='Sign up' onPress={handleSignUp} />
    </View>
  );
};

export default SignupForm;
