import firebase from 'firebase';
import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Linking,
  Modal,
  TouchableHighlight,
  TouchableOpacity,
  Share,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';

import { BigButton, Spinner, FloatingButton } from '../components/common';
import Colors from '../constants/Colors';
import Header from '../components/Header';

import { UserContext } from '../providers/UserContext';

export default function ArticleScreen({ route, navigation }) {
  const {
    title,
    authors,
    pubDate,
    pubName,
    url,
    doi,
    identifier,
    abstract,
  } = route.params;

  const {
    savedArticles,
    saveArticle,
    unsaveArticle,
    getSavedArticles,
    saveCitation,
    collections,
    getCollections,
    user,
  } = useContext(UserContext);

  // defualt to "loading article" while loading
  const [article, setArticle] = useState([
    { format: 'title', content: 'Loading article...' },
  ]);

  // control spinner state for loading article
  const [loading, setLoading] = useState(true);

  // control the state of the save/unsave button
  const [isSaved, setIsSaved] = useState(false);

  // control state of citation modal
  const [modalVisible, setModalVisible] = useState(false);

  const getArticle = async (doi) => {
    const response = await axios.get(
      `https://us-central1-quickcite-281819.cloudfunctions.net/get_article?message=${doi}`
    );

    setArticle(response.data);
    setLoading(false);
  };

  // check if current article already exists in user's db
  // TODO - refactor to use includes ?
  const checkIfArticleSaved = async () => {
    const matchingDoi = savedArticles.filter((article) => {
      return article.doi === doi;
    });

    if (matchingDoi.length) {
      setIsSaved(true);
    } else {
      setIsSaved(false);
    }
  };

  // TODO move setIsSaved to be based in useEffect so we know article IS saved
  const addArticleToUserDb = async () => {
    const record = {
      title,
      doi,
      identifier,
      abstract,
      authors,
      pubDate,
      pubName,
      url,
    };

    saveArticle(record, user.uid);
    // Change the save icon to unsave
    setIsSaved(true);
  };

  const addCitationToCollection = async (citation, userId, collectionId) => {
    // saveCitation('citation', 'Trees', user.uid);
    saveCitation(citation, userId, collectionId);
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `Check out this article I found with QuickCite: ${url}`,
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

  useEffect(() => {
    getArticle(doi);
    checkIfArticleSaved();

    return setArticle(article);
  }, [savedArticles, user]);

  return (
    <View style={styles.container}>
      <Header />

      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Choose collection to add citation:
            </Text>

            <View>
              {collections.toJSON
                ? Object.entries(collections.toJSON()).map((collection) => {
                    const citation = { authors, pubDate, title, pubName, doi };
                    return (
                      <TouchableOpacity
                        style={styles.collection}
                        onPress={() => {
                          addCitationToCollection(
                            citation,
                            user.uid,
                            collection[0]
                          );
                          setModalVisible(!modalVisible);
                        }}
                      >
                        <Text style={{ fontWeight: 'bold' }}>
                          {collection[1].title}
                        </Text>
                        <Text style={{ fontWeight: 'bold' }}>+</Text>
                      </TouchableOpacity>
                    );
                  })
                : null}
            </View>

            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>Cancel</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>

      <View style={styles.topButtons}>
        {isSaved ? (
          <FloatingButton
            color='crimson'
            name='unsave'
            icon='md-close-circle-outline'
            onPress={() => {
              unsaveArticle(user.uid, doi);
            }}
          />
        ) : (
          <FloatingButton
            color={Colors.tintColor}
            name='save'
            icon='md-save'
            onPress={() => addArticleToUserDb()}
          />
        )}

        <FloatingButton
          color='violet'
          name='cite'
          icon='md-quote'
          onPress={() => {
            setModalVisible(true);
          }}
        />
        <FloatingButton
          color='palegoldenrod'
          name='web'
          icon='md-globe'
          onPress={() => Linking.openURL(url)}
        />
        <FloatingButton
          color='springgreen'
          name='share'
          icon='md-share'
          onPress={onShare}
        />
      </View>

      <ScrollView
        style={styles.articleContainer}
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={styles.articleTitle}>{title}</Text>
        <Text style={styles.journalName}>{pubName}</Text>
        <Text style={styles.journalName}>{pubDate}</Text>

        <Text style={{ fontWeight: 'bold' }}>Authors:</Text>
        <View style={styles.authors}>
          {authors.map((obj, index) => {
            return <Text key={index}>{obj.creator}</Text>;
          })}
        </View>
        {article.map((section, index) => {
          if (section.format === 'title') {
            return (
              <Text key={index} style={{ fontWeight: 'bold' }}>
                {section.content}
              </Text>
            );
          } else {
            return <Text key={index}>{section.content}</Text>;
          }
        })}

        {loading ? <Spinner /> : null}

        <View style={styles.readMore}>
          <BigButton
            label='Go to full article'
            icon='md-globe'
            color='black'
            onPress={() => Linking.openURL(url)}
          />
        </View>
      </ScrollView>
    </View>
  );
}

ArticleScreen.navigationOptions = {
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
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  collection: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'skyblue',
    padding: 5,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
