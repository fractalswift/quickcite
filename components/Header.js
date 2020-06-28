import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Logo from '../images/quickcitelogo.png';

const Header = () => {
  return (
    <View style={styles.header}>
      <Image style={styles.tinyLogo} source={Logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    backgroundColor: 'black',
    height: 70,
    elevation: 10,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  tinyLogo: {
    width: 80,
    height: 60,
  },
});

export default Header;
