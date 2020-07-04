import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import SavedItem from './SavedItem';

const SavedArticlesList = ({ savedArticles, unsaveArticle, navigation }) => {
  return (
    <View>
      <Text style={styles.articleCount}>
        You have {savedArticles.length || 0} saved articles.
      </Text>
      <View>
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={savedArticles}
          keyExtractor={(result) => result.identifier}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Article', {
                    abstract: item.abstract,
                    title: item.title,
                    authors: item.authors,
                    pubDate: item.publicationDate,
                    pubName: item.publicationName,
                    url: item.url[0].value,
                    doi: item.doi,
                    identifier: item.identifier,
                  })
                }
              >
                <SavedItem
                  articleTitle={item.title}
                  doi={item.doi}
                  key={item.identifier}
                  unsaveArticle={unsaveArticle}
                />
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  articleCount: {
    fontSize: 16,
    marginTop: 15,
    textAlign: 'center',
  },
});

export default SavedArticlesList;
