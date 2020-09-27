import { firestore } from 'firebase-admin';
import { firestore as firestoreFunction } from 'firebase-functions';
import { IUserFirestore } from '../../types';

export default firestoreFunction
  .document('teams/{teamId}')
  .onDelete(async (snapshot, context) => {
    const { teamId } = context.params;

    const batch = firestore().batch();

    let snapshotsUsers;
    try {
      snapshotsUsers = await firestore()
        .collection('users')
        .where('teams', 'array-contains', teamId)
        .get();
    } catch (error) {
      console.log(error);
    }

    snapshotsUsers?.forEach((userSnapshot: any) => {
      const { id } = userSnapshot;
      const { teams } = userSnapshot.data() as IUserFirestore;

      const newTeams = teams.filter((index: string) => index !== teamId);

      const userRef = firestore().collection('users').doc(id);

      batch.update(userRef, { teams: newTeams });
    });

    return batch.commit();
  });
