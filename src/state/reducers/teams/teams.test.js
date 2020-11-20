import {
  TEAMS_FETCH_TEAMS_INIT,
  TEAMS_FETCH_TEAMS_SUCCESS,
  TEAMS_FETCH_TEAMS_FAIL,
  TEAMS_DELETE_TEAM_INIT,
  TEAMS_DELETE_TEAM_SUCCESS,
  TEAMS_DELETE_TEAM_FAIL,
  TEAMS_CREATE_TEAM_INIT,
  TEAMS_CREATE_TEAM_SUCCESS,
  TEAMS_CREATE_TEAM_FAIL,
  TEAMS_MODIFY_TEAM_INIT,
  TEAMS_MODIFY_TEAM_SUCCESS,
  TEAMS_MODIFY_TEAM_FAIL,
  TEAMS_CLEAN_UP,
  TEAMS_ADD_USER_FAIL,
  TEAMS_ADD_USER_INIT,
  TEAMS_ADD_USER_SUCCESS,
  TEAMS_REMOVE_USER_FAIL,
  TEAMS_REMOVE_USER_INIT,
  TEAMS_REMOVE_USER_SUCCESS,
  TEAMS_SELECTED_TEAM,
  TEAMS_FETCH_TEAM_USERS_FAIL,
  TEAMS_FETCH_TEAM_USERS_INIT,
  TEAMS_FETCH_TEAM_USERS_SUCCESS,
} from 'state/actions/teams';

import { teamsReducer } from '.';

describe('Teams reducer', () => {
  const initialState = {
    teamsList: [],
    usersList: [],
    loadingTeams: false,
    loadingUsers: false,
    error: null,
    success: false,
    deleted: false,
    teamId: 0,
  };

  const reducerTest = reducerTester(teamsReducer);

  it('should return the initial state', () => {
    reducerTest(initialState, {}, initialState);
  });

  it('should reset to the initialState and set loadingTeams to true when TEAMS_FETCH_TEAMS_INIT action is fired', () => {
    reducerTest(initialState, TEAMS_FETCH_TEAMS_INIT(), {
      ...initialState,
      loadingTeams: true,
    });
  });

  it('should set the state with the corresponding error and set loadingTeams to false when TEAMS_FETCH_TEAMS_FAIL actions is fired', () => {
    reducerTest(initialState, TEAMS_FETCH_TEAMS_FAIL({ error: 'some error' }), {
      ...initialState,
      error: 'some error',
      loadingTeams: false,
    });
  });

  it('should set error to null, loadingTeams to false and teamsList with the corresponding values when TEAMS_FETCH_TEAMS_SUCCESS actions is fired', () => {
    const teamData = [
      {
        name: 'Test name',
        description: 'Test description',
        createdBy: 'Test User',
      },
    ];

    reducerTest(initialState, TEAMS_FETCH_TEAMS_SUCCESS({ teams: teamData }), {
      ...initialState,
      teamsList: teamData,
      loadingTeams: false,
      error: null,
    });
  });

  it('should set loadingTeams to true when TEAMS_DELETE_TEAM_INIT action is fired', () => {
    reducerTest(initialState, TEAMS_DELETE_TEAM_INIT(), {
      ...initialState,
      loadingTeams: true,
    });
  });

  it('should remove the corresponding establishment from the state, set loadingTeams to false and error to null when TEAMS_DELETE_TEAM_SUCCESS action is fired', () => {
    const team = { id: 'exampleId' };

    reducerTest(
      { ...initialState, teamsList: [team] },
      TEAMS_DELETE_TEAM_SUCCESS({ id: 'exampleId' }),
      { ...initialState, error: null, loadingTeams: false, deleted: true }
    );
  });

  it('should set the state with the corresponding error and set loadingTeams to false when TEAMS_DELETE_TEAM_FAIL actions is fired', () => {
    reducerTest(initialState, TEAMS_DELETE_TEAM_FAIL({ error: 'some error' }), {
      ...initialState,
      error: 'some error',
      loadingTeams: false,
    });
  });

  it('should set loadingTeams to true to the current state when TEAMS_CREATE_TEAM_INIT action is fired', () => {
    reducerTest(initialState, TEAMS_CREATE_TEAM_INIT(), {
      ...initialState,
      loadingTeams: true,
    });
  });

  it('should set error to null, loadingTeams to false and add the new user to the current state when TEAMS_CREATE_TEAM_SUCCESS action is fired', () => {
    const team = [
      {
        name: 'Test name',
        description: 'Test description',
        createdBy: 'Test User',
      },
    ];

    reducerTest(initialState, TEAMS_CREATE_TEAM_SUCCESS({ team }), {
      ...initialState,
      teamsList: team,
      success: true,
      loadingTeams: false,
      error: null,
    });
  });

  it('should set loadingTeams to false and error with the corresponding payload to the current state TEAMS_CREATE_TEAM_FAIL action is fired', () => {
    reducerTest(initialState, TEAMS_CREATE_TEAM_FAIL({ error: 'some error' }), {
      ...initialState,
      error: 'some error',
      loadingTeams: false,
    });
  });

  it('should set loadingTeams to true when TEAMS_MODIFY_TEAM_INIT action is fired', () => {
    reducerTest(initialState, TEAMS_MODIFY_TEAM_INIT(), {
      ...initialState,
      loadingTeams: true,
    });
  });

  it('should set loadingTeams to false, error to null and modify the corresponding user when TEAMS_MODIFY_TEAM_SUCCESS action is fired', () => {
    const initialTeams = [
      {
        name: 'Test name',
        description: 'Test description',
        createdBy: 'Test User',
        id: 'test id',
      },
    ];

    const resultTeam = {
      id: 'test id',
      name: 'Test name 2',
      description: 'Test description 2',
      createdBy: 'Test User',
      logoUrl: 'some logo',
    };

    reducerTest(
      { ...initialState, teamsList: initialTeams },
      TEAMS_MODIFY_TEAM_SUCCESS({
        team: resultTeam,
        id: 'test id',
      }),
      {
        ...initialState,
        teamsList: [resultTeam],
        loadingTeams: false,
        error: null,
        success: true,
      }
    );
  });

  it('should set loadingTeams to false and error with the corresponding payload to the current state TEAMS_MODIFY_TEAM_FAIL action is fired', () => {
    reducerTest(initialState, TEAMS_MODIFY_TEAM_FAIL({ error: 'some error' }), {
      ...initialState,
      error: 'some error',
      loadingTeams: false,
    });
  });

  it('should set loadingTeams, success and deleted to false and error to null when TEAMS_CLEAN_UP action is fired', () => {
    reducerTest(initialState, TEAMS_CLEAN_UP(), {
      ...initialState,
      loadingTeams: false,
      success: false,
      deleted: false,
      error: null,
    });
  });

  it('should set loadingUsers to false and error to null when TEAMS_ADD_USER_FAIL action is fired', () => {
    reducerTest(initialState, TEAMS_ADD_USER_FAIL({ error: 'some error' }), {
      ...initialState,
      error: 'some error',
      loadingUsers: false,
    });
  });

  it('should set loadingUsers to true when TEAMS_ADD_USER_INIT action is fired', () => {
    reducerTest(initialState, TEAMS_ADD_USER_INIT(), {
      ...initialState,
      loadingUsers: true,
    });
  });

  it('should set loadingUsers to false, success to true, error to null add the user to the teamsList and usersList when TEAMS_ADD_USER_SUCCESS action is fired', () => {
    const initialTeams = [
      {
        id: 'test id',
        name: 'Test name',
        description: 'Test description',
        createdBy: 'Test User',
        logoUrl: 'some logo',
        users: [],
      },
    ];

    const resultTeam = {
      id: 'test id',
      name: 'Test name',
      description: 'Test description',
      createdBy: 'Test User',
      logoUrl: 'some logo',
      users: ['userId'],
    };

    const user = {
      id: 'userId',
      name: 'Test name 2',
      description: 'Test description 2',
      createdBy: 'Test User',
      logoUrl: 'some logo',
      teams: ['test id'],
    };

    reducerTest(
      { ...initialState, teamsList: initialTeams },
      TEAMS_ADD_USER_SUCCESS({ teamId: 'test id', user, users: ['userId'] }),
      {
        ...initialState,
        error: null,
        loadingUsers: false,
        success: true,
        teamsList: [resultTeam],
        usersList: [user],
      }
    );
  });

  it('should set loadingUsers to false and error with the corresponding payload to the current state when TEAMS_REMOVE_USER_FAIL action is fired', () => {
    reducerTest(initialState, TEAMS_REMOVE_USER_FAIL({ error: 'some error' }), {
      ...initialState,
      error: 'some error',
      loadingUsers: false,
    });
  });

  it('should set loadingUsers to true when TEAMS_REMOVE_USER_INIT action is fired', () => {
    reducerTest(initialState, TEAMS_REMOVE_USER_INIT(), {
      ...initialState,
      loadingUsers: true,
    });
  });

  it('should set loadingUsers to false, deleted to true and set the corresponding usersList and teamsList when TEAMS_REMOVE_USER_SUCCESS action is fired', () => {
    const initialTeams = [
      {
        id: 'test id',
        name: 'Test name',
        description: 'Test description',
        createdBy: 'Test User',
        logoUrl: 'some logo',
        users: ['userId'],
      },
    ];

    const resultTeam = {
      id: 'test id',
      name: 'Test name',
      description: 'Test description',
      createdBy: 'Test User',
      logoUrl: 'some logo',
      users: [],
    };

    const user = {
      id: 'userId',
      name: 'Test name 2',
      description: 'Test description 2',
      createdBy: 'Test User',
      logoUrl: 'some logo',
      teams: ['test id'],
    };

    reducerTest(
      { ...initialState, teamsList: initialTeams, usersList: [user] },
      TEAMS_REMOVE_USER_SUCCESS({
        teamId: 'test id',
        userId: 'userId',
        users: [],
      }),
      {
        ...initialState,
        loadingUsers: false,
        usersList: [],
        teamsList: [resultTeam],
        deleted: true,
      }
    );
  });

  it('should set teamId to the corresponding payload when TEAMS_SELECTED_TEAM action is fired', () => {
    reducerTest(initialState, TEAMS_SELECTED_TEAM({ teamId: 'testId' }), {
      ...initialState,
      teamId: 'testId',
    });
  });

  it('should set loadingUsers to true when TEAMS_FETCH_TEAM_USERS_INIT action is fired', () => {
    reducerTest(initialState, TEAMS_FETCH_TEAM_USERS_INIT(), {
      ...initialState,
      loadingUsers: true,
    });
  });

  it('should set the state with the corresponding error and set loadingUsers to false when TEAMS_FETCH_TEAM_USERS_FAIL actions is fired', () => {
    reducerTest(
      initialState,
      TEAMS_FETCH_TEAM_USERS_FAIL({ error: 'some error' }),
      {
        ...initialState,
        error: 'some error',
        loadingUsers: false,
      }
    );
  });

  it('should set error to null, loadingUsers to false and usersList with the corresponding values when TEAMS_FETCH_TEAM_USERS_SUCCESS actions is fired', () => {
    const usersData = [
      {
        id: 'userId',
        name: 'Test name 2',
        description: 'Test description 2',
        createdBy: 'Test User',
        logoUrl: 'some logo',
        teams: ['test id'],
      },
    ];

    reducerTest(
      initialState,
      TEAMS_FETCH_TEAM_USERS_SUCCESS({ users: usersData }),
      {
        ...initialState,
        usersList: usersData,
        loadingUsers: false,
        error: null,
      }
    );
  });
});
