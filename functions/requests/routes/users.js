const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });
const Busboy = require('busboy');
const path = require('path');
const os = require('os');
const fs = require('fs');
const uuid = require('uuid/v4');

const router = express.Router();

const { storageBucket } = JSON.parse(process.env.FIREBASE_CONFIG);

const bucket = admin.storage().bucket(storageBucket);

const uploadImageToBucket = async uploadedImage => {
  return bucket.upload(uploadedImage.file, {
    uploadMedia: 'media',
    metada: {
      metadata: {
        contentType: uploadedImage.type
      }
    },
    public: true
  });
};

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

router.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const userRef = admin.database().ref(`users/${id}`);

  const logoUrl = (await userRef.child('logoUrl').once('value')).val();

  let removeLogo = Promise.resolve();

  if (logoUrl) {
    const fileName = logoUrl.split('/').pop();

    removeLogo = bucket.file(fileName).delete();
  }

  const removeUserDb = userRef.remove();

  const removeUserAuth = admin.auth().deleteUser(id);

  try {
    await Promise.all([removeUserDb, removeUserAuth, removeLogo]);
  } catch (error) {
    console.error(error);
    return response.status(500).json({ error });
  }

  return response.status(200).json({});
});

const modifyUserAuth = (userId, isAdmin) => {
  return admin.auth().setCustomUserClaims(userId, {
    isAdmin
  });
};

const modifyUserDb = (name, location, createdAt, isAdmin, logoUrl, userId) => {
  let params = { name, location, createdAt, isAdmin };

  if (logoUrl) params['logoUrl'] = logoUrl;

  return admin
    .database()
    .ref(`users/${userId}`)
    .update({ ...params });
};

const removeOldLogo = async userId => {
  const url = (
    await admin
      .database()
      .ref(`users/${userId}`)
      .child('logoUrl')
      .once('value')
  ).val();

  if (url) {
    const fileName = url.split('/').pop();
    console.log('filename', fileName);
    return bucket.file(fileName).delete();
  } else {
    return Promise.resolve();
  }
};

router.patch('/:id', (request, response) => {
  cors(request, response, () => {
    const busboy = new Busboy({ headers: request.headers });

    let uploadedImage = null;

    let fieldData = {};

    busboy.on('field', (fieldName, value) => {
      fieldData = { ...fieldData, [`${fieldName}`]: value };
    });

    busboy.on('file', (fieldName, file, fileName, encoding, mimetype) => {
      const filepath = path.join(os.tmpdir(), fileName);

      uploadedImage = { file: filepath, type: mimetype, fileName };

      file.pipe(fs.createWriteStream(filepath));
    });

    busboy.on('finish', async () => {
      const { name, location, createdAt } = fieldData;

      const isAdmin = JSON.parse(fieldData.isAdmin);

      const { id } = request.params;

      const setUserClaims = modifyUserAuth(id, isAdmin);

      let removeLogo = Promise.resolve();
      let uploadImage = Promise.resolve();

      if (uploadedImage) {
        removeLogo = removeOldLogo(id);
        uploadImage = uploadImageToBucket(uploadedImage);
      }

      await removeLogo;

      let logoUrl = null;

      if (uploadedImage) {
        logoUrl = `https://storage.googleapis.com/${bucket.name}/${uploadedImage.fileName}`;
      }

      const modifyUser = modifyUserDb(
        name,
        location,
        createdAt,
        isAdmin,
        logoUrl,
        id
      );

      try {
        await Promise.all([modifyUser, setUserClaims, uploadImage]);
      } catch (error) {
        console.error(error);
        return response.status(500).json({ error });
      }

      return response.status(201).json({
        id,
        name,
        location,
        logoUrl,
        isAdmin,
        createdAt
      });
    });

    busboy.end(request.rawBody);
  });
});

module.exports = router;
