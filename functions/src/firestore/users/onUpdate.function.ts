import { firestore } from 'firebase-functions';
import { auth } from 'firebase-admin';

export default firestore
  .document('/users/{uid}')
  .onUpdate((change, context) => {
    const before = change.before.data();
    const after = change.after.data();
    const { isAdmin } = after;

    if (before.isAdmin === isAdmin) {
      return null;
    }

    const { uid } = context.params;

    return auth().setCustomUserClaims(uid, {
      isAdmin,
    });
  });
