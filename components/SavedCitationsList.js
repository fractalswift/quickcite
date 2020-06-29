import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';

import Colors from '../constants/Colors';

import CitationCollection from './CitationCollection';

import FloatingButton from './FloatingButton';

const SavedCitationsList = ({ collectionsList, navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.articleCount}>You have 7 citation collections.</Text>
      <FloatingButton
        name='Create'
        icon='md-add-circle'
        color={Colors.tintColor}
      />
      <ScrollView>
        {collectionsList.map((article) => {
          return (
            <CitationCollection
              articleTitle={article.title}
              doi={article.doi}
              key={article.identifier}
              navigation={navigation}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  articleCount: {
    fontSize: 16,
    marginTop: 15,
    textAlign: 'center',
  },
});
export default SavedCitationsList;
