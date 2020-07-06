import firebase from 'firebase';
import React, { createContext, Component } from 'react';

const firebaseConfig = {
  apiKey: 'AIzaSyDcPCEfm-rGSYwyaXj-HIzmwZP1_YAKFQ4',
  authDomain: 'quick-cceec.firebaseapp.com',
  databaseURL: 'https://quick-cceec.firebaseio.com',
  projectId: 'quick-cceec',
  storageBucket: 'quick-cceec.appspot.com',
  messagingSenderId: '1084755414390',
  appId: '1:1084755414390:web:fdc1e0db9f5e37a546be57',
  measurementId: 'G-YDE8TN0TGE',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

export const UserContext = createContext({ user: null });

class UserProvider extends Component {
  state = {
    user: null,
  };

  componentDidMount = () => {
    auth.onAuthStateChanged((userAuth) => {
      this.setState({ user: userAuth });
    });
  };
  render() {
    return (
      <UserContext.Provider value={this.state.user}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
export default UserProvider;
