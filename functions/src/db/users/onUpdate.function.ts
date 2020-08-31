import { database } from 'firebase-functions';
import { auth } from 'firebase-admin';

export default database.ref('/users/{uid}').onUpdate((change, context) => {
  const before = change.before.val();
  const after = change.after.val();
  const { isAdmin } = after;

  if (before.isAdmin === isAdmin) {
    return null;
  }

  const { uid } = context.params;

  return auth().setCustomUserClaims(uid, {
    isAdmin,
  });
});
