import { auth } from 'firebase-admin';
import { database } from 'firebase-functions';

export default database.ref('users/{uid}').onDelete((snapshot, context) => {
  const { uid } = context.params;
  return auth().deleteUser(uid);
});
