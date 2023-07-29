# Firebase Config Key Set Up

Here's the firebase config key set up. You can add your own file like `config.js` next to `App.js` to put your own firebase credentials. After that, you might want to remove the `config.js` in `.gitignore`. I only added mine in `.gitignore` for security purposes.

```
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR-API-KEY",
    authDomain: "YOUR-AUTH-DOMAIN",
    projectId: "YOUR-PROJECT-ID",
    storageBucket: "YOUR-STORAGE-BUCKET",
    messagingSenderId: "YOUR-MESSAGING-SENDER-ID",
    appId: "YOUR-APP-ID"
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

export { firebase };

```
