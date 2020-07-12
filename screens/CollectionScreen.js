import React, { useEffect } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { BigButton } from '../components/common';
import Colors from '../constants/Colors';
import Header from '../components/Header';
import Citation from '../components/Citation';

export default function CollectionScreen({ route, navigation }) {
  const title = route.params.title;
  const citations = route.params.citations;

  useEffect(() => {
    console.log(route.params);
  });

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.topButtons}>
        <BigButton
          color={Colors.tintColor}
          label='export all'
          icon='md-arrow-round-forward'
        />
      </View>

      <ScrollView>
        {Object.values(citations).map((citation) => {
          return (
            <Citation
              articleTitle={citation.title}
              pubDate={citation.pubDate}
              doi={citation.doi}
              authors={citation.authors}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}

CollectionScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  articleContainer: {
    marginLeft: 20,
    marginRight: 20,
  },

  topButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 20,
    backgroundColor: 'transparent',
    paddingRight: 20,
  },

  contentContainer: {
    paddingTop: 30,
  },

  articleTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
    fontSize: 18,
  },
  journal: {
    width: 250,
    height: 'auto',
    borderRadius: 4,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: 'black',
    color: 'black',
    padding: 5,
    display: 'flex',
  },
  journalName: {
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 5,
  },
  articleDate: {
    textAlign: 'center',
    marginBottom: 5,
    fontStyle: 'italic',
  },
  abstract: {
    textAlign: 'left',
    marginBottom: 5,
  },
  readMore: {
    color: Colors.tintColor,
    textAlign: 'center',
    textDecorationLine: 'underline',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 105,
    marginTop: 20,
  },
  authors: { marginBottom: 10, textAlign: 'center' },
});
