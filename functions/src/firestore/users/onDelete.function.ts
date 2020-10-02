import { auth } from 'firebase-admin';
import { firestore } from 'firebase-functions';

export default firestore
  .document('users/{uid}')
  .onDelete((snapshot, context) => {
    const { uid } = context.params;
    return auth().deleteUser(uid);
  });
