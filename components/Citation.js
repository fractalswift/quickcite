import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Share } from 'react-native';
import { FloatingButton } from './common';
import Colors from '../constants/Colors';

const Citation = ({
  articleTitle,
  authors,
  pubDate,
  pubName,
  doi,
  deleteCitation,
  collectionId,
  citationId,
  user,
}) => {
  // turn authors into a string ready for export
  const authorsForCite = Object.values(authors).reduce((acc, curr) => {
    return acc + curr.creator + ' ';
  }, '');

  const citationToExport = `${authorsForCite} (${pubDate}). ${articleTitle}. ${pubName}. Doi: ${doi}`;

  const exportCitation = async () => {
    try {
      const result = await Share.share({
        message: citationToExport,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

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
          onPress={exportCitation}
        />
        <FloatingButton
          name='delete'
          icon='md-remove-circle-outline'
          color='crimson'
          onPress={() => {
            deleteCitation(user.uid, collectionId, citationId);
            setNeedRefresh(!needRefresh);
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

export default Citation;
