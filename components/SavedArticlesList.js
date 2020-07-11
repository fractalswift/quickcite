import React, { useEffect, useContext } from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import SavedItem from './SavedItem';

import { UserContext } from '../providers/UserContext';

const SavedArticlesList = ({ navigation }) => {
  const { savedArticles, unsaveArticle, user } = useContext(UserContext);

  // TODO re-render every time savedArticles is updated
  useEffect(() => {}, [savedArticles]);

  return (
    <View>
      <Text style={styles.articleCount}>
        You have {savedArticles.length || 0} saved articles.
      </Text>
      <FlatList
        style={{ marginBottom: 80 }}
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
                  authors: Object.values(item.authors),
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
                user={user}
              />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  articleCount: {
    fontSize: 16,
    marginTop: 15,
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default SavedArticlesList;
