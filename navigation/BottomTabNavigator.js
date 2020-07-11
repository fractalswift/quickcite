import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import AccountScreen from '../screens/AccountScreen';
import SavedScreen from '../screens/SavedScreen';
import SearchScreen from '../screens/SearchScreen';
import CitationsScreen from '../screens/CitationsScreen';
import Header from '../components/Header';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Search';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <>
      <Header />

      <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
        <BottomTab.Screen
          name='Search'
          component={SearchScreen}
          options={{
            title: 'Search',
            tabBarIcon: ({ focused }) => (
              <TabBarIcon focused={focused} name='md-search' />
            ),
          }}
        />

        <BottomTab.Screen
          name='Saved'
          component={SavedScreen}
          options={{
            title: 'Saved',
            tabBarIcon: ({ focused }) => (
              <TabBarIcon focused={focused} name='md-save' />
            ),
          }}
        />
        <BottomTab.Screen
          name='Citations'
          component={CitationsScreen}
          options={{
            title: 'Citations',
            tabBarIcon: ({ focused }) => (
              <TabBarIcon focused={focused} name='md-quote' />
            ),
          }}
        />
        <BottomTab.Screen
          name='Account'
          component={AccountScreen}
          options={{
            title: 'Account',
            tabBarIcon: ({ focused }) => (
              <TabBarIcon focused={focused} name='md-settings' />
            ),
          }}
        />
      </BottomTab.Navigator>
    </>
  );
}

function getHeaderTitle(route) {
  const routeName =
    route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Account':
      return 'Account settings & info';
    case 'Saved':
      return 'Saved articles and citations';
    case 'Search':
      return 'Search articles';
    case 'Article':
      return 'Read article';
    case 'History':
      return 'Reading history';
  }
}
