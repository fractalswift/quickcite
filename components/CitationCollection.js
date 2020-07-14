import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Share } from 'react-native';
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
  const [stringForExport, setStringForExport] = useState('');

  useEffect(() => {
    // get all the citations into an array
    if (collection[1].length) {
      const allCitationsToExport = Object.values(collection[1].citations).map(
        (citation) => {
          const authors = Object.values(citation.authors).reduce(
            (acc, curr) => {
              return acc + curr.creator + ' ';
            },
            ''
          );

          return `${authors} (${citation.pubDate}). ${citation.title}. ${citation.pubName}. Doi: ${citation.doi}`;
        }
      );

      // turn all the citations into a string
      const stringToExport = allCitationsToExport.reduce((acc, curr) => {
        return acc + `\n\n` + curr;
      });

      setStringForExport(stringToExport);
    }
  }, [collection]);

  const exportAllCitations = async (stringToExport) => {
    try {
      const result = await Share.share({
        message: stringToExport,
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
          onPress={() => {
            exportAllCitations(stringForExport);
          }}
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
