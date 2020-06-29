import React from 'react';

import SavedCitationList from './SavedCitationsList';
import SavedArticlesList from './SavedArticlesList';

const AllSaved = ({ savedArticles, page, navigation }) => {
  if (page === 'Articles') {
    return <SavedArticlesList savedArticles={savedArticles} />;
  } else {
    return (
      <SavedCitationList
        navigation={navigation}
        collectionsList={savedArticles}
      />
    );
  }
};

export default AllSaved;
