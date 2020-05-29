const functions = require('firebase-functions');
const admin = require('firebase-admin');

export default functions.database
  .ref('/users/{uid}')
  .onUpdate((change, context) => {
    const before = change.before.val();
    const after = change.after.val();
    const { isAdmin } = after;

    if (before.isAdmin === isAdmin) {
      return null;
    }

    const { uid } = context.params;

    return admin.auth().setCustomUserClaims(uid, {
      isAdmin
    });
  });
