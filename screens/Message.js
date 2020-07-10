import React, { useContext, useEffect } from 'react';
import { Text, View } from 'react-native';

import { AuthContext } from '../providers/AuthContext';

import useAuth from '../hooks/useAuth';

import useSaved from '../hooks/useSaved';

const Message = () => {
  const [state, setState] = useContext(AuthContext);

  const { getUserStatus, getUser } = useAuth();

  const { getSavedArticles } = useSaved();

  useEffect(() => {
    console.log(state);
    getUser();
  }, [state]);

  return (
    <View>
      <Text>{state.savedArticles}</Text>

      <Text onPress={() => getUser()} style={{ marginTop: 30 }}>
        Get User
      </Text>
      <Text onPress={() => getSavedArticles()} style={{ marginTop: 30 }}>
        Get User
      </Text>
    </View>
  );
};

export default Message;
