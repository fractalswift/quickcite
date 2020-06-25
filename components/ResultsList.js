import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import ResultsDetail from './ResultsDetail';

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
      <Text style={styles.titleStyle}>
        {results.length} results for "{searchedTerm}":
      </Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={results}
        keyExtractor={(result) => result.id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Article', {
                  abstract: item.abstract,
                  title: item.title,
                  authors: item.creators,
                  pubDate: item.publicationDate,
                  pubName: item.publicationName,
                  url: item.url[0].value,
                })
              }
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
    marginBottom: 15,
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
