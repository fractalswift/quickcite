import React, { useContext, useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';

import Colors from '../constants/Colors';

import CitationCollection from './CitationCollection';
import { FloatingButton, BigButton } from '../components/common';
import FormInput from '../components/FormInput';

import { UserContext } from '../providers/UserContext';

const dummyCollections = [
  {
    title: 'dummy collection',
    uid: '12344',
    doi: 'dhfwhfeefsdfw33ury',
    citations: ['judo article', 'karate article'],
  },
  {
    title: 'another collection',
    uid: '12544',
    doi: 'dhfwhfeury',
    citations: ['dog article', 'cat article'],
  },
];

const CollectionsList = ({ navigation }) => {
  const { collections, createCollection, deleteCollection, user } = useContext(
    UserContext
  );

  // state for making the "new collection" box visible or not
  const [create, setCreate] = useState(false);

  const [newColName, setNewColName] = useState('');

  const saveNewCollection = () => {
    const newCollection = {
      title: newColName,
      citations: [],
    };
    createCollection(newCollection, user.uid);
    setCreate(false);
    console.log('created collection');
  };

  useEffect(() => {
    console.log('CL useeffect:', Object.entries(collections.toJSON()));
  }, [create, collections, user]);

  return (
    <View style={styles.container}>
      <Text style={styles.articleCount}>
        You have {Object.keys(collections.toJSON()).length || 0} citation
        collections.
      </Text>
      <FloatingButton
        name={!create ? 'Create' : 'Cancel'}
        icon={!create ? 'md-add-circle' : 'md-remove-circle'}
        color={!create ? Colors.tintColor : 'crimson'}
        onPress={() => {
          setCreate(!create);
        }}
      />
      {create ? (
        <>
          <View style={styles.newCollection}>
            <FormInput
              label='Name'
              value={newColName}
              onChangeText={setNewColName}
              placeholder={'New collection title...'}
            />
            <FloatingButton
              name='Save'
              icon='md-save'
              color={Colors.tintColor}
              onPress={() => {
                saveNewCollection();
              }}
            />
          </View>
        </>
      ) : null}
      <ScrollView style={styles.collectionsList}>
        {Object.entries(collections.toJSON()).map((collection) => {
          return (
            <CitationCollection
              title={collection[1].title}
              key={collection[1].title}
              navigation={navigation}
              deleteCollection={() => {
                deleteCollection(user.uid, collection[0]);
              }}
              count={
                collection[1].citations
                  ? Object.values(collection[1].citations).length
                  : 0
              }
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  articleCount: {
    fontSize: 16,
    marginTop: 15,
    textAlign: 'center',
  },
  newCollection: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 40,
    paddingRight: 20,
    alignItems: 'center',
  },
  collectionsList: {
    marginBottom: 230,
    paddingBottom: 20,
  },
});
export default CollectionsList;
