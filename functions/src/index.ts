import * as loadFunctions from 'firebase-function-tools';
import * as admin from 'firebase-admin';
// This import is needed by admin.initializeApp() to get the project info (Database url, project id, etc)
// @ts-ignore
import * as functions from 'firebase-functions';

admin.initializeApp();

loadFunctions(__dirname, exports, '.function.js');
