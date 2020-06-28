import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const Alert = ({ errorMessage }) => {
  return (
    <>
      <View style={styles.alertBox}>
        <Text style={styles.alertMessage}>{errorMessage}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  alertBox: {
    borderWidth: 1,
    borderColor: 'red',
    backgroundColor: '#FCE8E8',
    borderRadius: 5,
    width: 300,
    height: 'auto',
    marginTop: 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertMessage: {
    color: 'darkred',
    fontSize: 20,
    textAlign: 'center',
  },
});

export default Alert;
