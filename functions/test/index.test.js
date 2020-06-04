/* eslint-disable jest/valid-expect */
/* eslint-disable global-require */
const projectConfig = {
  databaseURL: 'https://react-firebase-admin-eeac2.firebaseio.com',
  storageBucket: 'react-firebase-admin-eeac2.appspot.com',
  projectId: 'react-firebase-admin-eeac2'
};

const test = require('firebase-functions-test')(
  projectConfig,
  '/home/jfocco/repositories/react-firebase-admin/serviceAccountKey.json'
);

const admin = require('firebase-admin');

admin.initializeApp();

const chai = require('chai');
chai.use(require('chai-as-promised'));

const { assert, expect } = chai;

describe('Cloud Functions', () => {
  after(() => {
    test.cleanup();
  });

  describe('onDeleteFunction', () => {
    let onDeleteFunction;
    let userRecord;

    before(async () => {
      const user = {
        uid: '1234',
        email: 'user@example.com',
        password: 'secretPassword'
      };
      onDeleteFunction = require('../db/users/onDelete.function');
      userRecord = await admin.auth().createUser(user);
    });

    it('should delete the user from the authentication section', () => {
      const wrapped = test.wrap(onDeleteFunction);

      return wrapped(
        {},
        {
          params: {
            uid: userRecord.uid
          }
        }
      ).then(async () => {
        await expect(admin.auth().getUser(userRecord.uid)).to.be.rejectedWith(
          Error,
          'There is no user record corresponding to the provided identifier.'
        );
      });
    });
  });

  describe('onUpdateFunction', () => {
    let onUpdateFunction;
    let userRecord;

    before(async () => {
      onUpdateFunction = require('../db/users/onUpdate.function');

      const user = {
        uid: '1234',
        email: 'user@example.com',
        password: 'secretPassword'
      };
      const customClaims = {
        isAdmin: false
      };

      userRecord = await admin.auth().createUser(user);
      await admin.auth().setCustomUserClaims(userRecord.uid, customClaims);
    });

    after(async () => {
      await admin.auth().deleteUser(userRecord.uid);
    });

    it('should update the user information in the database', () => {
      const wrapped = test.wrap(onUpdateFunction);

      const beforeSnap = test.database.makeDataSnapshot(
        { email: 'user@example.com', isAdmin: false },
        `users/${userRecord.uid}`
      );
      const afterSnap = test.database.makeDataSnapshot(
        { email: 'user@example.com', isAdmin: true },
        `users/${userRecord.uid}`
      );

      const change = test.makeChange(beforeSnap, afterSnap);

      return wrapped(change, {
        params: {
          uid: userRecord.uid
        }
      }).then(() => {
        return admin
          .auth()
          .getUser(userRecord.uid)
          .then(snap => {
            assert.isTrue(snap.customClaims.isAdmin);
          });
      });
    });
  });
});
