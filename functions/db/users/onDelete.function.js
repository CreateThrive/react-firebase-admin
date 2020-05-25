const functions = require('firebase-functions');
const admin = require('firebase-admin');

export default functions.database
  .ref('users/{uid}')
  .onDelete((snapshot, context) => {
    const { uid } = context.params;
    return admin.auth().deleteUser(uid);
  });
