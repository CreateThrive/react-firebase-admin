import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/functions';

const config = {
  apiKey: process.env.REACT_APP_FIRE_BASE_KEY,
  authDomain: process.env.REACT_APP_FIRE_BASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIRE_BASE_DB_URL,
  projectId: process.env.REACT_APP_FIRE_BASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIRE_BASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIRE_BASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIRE_BASE_APP_ID,
  measurementId: process.env.REACT_APP_FIRE_BASE_MEASURMENT_ID,
};

firebase.initializeApp(config);
const db = firebase.database();
firebase.storage();

if (window.location.hostname === 'localhost') {
  db.useEmulator('localhost', 9000);
  firebase.auth().useEmulator('http://localhost:9099/');
  firebase.functions().useEmulator('localhost', 5001);
}

export default firebase;
