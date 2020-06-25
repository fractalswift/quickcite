import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SettingButton = ({ iconName, buttonName }) => {
  return (
    <TouchableOpacity style={styles.settingButton}>
      <Ionicons name={iconName} size={40} color={'grey'} />
      <Text style={styles.settingText}>{buttonName}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  settingButton: {
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    height: 60,
    width: '80%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 10,
    marginBottom: 20,
  },
  settingText: {
    fontSize: 30,
    marginLeft: 10,
    color: 'grey',
  },
});
export default SettingButton;
