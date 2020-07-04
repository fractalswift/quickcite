import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import SearchBar from '../components/SearchBar';
import useArticles from '../hooks/useArticles';
import ResultsList from '../components/ResultsList';
import { Spinner } from '../components/common';

export default function SearchScreen({ navigation }) {
  const [term, setTerm] = useState('');

  const [
    searchApi,
    articles,
    errorMessage,
    searchedTerm,
    filterOpenAccess,
    setFilterOpenAccess,
    loading,
  ] = useArticles();

  return (
    <View style={styles.container}>
      <SearchBar
        onTermSubmit={() => searchApi(term)}
        term={term}
        onTermChange={setTerm}
      />

      {errorMessage ? <Text>{errorMessage} </Text> : null}

      <View
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        {loading ? (
          <Spinner />
        ) : (
          <ResultsList
            searchedTerm={searchedTerm}
            results={articles}
            title='Article results:'
            navigation={navigation}
          />
        )}
      </View>
    </View>
  );
}

SearchScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  contentContainer: {
    paddingTop: 30,
  },
});
