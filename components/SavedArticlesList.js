import React from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';

import SavedItem from './SavedItem';

const SavedArticlesList = ({ savedArticles, unsaveArticle }) => {
  return (
    <View>
      <Text style={styles.articleCount}>
        You have {savedArticles.length} saved articles.
      </Text>
      <ScrollView>
        {savedArticles.map((article) => {
          return (
            <SavedItem
              articleTitle={article.title}
              doi={article.doi}
              key={article.identifier}
              unsaveArticle={unsaveArticle}
            />
          );
        })}
      </ScrollView>
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
