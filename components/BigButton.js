import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const BigButton = ({ label, color, icon, onPress }) => {
  return (
    <View>
      <TouchableOpacity style={buttonStyle(color)} onPress={onPress}>
        <Ionicons
          name={icon}
          size={40}
          style={{ marginBottom: -3 }}
          color='whitesmoke'
        />
        <Text style={{ marginLeft: 20, fontSize: 28, color: 'whitesmoke' }}>
          {label}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

// not using stylesheet as want to change bgcolor as prop

const buttonStyle = function (myColor) {
  return {
    backgroundColor: myColor,
    height: 55,
    width: 290,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: 10,
    elevation: 15,
    marginLeft: 10,
    paddingLeft: 20,
    flexDirection: 'row',
  };
};

export default BigButton;
