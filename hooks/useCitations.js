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
    }
  };

  return {
    getCollections,
    createCollection,
    collections,
  };
};

export default useCitations;
