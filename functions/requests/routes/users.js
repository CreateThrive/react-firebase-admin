const express = require('express');
const admin = require('firebase-admin');
const uuid = require('uuid/v4');

const router = express.Router();

const createUserAuth = async (email, isAdmin) => {
  const { uid } = await admin.auth().createUser({ email, password: uuid() });

  await admin.auth().setCustomUserClaims(uid, {
    isAdmin
  });

  return uid;
};

router.post('/', async (request, response) => {
  const { email, isAdmin } = request.body;

  if (!email) {
    return response.status(400).json({ error: { code: 'auth/invalid-email' } });
  }

  let uid;
  try {
    uid = await createUserAuth(email, isAdmin);
  } catch (error) {
    console.error('Error while creating user', error);
    return response.status(500).json({ error });
  }

  return response.status(200).json({ uid });
});

module.exports = router;
