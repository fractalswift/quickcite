import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';

import Colors from '../constants/Colors';

import CitationCollection from './CitationCollection';
import { FloatingButton } from '../components/common';

import UserContext from '../providers/UserContext';

const collections = [
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
  //   const {  createCollection, deleteCollection, user } = useContext(
  //     UserContext
  //   );

  return (
    <View style={styles.container}>
      <Text style={styles.articleCount}>
        You have {collections.length || 0} citation collections.
      </Text>
      <FloatingButton
        name='Create'
        icon='md-add-circle'
        color={Colors.tintColor}
      />
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
});
export default CollectionsList;
