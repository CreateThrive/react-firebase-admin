import * as firebase from '@firebase/testing';
import 'mocha';

import { getFirestore, auth, clearFirestoreData } from '../../util/config';

describe('Firestore: Users - rules', () => {
  const testDoc = (db: firebase.firestore.Firestore) => {
    return db.collection('users').doc('testUser');
  };

  const testDocSameIdAsUser = (db: firebase.firestore.Firestore) => {
    return db.collection('users').doc('test');
  };

  const user = {
    name: 'Test',
    email: 'test@test.com',
    createdAt: 'Date',
    location: 'test',
    isAdmin: false,
  };

  afterEach(async () => {
    await clearFirestoreData();
  });

  after(async () => {
    await Promise.all(firebase.apps().map((app) => app.delete()));
  });

  it('should not allow to create a user if the user is not authenticated', async () => {
    const db = getFirestore(null);
    await firebase.assertFails(testDoc(db).set(user));
  });

  it('should not allow to create a user if the user is authenticated and is not and admin', async () => {
    const db = getFirestore(auth());
    await firebase.assertFails(testDoc(db).set(user));
  });

  it('should allow to create a user if the user is authenticated and is an admin', async () => {
    const role = 'Admin';
    const db = getFirestore(auth(role));
    await firebase.assertSucceeds(testDoc(db).set(user));
  });

  it('should not allow to update a user if the user is authenticated and is not an admin and the user to update has a different id', async () => {
    const role = 'Admin';
    let db = getFirestore(auth(role));
    await testDoc(db).set(user);
    db = getFirestore(auth());
    await firebase.assertFails(testDoc(db).update(user));
  });

  it('should allow to update a user if the user is authenticated and is not an admin and the user to update has the same id', async () => {
    const role = 'Admin';
    let db = getFirestore(auth(role));
    await testDocSameIdAsUser(db).set(user);
    db = getFirestore(auth());
    await firebase.assertSucceeds(testDocSameIdAsUser(db).update(user));
  });

  it('should allow to update a user if the user is authenticated and is an admin', async () => {
    const role = 'Admin';
    const db = getFirestore(auth(role));
    await testDoc(db).set(user);
    await firebase.assertSucceeds(testDoc(db).update(user));
  });

  it('should not allow to delete items in the users collection if not authenticated', async () => {
    const db = getFirestore(null);
    await firebase.assertFails(testDoc(db).delete());
  });

  it('should not allow to delete items in the users collection if authenticated but not admin', async () => {
    const db = getFirestore(auth());
    await firebase.assertFails(testDoc(db).delete());
  });

  it('should allow to delete items in the users collection if authenticated and is admin', async () => {
    const role = 'Admin';
    const db = getFirestore(auth(role));
    await firebase.assertSucceeds(testDoc(db).delete());
  });
});
