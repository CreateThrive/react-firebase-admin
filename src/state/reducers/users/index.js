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
  USERS_CLEAN_UP,
  USERS_CLEAR_DATA_LOGOUT,
} from 'state/actions/users';

const initialState = {
  list: [],
  user: {
    name: '',
    email: '',
    location: '',
    isAdmin: false,
    file: null,
    createdAt: new Date().toDateString(),
  },
  loading: false,
  error: null,
  success: false,
  deleted: false,
};

export const usersReducer = createReducer(
  {
    [USERS_FETCH_DATA_INIT]: () => ({
      ...initialState,
      loading: true,
    }),
    [USERS_FETCH_DATA_SUCCESS]: (state, payload) => ({
      ...state,
      list: payload.list || [],
      user: payload.user || initialState.user,
      loading: false,
      error: null,
    }),
    [USERS_FETCH_DATA_FAIL]: (state, payload) => ({
      ...state,
      loading: false,
      error: payload.error,
    }),
    [USERS_DELETE_USER_INIT]: (state) => ({
      ...state,
      loading: true,
    }),
    [USERS_DELETE_USER_SUCCESS]: (state, payload) => ({
      ...state,
      list: state.list.filter((elem) => elem.id !== payload.id),
      loading: false,
      error: null,
      deleted: true,
    }),
    [USERS_DELETE_USER_FAIL]: (state, payload) => ({
      ...state,
      loading: false,
      error: payload.error,
    }),
    [USERS_CLEAR_DATA]: (state) => ({
      ...initialState,
      list: state.list,
    }),
    [USERS_CREATE_USER_INIT]: (state) => ({
      ...state,
      loading: true,
    }),
    [USERS_CREATE_USER_SUCCESS]: (state, payload) => ({
      ...state,
      list: state.list.concat(payload.user),
      loading: false,
      error: null,
      success: true,
    }),
    [USERS_CREATE_USER_FAIL]: (state, payload) => ({
      ...state,
      loading: false,
      error: payload.error,
    }),
    [USERS_MODIFY_USER_INIT]: (state) => ({
      ...state,
      loading: true,
    }),
    [USERS_MODIFY_USER_SUCCESS]: (state, payload) => ({
      ...state,
      list: !state.list
        ? []
        : state.list.map((elem) => {
            if (elem.id === payload.id) {
              return {
                name: payload.user.name,
                location: payload.user.location,
                id: payload.id,
                logoUrl: payload.user.logoUrl,
                createdAt: payload.user.createdAt,
                email: elem.email,
              };
            }
            return elem;
          }),
      loading: false,
      error: null,
      success: true,
    }),
    [USERS_MODIFY_USER_FAIL]: (state, payload) => ({
      ...state,
      loading: false,
      error: payload.error,
    }),
    [USERS_CLEAN_UP]: (state) => ({
      ...state,
      loading: false,
      error: null,
      success: false,
      deleted: false,
    }),
    [USERS_CLEAR_DATA_LOGOUT]: () => ({
      ...initialState,
    }),
  },
  initialState
);
