/* eslint-disable consistent-return */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
const admin = require('firebase-admin');
const inquirer = require('inquirer');
const fs = require('fs');

const configPath = '../config.json';

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
    choices: ['Real Time Database', 'Firestore'],
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
};

const deleteDatabase = async (database) => {
  const dir = database !== 'Firestore' ? 'firestore' : 'db';

  try {
    fs.rmdirSync(`./src/${dir}`, { recursive: true });

    console.log(`${database} cloud functions are deleted!`);
  } catch (err) {
    console.error(`Error while deleting ${database}.`);
  }

  try {
    fs.rmdirSync(`./test/${dir}`, { recursive: true });

    console.log(`${dir} tests are deleted!`);
  } catch (err) {
    console.error(`Error while deleting ${database}.`);
  }
};

inquirer
  .prompt(questions)
  .then(async ({ database, path, email, password, databaseURL }) => {
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

    deleteDatabase(database);

    console.log(`Created admin account in ${database}`);
    process.exit(0);
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(0);
  });
