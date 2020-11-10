import * as testConfig from 'firebase-functions-test';
import * as admin from 'firebase-admin';
import * as firebase from '@firebase/testing';

import {
  databaseURL,
  storageBucket,
  projectId,
  serviceAccountKey,
} from '../../env.json';

const projectConfig = {
  databaseURL,
  storageBucket,
  projectId,
  serviceAccountKey,
};

const test = testConfig(projectConfig, serviceAccountKey);

admin.initializeApp();

const getFirestore = (auth: any) => {
  return firebase.initializeTestApp({ projectId, auth: auth }).firestore();
};

const clearFirestoreData = () => {
  return firebase.clearFirestoreData({
    projectId,
  });
};

const getDatabase = (auth: any) => {
  return firebase
    .initializeTestApp({ databaseName: projectId, auth: auth })
    .database();
};

const auth = (role = '') => {
  return {
    uid: 'test',
    email: 'test@gmail.com',
    email_verified: true,
    isAdmin: role === 'Admin',
  };
};

export { admin, test, getFirestore, getDatabase, auth, clearFirestoreData };
