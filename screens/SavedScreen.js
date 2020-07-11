import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import NotLoggedIn from '../components/NotLoggedIn';

import Selector from '../components/Selector';

import SavedArticlesList from '../components/SavedArticlesList';

import { UserContext } from '../providers/UserContext';

export default function SavedScreen({ navigation }) {
  const { isSignedIn, user } = useContext(UserContext);

  const [page, setPage] = useState('Articles');

  // TODO put re render for choosign citations or articles
  useEffect(() => {}, [user, isSignedIn]);

  if (!isSignedIn) {
    return <NotLoggedIn screenName='saved articles/citations' />;
  } else {
    return (
      <View>
        <SavedArticlesList navigation={navigation} />
      </View>
    );
  }
}

// export default function SavedScreen({ navigation }) {
//   const [getUserStatus, isSignedIn, currentUser] = checkAuth();

//   // choose whether we display articles or citations component
//   const [page, setPage] = useState('Articles');

//   const [
//     savedArticles,
//     setSavedArticles,
//     getSavedArticles,
//     unsaveArticle,
//   ] = useSavedArticles();

//   // Get the user's saved articles on sign in / first load
//   useEffect(() => {
//     console.log('useEffect savedScreen');
//     getUserStatus();
//     if (isSignedIn) {
//       getSavedArticles(currentUser.uid);
//     }
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Selector
//         page={page}
//         setPage={setPage}
//         titles={['Articles', 'Citations']}
//       />

//       <View>
//         {isSignedIn ? (
//           <AllSaved
//             navigation={navigation}
//             page={page}
//             savedArticles={savedArticles}
//             unsaveArticle={unsaveArticle}
//           />
//         ) : (
//           <ScrollView>
//             <NotLoggedIn screenTitle='saved articles and citations' />
//           </ScrollView>
//         )}
//       </View>
//     </View>
//   );
// }

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fafafa',
  },
});
