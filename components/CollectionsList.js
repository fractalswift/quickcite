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
  const { collections, createCollection, user } = useContext(UserContext);

  // state for making the "new collection" box visible not
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

  useEffect(() => {}, [create, collections, user]);

  return (
    <View style={styles.container}>
      <Text style={styles.articleCount}>
        You have {collections.length || 0} citation collections.
      </Text>
      <FloatingButton
        name={!create ? 'Create' : 'Cancel'}
        icon={!create ? 'md-add-circle' : 'md-remove-circle'}
        color={!create ? Colors.tintColor : 'crimson'}
        onPress={() => {
          !create ? setCreate(true) : setCreate(false);
        }}
      />
      {create ? (
        <View style={styles.newCollection}>
          <FormInput
            label='Name'
            value={newColName}
            onChangeText={setNewColName}
            placeholder={'New collection title...'}
          />
          <BigButton
            label='Save'
            icon='md-save'
            color={Colors.tintColor}
            onPress={() => {
              saveNewCollection();
            }}
          />
        </View>
      ) : null}
      <ScrollView>
        {collections.map((collection) => {
          return (
            <CitationCollection
              title={collection.title}
              uid={collection.uid}
              doi={collection.doi}
              key={collection.uid}
              navigation={navigation}
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
    height: 200,
    justifyContent: 'flex-start',
  },
});
export default CollectionsList;
