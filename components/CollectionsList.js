import React, { useContext, useState, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import Colors from '../constants/Colors';

import CitationCollection from './CitationCollection';
import { FloatingButton } from '../components/common';
import FormInput from '../components/FormInput';

import { UserContext } from '../providers/UserContext';

const CollectionsList = ({ navigation }) => {
  const {
    collections,
    createCollection,
    deleteCollection,
    user,
    deleteCitation,
  } = useContext(UserContext);

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

  useEffect(() => {}, [create, collections, user]);

  if (!Object.keys(collections).length) {
    return (
      <View style={styles.container}>
        <Text style={styles.articleCount}>
          You have no citation collections.
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
      </View>
    );
  } else {
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
              <TouchableOpacity
                key={collection[1].title}
                onPress={() =>
                  navigation.navigate('Collection', {
                    title: collection[1].title,
                    citations: collection[1].citations,
                    deleteCitation: deleteCitation,
                    collectionId: collection[0],
                    user: user,
                  })
                }
              >
                <CitationCollection
                  title={collection[1].title}
                  key={collection[1].title}
                  deleteCollection={deleteCollection}
                  user={user}
                  collection={collection}
                  count={
                    collection[1].citations
                      ? Object.values(collection[1].citations).length
                      : 0
                  }
                />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  }
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
