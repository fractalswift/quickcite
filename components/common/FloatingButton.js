import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const FloatingButton = ({ name, color, icon, onPress }) => {
  return (
    <View>
      <TouchableOpacity style={floatingButtonStyle(color)} onPress={onPress}>
        <Ionicons
          name={icon}
          size={30}
          style={{ marginBottom: -3 }}
          color='black'
        />
        <Text>{name}</Text>
      </TouchableOpacity>
    </View>
  );
};

// not using stylesheet as want to change bgcolor as prop

const floatingButtonStyle = function (myColor) {
  return {
    backgroundColor: myColor,
    height: 55,
    width: 55,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    elevation: 10,
    marginLeft: 10,
  };
};

export default FloatingButton;
