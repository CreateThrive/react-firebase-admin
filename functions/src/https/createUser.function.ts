import { https } from 'firebase-functions';
import { auth } from 'firebase-admin';

const createUserAuth = async (email: string, isAdmin: boolean) => {
  const { uid } = await auth().createUser({ email });

  await auth().setCustomUserClaims(uid, {
    isAdmin
  });

  return uid;
};

export default https.onCall(async data => {
  const { email, isAdmin } = data;

  if (!email) {
    throw new https.HttpsError('invalid-argument', 'auth/invalid-email');
  }

  let uid;
  try {
    uid = await createUserAuth(email, isAdmin);
  } catch (error) {
    throw new https.HttpsError('invalid-argument', error.code);
  }

  return { uid };
});
