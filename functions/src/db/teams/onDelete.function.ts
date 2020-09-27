import { database } from 'firebase-admin';
import { database as db } from 'firebase-functions';
import { BatchUpdate, IUserRtdb } from '../../types';

export default db.ref('teams/{teamId}').onDelete(async (snapshot, context) => {
  const { teamId } = context.params;
  let users;

  try {
    users = (await database().ref('users').once('value')).val();
  } catch (error) {
    console.log(error);
  }

  users = Object.entries(users).filter(([key, user]) => {
    const { teams } = user as IUserRtdb;

    return teams?.includes(teamId);
  });

  const batchUpdate: BatchUpdate = {};

  users.forEach(([key, user]) => {
    const { teams } = user as IUserRtdb;

    if (teams) {
      const newTeams = teams.filter((index: string) => index !== teamId);

      batchUpdate[`/${key}/teams`] = newTeams;
    }
  });

  return database().ref('users').update(batchUpdate);
});
