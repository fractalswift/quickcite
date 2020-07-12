import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FloatingButton } from './common';
import Colors from '../constants/Colors';

const CitationCollection = ({
  title,
  count,
  navigation,
  deleteCollection,
  user,
  collection,
}) => {
  useEffect(() => {}, [count, collection]);

  return (
    <View style={styles.box}>
      <View style={styles.articleTitle}>
        <Text style={{ fontWeight: 'bold', fontSize: 18 }} t>
          {title.slice(0, 170)}...
        </Text>
        <Text>{count} citations in this collection</Text>
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
          onPress={() => {
            deleteCollection(user.uid, collection[0]);
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

export default CitationCollection;
