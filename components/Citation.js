import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FloatingButton } from './common';
import Colors from '../constants/Colors';

const SavedItem = ({
  articleTitle,
  authors,
  pubDate,
  doi,
  deleteCitation,
  user,
}) => {
  console.log(authors);

  return (
    <View style={styles.box}>
      <View style={styles.articleTitle}>
        <Text style={{ fontWeight: 'bold', fontSize: 18 }} t>
          {articleTitle.slice(0, 170)}...
        </Text>
        <Text>{pubDate}</Text>
        {Object.values(authors).map((author) => (
          <Text>{author.creator}</Text>
        ))}
      </View>
      <View style={styles.buttons}>
        <FloatingButton
          color={Colors.tintColor}
          name='export'
          icon='md-arrow-round-forward'
        />
        <FloatingButton
          name='delete'
          icon='md-remove-circle-outline'
          color='crimson'
          onPress={() => {
            unsaveArticle(user.uid, doi);
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
    marginBottom: 20,
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
