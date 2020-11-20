import { createReducer } from 'redux-act';

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

export const teamsReducer = createReducer(
  {
    [TEAMS_FETCH_TEAMS_INIT]: () => ({
      ...initialState,
      loadingTeams: true,
    }),
    [TEAMS_FETCH_TEAMS_SUCCESS]: (state, payload) => ({
      ...state,
      teamsList: payload.teams,
      loadingTeams: false,
      error: null,
    }),
    [TEAMS_FETCH_TEAMS_FAIL]: (state, payload) => ({
      ...state,
      loadingTeams: false,
      error: payload.error,
    }),
    [TEAMS_DELETE_TEAM_INIT]: (state) => ({
      ...state,
      loadingTeams: true,
    }),
    [TEAMS_DELETE_TEAM_SUCCESS]: (state, payload) => ({
      ...state,
      teamsList: state.teamsList.filter((elem) => elem.id !== payload.id),
      loadingTeams: false,
      error: null,
      deleted: true,
    }),
    [TEAMS_DELETE_TEAM_FAIL]: (state, payload) => ({
      ...state,
      loadingTeams: false,
      error: payload.error,
    }),
    [TEAMS_CREATE_TEAM_INIT]: (state) => ({
      ...state,
      loadingTeams: true,
    }),
    [TEAMS_CREATE_TEAM_SUCCESS]: (state, payload) => ({
      ...state,
      teamsList: state.teamsList.concat(payload.team),
      loadingTeams: false,
      error: null,
      success: true,
    }),
    [TEAMS_CREATE_TEAM_FAIL]: (state, payload) => ({
      ...state,
      loadingTeams: false,
      error: payload.error,
    }),
    [TEAMS_MODIFY_TEAM_INIT]: (state) => ({
      ...state,
      loadingTeams: true,
    }),
    [TEAMS_MODIFY_TEAM_SUCCESS]: (state, payload) => ({
      ...state,
      teamsList: !state.teamsList
        ? []
        : state.teamsList.map((elem) => {
            if (elem.id === payload.id) {
              return {
                ...elem,
                name: payload.team.name,
                description: payload.team.description,
                logoUrl: payload.team.logoUrl || null,
              };
            }
            return elem;
          }),
      loadingTeams: false,
      error: null,
      success: true,
    }),
    [TEAMS_MODIFY_TEAM_FAIL]: (state, payload) => ({
      ...state,
      loadingTeams: false,
      error: payload.error,
    }),
    [TEAMS_CLEAN_UP]: (state) => ({
      ...state,
      loadingTeams: false,
      error: null,
      success: false,
      deleted: false,
    }),
    [TEAMS_ADD_USER_FAIL]: (state, payload) => ({
      ...state,
      loadingUsers: false,
      error: payload.error,
    }),
    [TEAMS_ADD_USER_INIT]: (state) => ({
      ...state,
      loadingUsers: true,
    }),
    [TEAMS_ADD_USER_SUCCESS]: (state, payload) => ({
      ...state,
      loadingUsers: false,
      error: null,
      success: true,
      teamsList: state.teamsList.map((value) => {
        if (value.id === payload.teamId) {
          return { ...value, users: payload.users };
        }
        return value;
      }),
      usersList: [...state.usersList, payload.user],
    }),
    [TEAMS_REMOVE_USER_FAIL]: (state, payload) => ({
      ...state,
      loadingUsers: false,
      error: payload.error,
    }),
    [TEAMS_REMOVE_USER_INIT]: (state) => ({
      ...state,
      loadingUsers: true,
    }),
    [TEAMS_REMOVE_USER_SUCCESS]: (state, payload) => ({
      ...state,
      loadingUsers: false,
      error: null,
      teamsList: state.teamsList.map((value) => {
        if (value.id === payload.teamId) {
          return { ...value, users: payload.users };
        }
        return value;
      }),
      usersList: state.usersList.filter((value) => value.id !== payload.userId),
      deleted: true,
    }),
    [TEAMS_SELECTED_TEAM]: (state, payload) => ({
      ...state,
      teamId: payload.teamId,
    }),
    [TEAMS_FETCH_TEAM_USERS_INIT]: (state) => ({
      ...state,
      loadingUsers: true,
    }),
    [TEAMS_FETCH_TEAM_USERS_SUCCESS]: (state, payload) => ({
      ...state,
      usersList: payload.users || [],
      loadingUsers: false,
      error: null,
    }),
    [TEAMS_FETCH_TEAM_USERS_FAIL]: (state, payload) => ({
      ...state,
      loadingUsers: false,
      error: payload.error,
    }),
  },
  initialState
);
