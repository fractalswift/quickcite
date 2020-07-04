import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { FloatingButton } from '../components/common';
import Colors from '../constants/Colors';
import Header from '../components/Header';

export default function CollectionScreen({ route, navigation }) {
  const collectionTitle = route.params.collectiontitle;
  const citations = route.params.citations;

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.topButtons}>
        <FloatingButton
          color='skyblue'
          name='export all'
          icon='md-arrow-round-forward'
        />
        <FloatingButton color='violet' name='format' icon='md-quote' />
      </View>

      <ScrollView
        style={styles.articleContainer}
        contentContainerStyle={styles.contentContainer}
      ></ScrollView>
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
    justifyContent: 'flex-start',
    marginBottom: 20,
    backgroundColor: 'transparent',
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
