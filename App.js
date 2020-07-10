import firebase from 'firebase';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, createContext } from 'react';
import { StyleSheet, View } from 'react-native';

import useCachedResources from './hooks/useCachedResources';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import LinkingConfiguration from './navigation/LinkingConfiguration';

import ArticleScreen from './screens/ArticleScreen';
import CollectionScreen from './screens/CollectionScreen';

const Stack = createStackNavigator();

import { AuthContext, AuthProvider } from './providers/AuthContext';

export default function App(props) {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <AuthProvider>
        <View style={styles.container}>
          <NavigationContainer linking={LinkingConfiguration}>
            <Stack.Navigator>
              <Stack.Screen name='Root' component={BottomTabNavigator} />
              <Stack.Screen name='Article' component={ArticleScreen} />
              <Stack.Screen name='Collection' component={CollectionScreen} />
            </Stack.Navigator>
          </NavigationContainer>
          <StatusBar style='auto' />
        </View>
      </AuthProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
