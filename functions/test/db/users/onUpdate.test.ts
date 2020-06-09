import { admin, test } from '../../util/config';
import * as chai from 'chai';
import onUpdate from '../../../src/db/users/onUpdate.function';
import 'mocha';

describe('onUpdate', () => {
  let userRecord: any;

  before(async () => {
    const user = {
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
    test.cleanup();
  });

  it("should update user's custom claims in auth", async () => {
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

    await wrapped(change, {
      params: {
        uid: userRecord.uid
      }
    });
    return admin
      .auth()
      .getUser(userRecord.uid)
      .then(snap => {
        chai.assert.isTrue(snap.customClaims!.isAdmin);
      });
  });
});
