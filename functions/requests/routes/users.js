const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });
const { v4: uuid } = require('uuid');

const router = express.Router();

const createUserAuth = async (email, isAdmin) => {
  const { uid } = await admin.auth().createUser({ email, password: uuid() });

  await admin.auth().setCustomUserClaims(uid, {
    isAdmin
  });

  return uid;
};

router.post('/', (request, response) => {
  cors(request, response, async () => {
    const { email, isAdmin } = request.body;

    if (!email) {
      return response
        .status(400)
        .json({ error: { code: 'auth/invalid-email' } });
    }

    let uid;
    try {
      uid = await createUserAuth(email, isAdmin);
    } catch (error) {
      return response.status(500).json({ error });
    }

    return response.status(200).json({ uid });
  });
});

module.exports = router;
