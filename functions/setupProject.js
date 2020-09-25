/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
const admin = require('firebase-admin');
const inquirer = require('inquirer');
const fs = require('fs');

const configPath = '../src/state/api/index.js';

const importPath = '../src/firebase.js';

const questions = [
  {
    type: 'input',
    name: 'path',
    message: 'Enter the path to the service account key file: ',
  },
  {
    type: 'input',
    name: 'databaseURL',
    message: 'Enter database URL: ',
  },
  {
    type: 'input',
    name: 'email',
    message: 'Enter user email: ',
  },
  {
    type: 'password',
    name: 'password',
    message: 'Enter user password: ',
    mask: '*',
  },
  {
    type: 'list',
    name: 'database',
    message: 'Select the database of your choice:',
    choices: ['Realtime Database', 'Firestore'],
  },

  {
    type: 'confirm',
    name: 'deletedb',
    message: 'Do you want to delete unused cloud functions?',
    default: true,
  },
];

const replaceDatabase = (oldDatabase, newDatabase) => {
  fs.readFile(configPath, 'utf8', (error, data) => {
    if (error) {
      return console.log(error);
    }
    const result = data.replace(oldDatabase, newDatabase);

    fs.writeFile(configPath, result, 'utf8', (err) => {
      if (err) return console.log(err);
    });
  });

  fs.readFile(importPath, 'utf8', (error, data) => {
    if (error) {
      return console.log(error);
    }

    let oldInit;
    let newInit;
    let oldImport;
    let newImport;
    if (oldDatabase === 'rtdb') {
      oldInit = 'firebase.database()';
      newInit = 'firebase.firestore()';
      oldImport = 'firebase/database';
      newImport = 'firebase/firestore';
    } else {
      oldInit = 'firebase.firestore()';
      newInit = 'firebase.database()';
      oldImport = 'firebase/firestore';
      newImport = 'firebase/database';
    }

    data = data.replace(oldInit, newInit);

    data = data.replace(oldImport, newImport);

    fs.writeFile(importPath, data, 'utf8', (err) => {
      if (err) return console.log(err);
    });
  });
};

const deleteDatabase = async (database) => {
  const dir = database !== 'Firestore' ? 'firestore' : 'db';

  try {
    fs.rmdirSync(`./src/${dir}`, { recursive: true });
  } catch (error) {
    console.error(`Error while deleting ${database}. ${error}`);
  }

  try {
    fs.rmdirSync(`./test/${dir}`, { recursive: true });
  } catch (error) {
    console.error(`Error while deleting ${database} tests. ${error}`);
  }
};

inquirer
  .prompt(questions)
  .then(async ({ database, path, email, password, databaseURL, deletedb }) => {
    const serviceAccount = require(path);

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL,
    });

    console.log('Setting admin account in authentication 🔨');

    const { uid } = await admin.auth().createUser({
      email,
      password,
      emailVerified: true,
    });

    await admin.auth().setCustomUserClaims(uid, {
      isAdmin: true,
    });

    console.log('Created admin account in authentication');

    console.log('Creating admin account in database');

    const user = {
      isAdmin: true,
      name: 'Test Name',
      location: 'Test Location',
      createdAt: new Date().toDateString(),
      email,
    };

    if (database === 'Firestore') {
      replaceDatabase('rtdb', 'firestore');
      await admin.firestore().collection('users').doc(uid).set(user);
    } else {
      replaceDatabase('firestore', 'rtdb');
      await admin.database().ref(`users/${uid}`).set(user);
    }

    if (deletedb) {
      deleteDatabase(database);
    }

    console.log(`Created admin account in ${database}`);
    process.exit(0);
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(0);
  });
