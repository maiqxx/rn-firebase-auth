// firebase config key set up

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDFDdqzNr8rAUBVUI2qrPHpz5Kz1q698Iw",
    authDomain: "test-projects-73e32.firebaseapp.com",
    projectId: "test-projects-73e32",
    storageBucket: "test-projects-73e32.appspot.com",
    messagingSenderId: "563511997947",
    appId: "1:563511997947:web:8d087255ad8e771a3b475e"
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

export { firebase };