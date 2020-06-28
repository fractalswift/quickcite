import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text, StyleSheet } from 'react-native';

const BigButton = ({ label, onPress }) => {
  return (
    <>
      <TouchableOpacity style={styles.bigButton} onPress={onPress}>
        <Text style={styles.buttonText}>{label}</Text>
      </TouchableOpacity>
    </>
  );
};

export default BigButton;

const styles = StyleSheet.create({
  bigButton: {
    borderWidth: 1,
    borderColor: 'green',
    width: 300,
    borderRadius: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    height: 40,
  },
  buttonText: {
    fontSize: 24,
    color: 'green',
  },
});
