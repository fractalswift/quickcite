import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FloatingButton } from './common';
import Colors from '../constants/Colors';

const CitationCollection = ({ title, doi, navigation }) => {
  return (
    <TouchableOpacity
      style={styles.box}
      // onPress={() =>
      //   navigation.navigate('Collection', {
      //     collectionTitle: title,
      //   })
      // }
    >
      <View style={styles.articleTitle}>
        <Text style={{ fontWeight: 'bold', fontSize: 18 }} t>
          {title.slice(0, 170)}...
        </Text>
      </View>
      <View style={styles.buttons}>
        <FloatingButton
          name='export'
          icon='md-arrow-round-forward'
          color={Colors.tintColor}
        />
        <FloatingButton
          name='delete'
          icon='md-remove-circle-outline'
          color='crimson'
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  box: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '89%',
    marginLeft: 20,
    marginTop: 20,
    paddingRight: 20,
    elevation: 10,
    backgroundColor: 'whitesmoke',
  },
  articleTitle: {
    padding: 10,
    width: '80%',
  },
  buttons: {
    justifyContent: 'space-around',
    marginBottom: 20,
  },
});

export default CitationCollection;
