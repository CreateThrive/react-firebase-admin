import { createReducer } from 'redux-act';

import {
  USERS_FETCH_DATA_INIT,
  USERS_FETCH_DATA_SUCCESS,
  USERS_FETCH_DATA_FAIL,
  USERS_DELETE_USER_INIT,
  USERS_DELETE_USER_SUCCESS,
  USERS_DELETE_USER_FAIL,
  USERS_CLEAR_DATA,
  USERS_CREATE_USER_INIT,
  USERS_CREATE_USER_SUCCESS,
  USERS_CREATE_USER_FAIL,
  USERS_MODIFY_USER_INIT,
  USERS_MODIFY_USER_SUCCESS,
  USERS_MODIFY_USER_FAIL,
  USERS_CLEAN_UP
} from 'state/actions/users';

const initialState = {
  data: [],
  loading: false,
  error: null,
  success: false,
  deleted: false
};

export const usersReducer = createReducer(
  {
    [USERS_FETCH_DATA_INIT]: () => ({
      ...initialState,
      loading: true
    }),
    [USERS_FETCH_DATA_SUCCESS]: (state, payload) => ({
      ...state,
      data: payload.users,
      loading: false,
      error: null
    }),
    [USERS_FETCH_DATA_FAIL]: (state, payload) => ({
      ...state,
      loading: false,
      error: payload.error
    }),
    [USERS_DELETE_USER_INIT]: state => ({
      ...state,
      loading: true
    }),
    [USERS_DELETE_USER_SUCCESS]: (state, payload) => ({
      ...state,
      data: state.data.filter(elem => elem.id !== payload.id),
      loading: false,
      error: null,
      deleted: true
    }),
    [USERS_DELETE_USER_FAIL]: (state, payload) => ({
      ...state,
      loading: false,
      error: payload.error
    }),
    [USERS_CLEAR_DATA]: () => ({
      ...initialState
    }),
    [USERS_CREATE_USER_INIT]: state => ({
      ...state,
      loading: true
    }),
    [USERS_CREATE_USER_SUCCESS]: (state, payload) => ({
      ...state,
      data: state.data.concat(payload.user),
      loading: false,
      error: null,
      success: true
    }),
    [USERS_CREATE_USER_FAIL]: (state, payload) => ({
      ...state,
      loading: false,
      error: payload.error
    }),
    [USERS_MODIFY_USER_INIT]: state => ({
      ...state,
      loading: true
    }),
    [USERS_MODIFY_USER_SUCCESS]: (state, payload) => ({
      ...state,
      data: state.data.map(elem => {
        if (elem.id === payload.id) {
          return {
            name: payload.user.name,
            location: payload.user.location,
            id: payload.id,
            logoUrl: payload.user.logoUrl,
            createdAt: payload.user.createdAt,
            email: elem.email
          };
        }
        return elem;
      }),
      loading: false,
      error: null,
      success: true
    }),
    [USERS_MODIFY_USER_FAIL]: (state, payload) => ({
      ...state,
      loading: false,
      error: payload.error
    }),
    [USERS_CLEAN_UP]: state => ({
      ...state,
      loading: false,
      error: null,
      success: false,
      deleted: false
    })
  },
  initialState
);
