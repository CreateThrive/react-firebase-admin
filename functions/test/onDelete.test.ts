import { admin, test } from './util/admin';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import 'mocha';

chai.use(chaiAsPromised);

describe('onDelete', () => {
  let onDelete: any;
  let userRecord: any;

  before(async () => {
    const user = {
      uid: '1234',
      email: 'user@example.com',
      password: 'secretPassword'
    };
    onDelete = require('../src/db/users/onDelete.function');
    userRecord = await admin.auth().createUser(user);
  });

  it('should delete the user from the authentication section', () => {
    const wrapped = test.wrap(onDelete);

    return wrapped(
      {},
      {
        params: {
          uid: userRecord.uid
        }
      }
    ).then(async () => {
      await chai
        .expect(admin.auth().getUser(userRecord.uid))
        .to.be.rejectedWith(
          Error,
          'There is no user record corresponding to the provided identifier.'
        );
    });
  });
});
