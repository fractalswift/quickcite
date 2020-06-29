import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FloatingButton from './FloatingButton';

const SavedItem = ({ articleTitle, doi }) => {
  return (
    <TouchableOpacity style={styles.box}>
      <View style={styles.articleTitle}>
        <Text style={{ fontWeight: 'bold', fontSize: 18 }} t>
          {articleTitle}
        </Text>
      </View>
      <View style={styles.buttons}>
        <FloatingButton name='cite' icon='md-quote' color='skyblue' />
        <FloatingButton
          name='unsave'
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
    elevation: 10,
    backgroundColor: 'whitesmoke',
  },
  articleTitle: {
    padding: 10,
  },
  buttons: {
    justifyContent: 'flex-start',
    marginBottom: 20,
    marginRight: 10,
  },
});

export default SavedItem;
