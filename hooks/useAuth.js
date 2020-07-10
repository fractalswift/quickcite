import firebase from 'firebase';
import { useContext, useState } from 'react';
import { AuthContext } from '../providers/AuthContext';

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

const useAuth = () => {
  const [state, setState] = useContext(AuthContext);

  const [isSignedIn, setSignedIn] = useState(false);

  const getUserStatus = async () => {
    const unsubscribe = firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        console.log('user is signed in');
        setSignedIn(true);
      } else {
        // No user is signed in.
        console.log('no user is signed in');
        setSignedIn(false);
      }
      unsubscribe();
      setState({ ...state, isLoggedIn: true });
    });
  };

  const getUser = async () => {
    console.log('calling getUser from useAuth');

    setState({ ...state, user: auth });
  };

  // Play a specific track
  //   function playTrack(index) {
  //     if (index === state.currentTrackIndex) {
  //       togglePlay();
  //     } else {
  //       setState((state) => ({
  //         ...state,
  //         currentTrackIndex: index,
  //         isPlaying: true,
  //       }));
  //     }
  //   }

  //   // Toggle play or pause
  //   function togglePlay() {
  //     setState((state) => ({ ...state, isPlaying: !state.isPlaying }));
  //   }

  //   // Play the previous track in the tracks array
  //   function playPreviousTrack() {
  //     const newIndex =
  //       (((state.currentTrackIndex + -1) % state.tracks.length) +
  //         state.tracks.length) %
  //       state.tracks.length;
  //     playTrack(newIndex);
  //   }

  //   // Play the next track in the tracks array
  //   function playNextTrack() {
  //     const newIndex = (state.currentTrackIndex + 1) % state.tracks.length;
  //     playTrack(newIndex);
  //   }

  return {
    getUserStatus,
    getUser,
  };

  //   return {
  //     playTrack,
  //     togglePlay,
  //     currentTrackName:
  //       state.currentTrackIndex !== null &&
  //       state.tracks[state.currentTrackIndex].name,
  //     trackList: state.tracks,
  //     isPlaying: state.isPlaying,
  //     playPreviousTrack,
  //     playNextTrack,
  //   };
};

export default useAuth;
