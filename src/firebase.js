import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

const config = {
  apiKey: process.env.REACT_APP_FIRE_BASE_KEY,
  authDomain: process.env.REACT_APP_FIRE_BASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIRE_BASE_DB_URL,
  projectId: process.env.REACT_APP_FIRE_BASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIRE_BASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIRE_BASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIRE_BASE_APP_ID,
  measurementId: process.env.REACT_APP_FIRE_BASE_MEASURMENT_ID
};

firebase.initializeApp(config);
firebase.database();
firebase.storage();

export default firebase;
