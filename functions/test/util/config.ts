import * as testConfig from 'firebase-functions-test';
import * as admin from 'firebase-admin';
import {
  databaseURL,
  storageBucket,
  projectId,
  serviceAccountKey
} from '../../env.json';

const projectConfig = {
  databaseURL,
  storageBucket,
  projectId,
  serviceAccountKey
};

const test = testConfig(projectConfig, serviceAccountKey);

admin.initializeApp();

export { admin, test };
