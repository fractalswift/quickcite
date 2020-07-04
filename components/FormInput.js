import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const FormInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
}) => {
  return (
    <View style={styles.containerStyle}>
      <Text style={styles.labelStyle}>{label}</Text>
      <TextInput
        style={styles.inputStyle}
        value={value}
        onChangeText={onChangeText}
        autoCorrect={false}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputStyle: {
    color: '#000',
    backgroundColor: '#f0f0f0',
    paddingRight: 5,
    paddingLeft: 15,
    fontSize: 18,
    lineHeight: 30,
    flex: 2,
    width: 200,
    height: 40,
  },
  labelStyle: {
    fontSize: 18,
    paddingLeft: 20,
    flex: 1,
  },

  containerStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: 300,
    marginTop: 8,
    marginBottom: 8,
  },
});

export default FormInput;
