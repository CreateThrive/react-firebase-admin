import { admin, test } from './util/admin';
import * as chai from 'chai';
import 'mocha';

describe('onUpdate', () => {
  let onUpdate: any;
  let userRecord: any;

  before(async () => {
    onUpdate = require('../src/db/users/onUpdate.function');

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
    const wrapped = test.wrap(onUpdate);

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
          chai.assert.isTrue(snap.customClaims!.isAdmin);
        });
    });
  });
});
