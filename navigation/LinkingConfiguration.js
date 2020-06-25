import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    Root: {
      path: 'root',
      screens: {
        Home: 'home',
        Saved: 'saved',
        Search: 'search',
        Article: 'article',
      },
    },
  },
};
