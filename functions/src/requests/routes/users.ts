import { Router } from 'express';
import { auth } from 'firebase-admin';

const cors = require('cors')({ origin: true });
const { v4: uuid } = require('uuid');

const router = Router();

const createUserAuth = async (email: string, isAdmin: boolean) => {
  const { uid } = await auth().createUser({ email, password: uuid() });

  return auth().setCustomUserClaims(uid, {
    isAdmin
  });
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

export default router;
