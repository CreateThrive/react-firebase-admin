import { admin, test } from '../util/config';
import { https } from 'firebase-functions';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as createUser from '../../src/https/createUser.function';
import 'mocha';

chai.use(chaiAsPromised);

describe('createUser', () => {
  let userRecord: any;

  after(async () => {
    await admin.auth().deleteUser(userRecord.uid);
  });

  it('should throw an error because the email is not provided', () => {
    const wrapped = test.wrap(createUser.default);

    const data = {
      email: '',
      isAdmin: false
    };

    return chai
      .expect(wrapped(data))
      .to.be.rejectedWith(https.HttpsError, 'auth/invalid-email');
  });

  it('should create the user in auth with correct email and custom claims', () => {
    const wrapped = test.wrap(createUser.default);

    const data = {
      email: 'user@example.com',
      isAdmin: false
    };

    return wrapped(data).then(async (res: any) => {
      userRecord = await admin.auth().getUser(res.uid);

      chai.assert.equal(data.email, userRecord.email);
      chai.assert.equal(data.isAdmin, userRecord.customClaims!.isAdmin);
    });
  });
});
