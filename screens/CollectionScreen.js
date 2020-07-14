import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, Share } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { BigButton } from '../components/common';
import Colors from '../constants/Colors';
import Header from '../components/Header';
import Citation from '../components/Citation';

export default function CollectionScreen({ route, navigation }) {
  const title = route.params.title;
  const citations = route.params.citations;
  const deleteCitation = route.params.deleteCitation;
  const collectionId = route.params.collectionId;
  const user = route.params.user;

  const [stringForExport, setStringForExport] = useState('');

  useEffect(() => {
    console.log('calling useEf from collection screen');
    if (citations) {
      // get all the citations into an array
      const allCitationsToExport = Object.values(citations).map((citation) => {
        const authors = Object.values(citation.authors).reduce((acc, curr) => {
          return acc + curr.creator + ' ';
        }, '');

        return `${authors} (${citation.pubDate}). ${citation.title}. ${citation.pubName}. Doi: ${citation.doi}`;
      });

      // turn all the citations into a string
      const stringToExport = allCitationsToExport.reduce((acc, curr) => {
        return acc + `\n\n` + curr;
      });

      setStringForExport(stringToExport);
    }
  }, [citations]);

  const exportAllCitations = async (stringToExport) => {
    try {
      const result = await Share.share({
        message: stringToExport,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Header />

      {!citations ? (
        <Text style={{ textAlign: 'center' }}>
          You have not added any citations to this collection.
        </Text>
      ) : (
        <>
          <View style={styles.topButtons}>
            <BigButton
              color={Colors.tintColor}
              label='export all'
              icon='md-arrow-round-forward'
              onPress={() => exportAllCitations(stringForExport)}
            />
          </View>
          <ScrollView>
            {Object.entries(citations).map((citation) => {
              return (
                <Citation
                  articleTitle={citation[1].title}
                  pubDate={citation[1].pubDate}
                  pubName={citation[1].pubName}
                  doi={citation[1].doi}
                  authors={citation[1].authors}
                  deleteCitation={deleteCitation}
                  collectionId={collectionId}
                  citationId={citation[0]}
                  user={user}
                  key={citation[1].doi}
                />
              );
            })}
          </ScrollView>
        </>
      )}
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
