import firebase from 'firebase';

import * as WebBrowser from 'expo-web-browser';
import React, { useState, useEffect } from 'react';
import { Platform, StyleSheet, Text, View, Linking } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import FloatingButton from '../components/FloatingButton';
import Colors from '../constants/Colors';
import Header from '../components/Header';
import Spinner from '../components/Spinner';
import BigButton from '../components/BigButton';

import axios from 'axios';
import { addData, hello } from '../firebase/firebase.utils';

export default function ArticleScreen({ route, navigation }) {
  const title = route.params.title;
  const authors = route.params.authors;
  const pubDate = route.params.pubDate;
  const pubName = route.params.pubName;
  const url = route.params.url;
  const doi = route.params.doi;

  const [article, setArticle] = useState([
    { format: 'title', content: 'Loading article...' },
  ]);

  const [loading, setLoading] = useState(true);

  const getArticle = async (doi) => {
    const response = await axios.get(
      `https://us-central1-quickcite-281819.cloudfunctions.net/get_article?message=${doi}`
    );

    setArticle(response.data);
    setLoading(false);
  };

  // get current user

  const { currentUser } = firebase.auth();

  // check if current article already exists in user'db
  const checkIfArticleSaved = async () => {
    firebase
      .database()
      .ref(`users/${currentUser.uid}/savedArticles`)
      .orderByChild('doi')
      .equalTo(doi)
      .once('value', (snapshot) => {
        if (snapshot.exists()) {
          const userData = snapshot.val();
          console.log('exists!', userData);
        } else {
          console.log('no existe!');
        }
      });
  };

  // This adds saved article to user profile

  const saveArticleForUser = async () => {
    const record = { title, doi };

    const response = await firebase
      .database()
      .ref(`users/${currentUser.uid}/savedArticles`)
      .push(record);

    console.log('res:', response);
  };

  useEffect(() => {
    getArticle(doi);

    return setArticle(article);
  }, []);

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.topButtons}>
        <FloatingButton
          color='skyblue'
          name='save'
          icon='md-save'
          onPress={() => saveArticleForUser()}
        />
        <FloatingButton
          color='violet'
          name='cite'
          icon='md-quote'
          onPress={() => checkIfArticleSaved()}
        />
        <FloatingButton
          color='palegoldenrod'
          name='web'
          icon='md-globe'
          onPress={() => Linking.openURL(url)}
        />
      </View>

      <ScrollView
        style={styles.articleContainer}
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={styles.articleTitle}>{title}</Text>
        <Text style={styles.journalName}>{pubName}</Text>
        <Text style={styles.journalName}>{pubDate}</Text>

        <View style={styles.authors}>
          <Text>Authors:</Text>
          {authors.map((obj) => {
            return <Text key={obj.creator}>{obj.creator}</Text>;
          })}
        </View>

        {article.map((section) => {
          if (section.format === 'title') {
            return (
              <Text style={{ fontWeight: 'bold' }}>{section.content}</Text>
            );
          } else {
            return <Text>{section.content}</Text>;
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

function DevelopmentModeNotice() {
  if (__DEV__) {
    const learnMoreButton = (
      <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
        Learn more
      </Text>
    );

    return (
      <Text style={styles.developmentModeText}>
        Development mode is enabled: your app will be slower but you can use
        useful development tools. {learnMoreButton}
      </Text>
    );
  } else {
    return (
      <Text style={styles.developmentModeText}>
        You are not in development mode: your app will run at full speed.
      </Text>
    );
  }
}

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/development-mode/'
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/get-started/create-a-new-app/#making-your-first-change'
  );
}

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
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
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
