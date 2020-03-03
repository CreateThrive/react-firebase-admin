const loadFunctions = require('firebase-function-tools');
const admin = require('firebase-admin');
// This import is needed by admin.initializeApp() to get the project info (Database url, project id, etc)
const functions = require('firebase-functions');

admin.initializeApp();

loadFunctions(__dirname, exports, '.function.js');
