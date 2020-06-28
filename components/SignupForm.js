import firebase from 'firebase';
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import FormInput from './FormInput';
import BigButton from './BigButton';
import Alert from './Alert';
import Spinner from './Spinner';

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (password !== password2) {
      setErrorMessage('Passwords do not match.');
    } else {
      setLoading(true);

      try {
        console.log('signing up!');
        let response = await firebase
          .auth()
          .createUserWithEmailAndPassword(email.toString().trim(), password);
        console.log(response);
        setLoading(false);
      } catch (error) {
        setErrorMessage('Sign up failed.');
        setLoading(false);
      }
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
      <FormInput
        label='Password2'
        value={password2}
        onChangeText={setPassword2}
        placeholder={'Confirm password...'}
        secureTextEntry
      />
      {loading ? (
        <Spinner />
      ) : (
        <BigButton label='Sign up' onPress={handleSignUp} />
      )}
      {errorMessage ? <Alert errorMessage={errorMessage} /> : null}
    </View>
  );
};

export default SignupForm;
