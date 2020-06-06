import * as functions from 'firebase-functions';
import * as testConfig from 'firebase-functions-test';
import * as admin from 'firebase-admin';

const config = functions.config().env.testingConfig;

const projectConfig = {
  databaseURL: config.databaseURL,
  storageBucket: config.storageBucket,
  projectId: config.projectId
};

const test = testConfig(projectConfig, config.serviceAccountKey);

admin.initializeApp();

export { admin, test };
