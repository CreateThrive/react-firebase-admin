/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
const admin = require('firebase-admin');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter the path to the service account key file: ', path => {
  const serviceAccount = require(path);

  rl.question('Enter database URL: ', databaseURL => {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL
    });

    rl.question('Enter user email: ', email => {
      rl.question('Enter user password: ', async password => {
        console.log('Setting admin account in authentication 🔨');
        const { uid } = await admin.auth().createUser({
          email,
          password,
          emailVerified: true
        });

        await admin.auth().setCustomUserClaims(uid, {
          isAdmin: true
        });

        console.log('Created admin account in authentication');

        console.log('Creating admin account in database');

        await admin
          .database()
          .ref(`users/${uid}`)
          .set({
            isAdmin: true,
            name: 'Test Name',
            location: 'Test Location',
            createdAt: new Date().toDateString(),
            email
          });

        console.log('Created admin account in database');
        rl.close();
        process.exit(0);
      });
    });
  });
});
