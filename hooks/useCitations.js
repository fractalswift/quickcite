import firebase from 'firebase';
import { useState } from 'react';

const useCitations = () => {
  const [collections, setCollections] = useState([]);

  const getCollections = async (userId) => {
    console.log('calling getCollecitons from useCitations');

    const citationCollections = await firebase
      .database()
      .ref(`users/${userId}/citationCollections`)
      .once('value');

    if (!citationCollections.toJSON()) {
      setCollections([]);
    } else {
      const updatedCollections = await Object.values(
        citationCollections.toJSON()
      );
      setCollections(updatedCollections);
    }
  };

  const createCollection = async (newCollection, userId) => {
    console.log('calling createCol from useCitations');
    // first check the collectionTitle is not already used
    const matchedCollections = collections.filter((collection) => {
      return collection.title === newCollection.title;
    });

    if (!matchedCollections.length) {
      const response = await firebase
        .database()
        .ref(`users/${userId}/citationCollections`)
        .push(newCollection);

      // update the collections state
      getCollections(userId);
    } else {
      // TODO return an error to the user
      // update the collections state
      getCollections(userId);
    }
  };

  const saveCitation = async (newCitation, collectionTitle, userId) => {
    console.log('calling saveCitation from useCitations');
    // TODO first check the citation is not already in the collection is not already used
    const targetCollection = collections.filter((collection) => {
      return collection.title === collectionTitle;
    });

    const response = await firebase
      .database()
      .ref(`users/${userId}/citationCollections/-MByBf9V40nj4CkTV5qf/citations`)
      .push(newCitation);

    // reset collections state
    getCollections(userId);

    console.log(targetCollection);
  };

  return {
    getCollections,
    createCollection,
    saveCitation,
    collections,
  };
};

export default useCitations;
