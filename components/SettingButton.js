import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SettingButton = ({ label, color, icon, onPress }) => {
  return (
    <View>
      <TouchableOpacity style={buttonStyle(color)} onPress={onPress}>
        <Ionicons
          name={icon}
          size={30}
          style={{ marginBottom: -3 }}
          color='black'
        />
        <Text style={{ marginLeft: 20, fontSize: 18 }}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
};

// not using stylesheet as want to change bgcolor as prop

buttonStyle = function (myColor) {
  return {
    backgroundColor: myColor,
    height: 55,
    width: 270,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: 10,
    elevation: 15,
    marginLeft: 10,
    flexDirection: 'row',
    padding: 10,
  };
};

export default SettingButton;
