import { admin, test } from '../../util/config';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import onDelete from '../../../src/db/teams/onDelete.function';
import 'mocha';

chai.use(chaiAsPromised);

describe('onDelete team Realtime Database', () => {
  afterEach(async () => {
    await admin.database().ref('users/test').remove();
  });

  it('should delete the team from the user teams array', async () => {
    await admin
      .database()
      .ref('users/test')
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

    return await chai.expect(
      (await admin.database().ref('users/test/teams').once('value')).val()
    ).to.be.null;
  });
});
