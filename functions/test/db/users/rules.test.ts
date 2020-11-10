import * as firebase from '@firebase/testing';
import 'mocha';

import { getDatabase, auth } from '../../util/config';

describe('Realtime: Users - rules', () => {
  const testDoc = (db: firebase.database.Database) => {
    return db.ref('users/testUser');
  };

  const testDocSameIdAsUser = (db: firebase.database.Database) => {
    return db.ref('users/test');
  };

  const user = {
    name: 'Test',
    email: 'test@test.com',
    createdAt: 'Date',
    location: 'test',
    isAdmin: false,
  };

  after(async () => {
    await Promise.all(firebase.apps().map((app) => app.delete()));
  });

  it('should not allow to create a user if the user is not authenticated', async () => {
    const db = getDatabase(null);
    await firebase.assertFails(testDoc(db).set(user));
  });

  it('should not allow to create a user if the user is authenticated and is not and admin', async () => {
    const db = getDatabase(auth());
    await firebase.assertFails(testDoc(db).set(user));
  });

  it('should allow to create a user if the user is authenticated and is an admin', async () => {
    const role = 'Admin';
    const db = getDatabase(auth(role));
    await firebase.assertSucceeds(testDoc(db).set(user));
  });

  it('should not allow to update a user if the user is authenticated and is not an admin and the user to update has a different id', async () => {
    const role = 'Admin';
    let db = getDatabase(auth(role));
    await testDoc(db).set(user);
    db = getDatabase(auth());
    await firebase.assertFails(testDoc(db).update(user));
  });

  it('should allow to update a user if the user is authenticated and is not an admin and the user to update has the same id', async () => {
    const role = 'Admin';
    let db = getDatabase(auth(role));
    await testDocSameIdAsUser(db).set(user);
    db = getDatabase(auth());
    await firebase.assertSucceeds(testDocSameIdAsUser(db).update(user));
  });

  it('should allow to update a user if the user is authenticated and is an admin', async () => {
    const role = 'Admin';
    const db = getDatabase(auth(role));
    await testDoc(db).set(user);
    await firebase.assertSucceeds(testDoc(db).update(user));
  });

  it('should not allow to delete items in the users collection if not authenticated', async () => {
    const db = getDatabase(null);
    await firebase.assertFails(testDoc(db).remove());
  });

  it('should not allow to delete items in the users collection if authenticated but not admin', async () => {
    const db = getDatabase(auth());
    await firebase.assertFails(testDoc(db).remove());
  });

  it('should allow to delete items in the users collection if authenticated and is admin', async () => {
    const role = 'Admin';
    const db = getDatabase(auth(role));
    await firebase.assertSucceeds(testDoc(db).remove());
  });
});
