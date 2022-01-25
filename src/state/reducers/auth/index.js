/* eslint-disable no-param-reassign */
import { createReducer } from '@reduxjs/toolkit';

import {
  AUTH_SIGN_IN_INIT,
  AUTH_SIGN_IN_FAIL,
  AUTH_FETCH_USER_DATA_INIT,
  AUTH_FETCH_USER_DATA_SUCCESS,
  AUTH_FETCH_USER_DATA_FAIL,
  AUTH_LOGOUT_INIT,
  AUTH_LOGOUT_SUCCESS,
  AUTH_RESTORE_SESSION_INIT,
  AUTH_RESTORE_SESSION_SUCCESS,
  AUTH_RESTORE_SESSION_FAIL,
  AUTH_SET_PASSWORD_INIT,
  AUTH_SET_PASSWORD_SUCCESS,
  AUTH_SET_PASSWORD_FAIL,
  AUTH_RESET_PASSWORD_INIT,
  AUTH_RESET_PASSWORD_SUCCESS,
  AUTH_RESET_PASSWORD_FAIL,
  AUTH_CLEAN_UP,
  AUTH_CHANGE_PASSWORD_INIT,
  AUTH_CHANGE_PASSWORD_SUCCESS,
  AUTH_CHANGE_PASSWORD_FAIL,
  AUTH_UPDATE_USER_DATA,
  AUTH_PROVIDER_FAIL,
  AUTH_PROVIDER_INIT,
  AUTH_PROVIDER_SUCCESS,
} from 'state/actions/auth';

const initialState = {
  userData: {
    id: null,
    isAdmin: null,
  },
  loading: false,
  error: null,
  restoring: false,
  restoringError: null,
  restoredPassword: false,
  changedPassword: false,
};

export const authReducer = createReducer(initialState, {
  [AUTH_SIGN_IN_INIT]: (state) => {
    state.loading = true;
  },
  [AUTH_SIGN_IN_FAIL]: (state, payload) => {
    state.loading = false;
    state.error = payload.error;
  },
  [AUTH_FETCH_USER_DATA_INIT]: (state) => {
    state.loading = true;
  },
  [AUTH_FETCH_USER_DATA_SUCCESS]: (state, {payload}) => {
    const { user} = payload;
    state.userData = user;
    state.loading = false;
    state.error = null;
  },
  [AUTH_FETCH_USER_DATA_FAIL]: (state, payload) => {
    state.loading = false;
    state.error = payload.error;
  },
  [AUTH_LOGOUT_INIT]: () => ({}),
  [AUTH_LOGOUT_SUCCESS]: () => ({}),
  [AUTH_RESTORE_SESSION_INIT]: (state) => {
    state.restoring = true;
  },
  [AUTH_RESTORE_SESSION_SUCCESS]: (state) => {
    state.restoring = false;
    state.restoringError = null;
  },
  [AUTH_RESTORE_SESSION_FAIL]: (state) => {
    state.restoring = false;
    state.restoringError = true;
  },
  [AUTH_SET_PASSWORD_INIT]: (state) => {
    state.loading = true;
  },
  [AUTH_SET_PASSWORD_SUCCESS]: (state) => {
    state.loading = false;
    state.error = null;
  },
  [AUTH_SET_PASSWORD_FAIL]: (state, payload) => {
    state.loading = false;
    state.error = payload.error;
  },
  [AUTH_RESET_PASSWORD_INIT]: (state) => {
    state.loading = true;
  },
  [AUTH_RESET_PASSWORD_SUCCESS]: (state) => {
    state.loading = false ;
    state.error = null ;
    state.restoredPassword = true ;
  },
  [AUTH_RESET_PASSWORD_FAIL]: (state, payload) => {
    state.loading = false ;
    state.error = payload.error;
  },
  [AUTH_CLEAN_UP]: (state) => {
    state.error = null;
    state.changedPassword = false;
  },
  [AUTH_CHANGE_PASSWORD_INIT]: (state) => {
    state.loading = true;
  },
  [AUTH_CHANGE_PASSWORD_SUCCESS]: (state) => {
    state.loading = false;
    state.changedPassword = true;
  },
  [AUTH_CHANGE_PASSWORD_FAIL]: (state, payload) => {
    state.loading = false;
    state.error = payload.error;
  },
  [AUTH_UPDATE_USER_DATA]: (state, payload) => {
    state.userData = payload;
  },
  [AUTH_PROVIDER_INIT]: (state) => {
    state.loading = true;
  },
  [AUTH_PROVIDER_SUCCESS]: (state, payload) => {
    state.userData = payload;
    state.error = null;
    state.loading = false;
  },
  [AUTH_PROVIDER_FAIL]: (state, payload) => {
    state.loading = false;
    state.error = payload.error;
  },
});
