import React, { useEffect, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import NotLoggedIn from '../components/NotLoggedIn';

import SavedArticlesList from '../components/SavedArticlesList';

import { UserContext } from '../providers/UserContext';

export default function SavedScreen({ navigation }) {
  const { isSignedIn, user } = useContext(UserContext);

  useEffect(() => {}, [user, isSignedIn]);

  if (!isSignedIn) {
    return <NotLoggedIn screenName='saved articles' />;
  } else {
    return (
      <View>
        <SavedArticlesList navigation={navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fafafa',
  },
});
