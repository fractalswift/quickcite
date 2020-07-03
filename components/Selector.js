import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';
const Selector = ({ page, setPage, titles }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setPage('Articles')}
        style={page === titles[0] ? styles.currentTab : styles.tab}
      >
        <Text>{titles[0]}</Text>
      </TouchableOpacity>
      <View style={styles.divider}></View>
      <TouchableOpacity
        onPress={() => setPage('Citations')}
        style={page === titles[1] ? styles.currentTab : styles.tab}
      >
        <Text>{titles[1]}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: 'black',
    height: 40,
    flexDirection: 'row',
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
    elevation: 10,
  },
  divider: {
    height: '100%',
    width: 1,
    backgroundColor: 'black',
  },
  tab: {
    flex: 1,
    textAlign: 'center',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'whitesmoke',
  },
  currentTab: {
    backgroundColor: Colors.tintColor,
    flex: 1,
    textAlign: 'center',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Selector;
