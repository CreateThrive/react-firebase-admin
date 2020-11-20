import { createAction } from 'redux-act';
import { toastr } from 'react-redux-toastr';
import { v4 as uuid } from 'uuid';

import { firebaseError, deleteLogo, getLogoUrl, uploadLogo } from 'utils';
import {
  fetchCollection,
  createDocument,
  deleteDocument,
  updateDocument,
  batchUpdateDocument,
} from '../api';
import { removeStoreUser, addStoreUser } from './users';

export const TEAMS_FETCH_TEAMS_INIT = createAction('TEAMS_FETCH_TEAMS_INIT');

export const TEAMS_FETCH_TEAMS_SUCCESS = createAction(
  'TEAMS_FETCH_TEAMS_SUCCESS'
);

export const TEAMS_FETCH_TEAMS_FAIL = createAction('TEAMS_FETCH_TEAMS_FAIL');

export const TEAMS_DELETE_TEAM_INIT = createAction('TEAMS_DELETE_TEAM_INIT');

export const TEAMS_DELETE_TEAM_SUCCESS = createAction(
  'TEAMS_DELETE_TEAM_SUCCESS'
);

export const TEAMS_DELETE_TEAM_FAIL = createAction('TEAMS_DELETE_TEAM_FAIL');

export const TEAMS_CREATE_TEAM_INIT = createAction('TEAMS_CREATE_TEAM_INIT');

export const TEAMS_CREATE_TEAM_SUCCESS = createAction(
  'TEAMS_CREATE_TEAM_SUCCESS'
);
export const TEAMS_CREATE_TEAM_FAIL = createAction('TEAMS_CREATE_TEAM_FAIL');

export const TEAMS_MODIFY_TEAM_INIT = createAction('TEAMS_MODIFY_TEAM_INIT');

export const TEAMS_MODIFY_TEAM_SUCCESS = createAction(
  'TEAMS_MODIFY_TEAM_SUCCESS'
);
export const TEAMS_MODIFY_TEAM_FAIL = createAction('TEAMS_MODIFY_TEAM_FAIL');

export const TEAMS_CLEAN_UP = createAction('TEAMS_CLEAN_UP');

export const TEAMS_ADD_USER_INIT = createAction('TEAMS_ADD_USER_INIT');

export const TEAMS_ADD_USER_SUCCESS = createAction('TEAMS_ADD_USER_SUCCESS');

export const TEAMS_ADD_USER_FAIL = createAction('TEAMS_ADD_USER_FAIL');

export const TEAMS_REMOVE_USER_INIT = createAction('TEAMS_REMOVE_USER_INIT');

export const TEAMS_REMOVE_USER_SUCCESS = createAction(
  'TEAMS_REMOVE_USER_SUCCESS'
);

export const TEAMS_REMOVE_USER_FAIL = createAction('TEAMS_REMOVE_USER_FAIL');

export const TEAMS_SELECTED_TEAM = createAction('TEAMS_SELECTED_TEAM');

export const TEAMS_FETCH_TEAM_USERS_INIT = createAction(
  'TEAMS_FETCH_TEAM_USERS_INIT'
);

export const TEAMS_FETCH_TEAM_USERS_SUCCESS = createAction(
  'TEAMS_FETCH_TEAM_USERS_SUCCESS'
);

export const TEAMS_FETCH_TEAM_USERS_FAIL = createAction(
  'TEAMS_FETCH_TEAM_USERS_FAIL'
);

export const fetchTeams = () => {
  return async (dispatch, getState) => {
    dispatch(TEAMS_FETCH_TEAMS_INIT());
    const { locale } = getState().preferences;
    const { isAdmin, id } = getState().auth.userData;

    let teams;
    try {
      teams = await fetchCollection(
        'teams',
        isAdmin
          ? {
              filterBy: 'users',
              value: id,
              isArray: true,
            }
          : {}
      );
    } catch (error) {
      const errorMessage = firebaseError(error.code, locale);
      toastr.error('', errorMessage);
      return dispatch(TEAMS_FETCH_TEAMS_FAIL({ error }));
    }

    return dispatch(
      TEAMS_FETCH_TEAMS_SUCCESS({
        teams: isAdmin
          ? teams
          : teams.filter((value) => value.users?.includes(id)),
      })
    );
  };
};

export const deleteTeam = (id) => {
  return async (dispatch, getState) => {
    dispatch(TEAMS_DELETE_TEAM_INIT());
    const { locale } = getState().preferences;
    const { logoUrl } = getState().teams.teamsList.find(
      (team) => team.id === id
    );

    const deleteLogoTask = logoUrl ? deleteLogo(logoUrl, 'teams') : null;

    const deleteTeamTask = deleteDocument('teams', id);

    try {
      await Promise.all([deleteLogoTask, deleteTeamTask]);
    } catch (error) {
      const errorMessage = firebaseError(error.code, locale);
      toastr.error('', errorMessage);
      return dispatch(
        TEAMS_DELETE_TEAM_FAIL({
          error: errorMessage,
        })
      );
    }

    toastr.success('', 'The team was deleted.');
    return dispatch(TEAMS_DELETE_TEAM_SUCCESS({ id }));
  };
};

export const createTeam = ({ name, description, file }) => {
  return async (dispatch, getState) => {
    dispatch(TEAMS_CREATE_TEAM_INIT());
    const { locale } = getState().preferences;

    const uid = uuid();

    let uploadLogoTask = null;
    let logoUrl = null;
    if (file) {
      logoUrl = getLogoUrl(uid, file, 'teams');
      uploadLogoTask = uploadLogo(uid, file, 'teams');
    }

    const teamData = {
      name,
      description,
      logoUrl,
      createdAt: new Date().toString(),
      createdBy: getState().auth.userData.name,
    };

    const createTeamDbTask = createDocument('teams', uid, teamData);

    try {
      await Promise.all([uploadLogoTask, createTeamDbTask]);
    } catch (error) {
      const errorMessage = firebaseError(error.code, locale);
      toastr.error('', errorMessage);
      return dispatch(
        TEAMS_CREATE_TEAM_FAIL({
          error: errorMessage,
        })
      );
    }

    toastr.success('', 'Team created successfully');
    return dispatch(
      TEAMS_CREATE_TEAM_SUCCESS({ team: { ...teamData, id: uid } })
    );
  };
};

export const modifyTeam = ({ name, description, file, id }) => {
  return async (dispatch, getState) => {
    dispatch(TEAMS_MODIFY_TEAM_INIT());
    const { locale } = getState().preferences;
    const { logoUrl } = getState().teams.teamsList.find(
      (team) => team.id === id
    );

    let deleteLogoTask;
    let uploadLogoTask;
    let newLogoUrl = null;
    if (file) {
      newLogoUrl = getLogoUrl(id, file, 'teams');
      deleteLogoTask = logoUrl && deleteLogo(logoUrl, 'teams');
      uploadLogoTask = uploadLogo(id, file, 'teams');
    }

    const teamData = {
      name,
      description,
      logoUrl: logoUrl || newLogoUrl,
    };
    const updateTeamDbTask = updateDocument('teams', id, teamData);

    try {
      await Promise.all([deleteLogoTask, uploadLogoTask, updateTeamDbTask]);
    } catch (error) {
      const errorMessage = firebaseError(error.code, locale);
      toastr.error('', errorMessage);
      return dispatch(
        TEAMS_MODIFY_TEAM_FAIL({
          error: errorMessage,
        })
      );
    }

    toastr.success('', 'Team updated successfully');

    return dispatch(TEAMS_MODIFY_TEAM_SUCCESS({ team: teamData, id }));
  };
};

export const teamsCleanUp = () => (dispatch) => dispatch(TEAMS_CLEAN_UP());

export const addUser = (teamId, user) => {
  return async (dispatch, getState) => {
    dispatch(TEAMS_ADD_USER_INIT());
    const { locale } = getState().preferences;
    const { teamsList } = getState().teams;

    const userId = user.id;

    const teamUsers =
      teamsList.find((value) => value.id === teamId)?.users || [];
    const userTeams = user?.teams || [];

    const newUserTeams = [...userTeams, teamId];
    const newTeamUsers = [...teamUsers, userId];

    const batchCollections = {
      users: {
        documents: [
          {
            id: userId,
            field: 'teams',
            value: newUserTeams,
          },
        ],
      },

      teams: {
        documents: [
          {
            id: teamId,
            field: 'users',
            value: newTeamUsers,
          },
        ],
      },
    };

    try {
      await batchUpdateDocument(batchCollections);
    } catch (error) {
      const errorMessage = firebaseError(error.code, locale);
      toastr.error('', errorMessage);
      return dispatch(TEAMS_ADD_USER_FAIL({ error }));
    }

    dispatch(removeStoreUser(userId));

    return dispatch(
      TEAMS_ADD_USER_SUCCESS({
        teamId,
        users: newTeamUsers,
        user: { ...user, teams: newUserTeams },
      })
    );
  };
};

export const removeUser = (teamId, userId) => {
  return async (dispatch, getState) => {
    dispatch(TEAMS_REMOVE_USER_INIT());
    const { locale } = getState().preferences;
    const { teamsList, usersList } = getState().teams;

    const user = usersList.find((value) => value.id === userId);
    const teamUsers =
      teamsList.find((value) => value.id === teamId)?.users || [];
    const userTeams = user?.teams || [];

    const newUserTeams = userTeams.filter((value) => value !== teamId);
    const newTeamUsers = teamUsers.filter((value) => value !== userId);

    const bulkUpdate = {};
    bulkUpdate[`/users/${userId}/teams`] = newUserTeams;
    bulkUpdate[`/teams/${teamId}/users`] = newTeamUsers;

    try {
      await updateDocument('', '', bulkUpdate);
    } catch (error) {
      const errorMessage = firebaseError(error.code, locale);
      toastr.error('', errorMessage);
      return dispatch(TEAMS_REMOVE_USER_FAIL({ error }));
    }

    dispatch(addStoreUser({ ...user, teams: newUserTeams }));

    return dispatch(
      TEAMS_REMOVE_USER_SUCCESS({
        teamId,
        users: newTeamUsers,
        userId,
      })
    );
  };
};

export const fetchTeamUsers = (teamId) => {
  return async (dispatch, getState) => {
    dispatch(TEAMS_FETCH_TEAM_USERS_INIT());
    const { locale } = getState().preferences;

    let users;
    try {
      users = await fetchCollection('users', {
        filterBy: 'users',
        value: teamId,
        isArray: true,
      });
    } catch (error) {
      const errorMessage = firebaseError(error.code, locale);
      toastr.error('', errorMessage);
      return dispatch(TEAMS_FETCH_TEAM_USERS_FAIL({ error }));
    }

    dispatch(TEAMS_SELECTED_TEAM({ teamId }));

    return dispatch(
      TEAMS_FETCH_TEAM_USERS_SUCCESS({
        users: users.filter((value) => value.teams?.includes(teamId)),
      })
    );
  };
};
