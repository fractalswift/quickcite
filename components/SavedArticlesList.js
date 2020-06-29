import React from 'react';
import { Flatlist, ScrollView } from 'react-native';

import SavedItem from './SavedItem';

const SavedArticlesList = ({ savedArticles }) => {
  return (
    <ScrollView>
      {savedArticles.map((article) => {
        return (
          <SavedItem
            articleTitle={article.title}
            doi={article.doi}
            key={article.identifier}
          />
        );
      })}
    </ScrollView>
  );
};

export default SavedArticlesList;
