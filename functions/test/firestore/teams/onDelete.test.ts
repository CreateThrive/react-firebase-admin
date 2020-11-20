import { admin, test } from '../../util/config';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import onDelete from '../../../src/firestore/teams/onDelete.function';
import 'mocha';

chai.use(chaiAsPromised);

describe('onDelete team Firestore', () => {
  afterEach(async () => {
    await admin.firestore().collection('users').doc('test').delete();
  });

  it('should delete the team from the user teams array', async () => {
    await admin
      .firestore()
      .collection('users')
      .doc('test')
      .set({ email: 'user@example.com', name: 'Test', teams: ['testId'] });

    const wrapped = test.wrap(onDelete);

    await wrapped(
      {},
      {
        params: {
          teamId: 'testId',
        },
      }
    );

    const user = (
      await admin.firestore().collection('users').doc('test').get()
    ).data();

    return await chai.expect(user?.teams).to.be.empty;
  });
});
