import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FloatingButton } from './common';
import Colors from '../constants/Colors';

const SavedItem = ({ articleTitle, doi, unsaveArticle, navigate }) => {
  return (
    <View style={styles.box}>
      <View style={styles.articleTitle}>
        <Text style={{ fontWeight: 'bold', fontSize: 18 }} t>
          {articleTitle.slice(0, 170)}...
        </Text>
      </View>
      <View style={styles.buttons}>
        <FloatingButton
          name='cite'
          icon='md-quote'
          color={Colors.tintColor}
          onPress={() => {
            console.log('pressed cite');
          }}
        />
        <FloatingButton
          name='unsave'
          icon='md-remove-circle-outline'
          color='crimson'
          onPress={() => {
            unsaveArticle(doi);
          }}
        />
      </View>
    </View>
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

export default SavedItem;
