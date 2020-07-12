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
      setCollections(citationCollections);
      console.log('as Json:', updatedCollections);
      console.log('as original:', citationCollections);
    }
  };

  const createCollection = async (newCollection, userId) => {
    console.log('calling createCol from useCitations');
    // first check the collectionTitle is not already used
    const matchedCollections = Object.values(collections).filter(
      (collection) => {
        return collection.title === newCollection.title;
      }
    );

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

  const saveCitation = async (newCitation, userId, collectionId) => {
    console.log('calling saveCitation from useCitations');
    // TODO first check the citation is not already in the collection is not already used

    const response = await firebase
      .database()
      .ref(`users/${userId}/citationCollections/${collectionId}`)
      .push(newCitation)
      .catch(console.log());

    // reset collections state
    getCollections(userId);
  };

  const deleteCollection = async (userId, collectionId) => {
    console.log('called delete collection');
    const response = await firebase
      .database()
      .ref(`users/${userId}/citationCollections/${collectionId}`)
      .remove()
      .catch(console.log());

    // reset collections state
    getCollections(userId);
  };

  return {
    getCollections,
    createCollection,
    saveCitation,
    collections,
    deleteCollection,
  };
};

export default useCitations;
