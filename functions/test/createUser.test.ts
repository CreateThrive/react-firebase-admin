import { test } from './util/admin';
import { https } from 'firebase-functions';
import * as chai from 'chai';
import 'mocha';

describe('onCreateUser', () => {
  let onCreateUser: any;

  before(async () => {
    onCreateUser = require('../src/https/createUser.function');
  });

  it('should throw an error because the email is not provided', () => {
    const wrapped = test.wrap(onCreateUser);

    const data = {
      email: '',
      isAdmin: false
    };

    return wrapped(data).then(() => {
      chai.expect(https.HttpsError, 'auth/invalid-email');
    });
  });

  it('should create the user into the database', () => {
    const wrapped = test.wrap(onCreateUser);

    const data = {
      uid: '1234',
      email: 'user@example.com',
      isAdmin: false
    };

    return wrapped(data).then((res: any) => {
      chai.assert.equal(data.uid, res.uid);
    });
  });
});
