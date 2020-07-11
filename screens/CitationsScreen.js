import React, { useEffect, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import NotLoggedIn from '../components/NotLoggedIn';

import CollectionsList from '../components/CollectionsList';

import { UserContext } from '../providers/UserContext';

export default function SavedScreen({ navigation }) {
  const { isSignedIn, user } = useContext(UserContext);

  useEffect(() => {}, [user, isSignedIn]);

  if (!isSignedIn) {
    return <NotLoggedIn screenName='citation collections' />;
  } else {
    return (
      <View>
        <CollectionsList navigation={navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fafafa',
  },
});
