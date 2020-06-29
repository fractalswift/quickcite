import React from 'react';
import { Flatlist, ScrollView } from 'react-native';

import SavedItem from './SavedItem';

const SavedArticlesList = () => {
  return (
    <ScrollView>
      <SavedItem articleTitle='Test article' doi='hjhfaf23234' />
      <SavedItem articleTitle='Test article' doi='hjhfaf23234' />

      <SavedItem articleTitle='Test article' doi='hjhfaf23234' />

      <SavedItem articleTitle='Test article' doi='hjhfaf23234' />
    </ScrollView>
  );
};

export default SavedArticlesList;
