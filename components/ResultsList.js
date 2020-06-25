import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import ResultsDetail from './ResultsDetail';
import { StackActions } from '@react-navigation/native';

import ArticleScreen from '../screens/ArticleScreen';

const ResultsList = ({ title, results, navigation, searchedTerm }) => {
  if (!results.length && !searchedTerm) {
    return (
      <View style={styles.container}>
        <Text style={styles.noResults}>Please enter a search term.</Text>
      </View>
    );
  }

  if (!results.length && searchedTerm) {
    return (
      <View style={styles.container}>
        <Text style={styles.noResults}>
          No articles found for "{searchedTerm}".
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titleStyle}>{title}</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={results}
        keyExtractor={(result) => result.id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate('Article', {})}
            >
              <ResultsDetail result={item} />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  titleStyle: {
    fontSize: 18,
    marginLeft: 15,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  noResults: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 16,
  },
});

// This allows results list to recieve navigation prop
// even though it is not being passed from parent
export default ResultsList;
