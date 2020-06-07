import { admin, test } from './util/admin';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as onDelete from '../src/db/users/onDelete.function';
import 'mocha';

chai.use(chaiAsPromised);

describe('onDelete', () => {
  let userRecord: any;

  before(async () => {
    const user = {
      uid: '1234',
      email: 'user@example.com',
      password: 'secretPassword'
    };
    userRecord = await admin.auth().createUser(user);
  });

  it('should delete the user from the authentication section', () => {
    const wrapped = test.wrap(onDelete.default);

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
