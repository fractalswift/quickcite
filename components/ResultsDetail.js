import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

const ResultsDetail = ({ result, identifier }) => {
  // Skip the wierdly formatted results with if statement
  // TODO build in handling for weirdly formatted results

  if (typeof result.title === 'string') {
    return (
      <View style={styles.container}>
        <View style={styles.journal}>
          <Text style={styles.articleTitle}> {result.title}</Text>
          <Text style={styles.journalName}>{result.publicationName}</Text>

          <Text style={styles.articleDate}>
            Published: {result.publicationDate}
          </Text>
          <Text style={styles.readMore}>Read more...</Text>
        </View>
      </View>
    );
  } else return null;
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 15,
  },
  articleTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
    fontSize: 18,
  },
  journal: {
    width: 270,
    height: 'auto',
    borderRadius: 4,
    marginBottom: 5,
    borderWidth: 1,
    backgroundColor: 'ghostwhite',
    borderColor: 'grey',
    color: 'black',
    padding: 10,
    elevation: 10,
  },
  journalName: {
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 5,
  },
  articleDate: {
    textAlign: 'center',
    marginBottom: 5,
    fontStyle: 'italic',
  },
  abstract: {
    textAlign: 'left',
    marginBottom: 5,
  },
  readMore: {
    color: Colors.tintColor,
    textAlign: 'right',
    textDecorationLine: 'underline',
    fontSize: 16,
  },
});
export default ResultsDetail;
