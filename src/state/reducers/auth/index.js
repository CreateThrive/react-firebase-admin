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

export const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(AUTH_SIGN_IN_INIT, () => ({
      ...initialState,
      loading: true,
    }))
    .addCase(AUTH_SIGN_IN_FAIL, (state, payload) => ({
      ...state,
      loading: false,
      error: payload.error,
    }))
    .addCase(AUTH_FETCH_USER_DATA_INIT, () => ({
      ...initialState,
      loading: true,
    }))
    .addCase(
      AUTH_FETCH_USER_DATA_SUCCESS,
      (state, { id, isAdmin, email, name, location, logoUrl, createdAt }) => ({
        ...state,
        userData: {
          id,
          isAdmin,
          email,
          name,
          location,
          logoUrl,
          createdAt,
        },
        loading: false,
        error: null,
      })
    )
    .addCase(AUTH_FETCH_USER_DATA_FAIL, (state, payload) => ({
      ...state,
      loading: false,
      error: payload.error,
    }))
    .addCase(AUTH_LOGOUT_INIT, () => ({ ...initialState }))
    .addCase(AUTH_LOGOUT_SUCCESS, (state) => ({ ...state }))
    .addCase(AUTH_RESTORE_SESSION_INIT, (state) => ({
      ...state,
      restoring: true,
    }))
    .addCase(AUTH_RESTORE_SESSION_SUCCESS, (state) => ({
      ...state,
      restoring: false,
      restoringError: null,
    }))
    .addCase(AUTH_RESTORE_SESSION_FAIL, (state) => ({
      ...state,
      restoring: false,
      restoringError: true,
    }))
    .addCase(AUTH_SET_PASSWORD_INIT, (state) => ({ ...state, loading: true }))
    .addCase(AUTH_SET_PASSWORD_SUCCESS, (state) => ({
      ...state,
      loading: false,
      error: null,
    }))
    .addCase(AUTH_SET_PASSWORD_FAIL, (state, payload) => ({
      ...state,
      loading: false,
      error: payload.error,
    }))
    .addCase(AUTH_RESET_PASSWORD_INIT, () => ({
      ...initialState,
      loading: true,
    }))
    .addCase(AUTH_RESET_PASSWORD_SUCCESS, (state) => ({
      ...state,
      loading: false,
      error: null,
      restoredPassword: true,
    }))
    .addCase(AUTH_RESET_PASSWORD_FAIL, (state, payload) => ({
      ...state,
      loading: false,
      error: payload.error,
    }))
    .addCase(AUTH_CLEAN_UP, (state) => ({
      ...state,
      error: null,
      changedPassword: false,
    }))
    .addCase(AUTH_CHANGE_PASSWORD_INIT, (state) => ({
      ...state,
      loading: true,
    }))
    .addCase(AUTH_CHANGE_PASSWORD_SUCCESS, (state) => ({
      ...state,
      loading: false,
      changedPassword: true,
    }))
    .addCase(AUTH_CHANGE_PASSWORD_FAIL, (state, payload) => ({
      ...state,
      loading: false,
      error: payload.error,
    }))
    .addCase(AUTH_UPDATE_USER_DATA, (state, payload) => ({
      ...state,
      userData: {
        id: payload.id,
        email: state.userData.email,
        isAdmin: payload.isAdmin,
        name: payload.name,
        location: payload.location,
        logoUrl: payload.logoUrl || state.userData.logoUrl,
        createdAt: payload.createdAt,
      },
    }))
    .addCase(AUTH_PROVIDER_INIT, (state) => ({
      ...state,
      loading: true,
    }))
    .addCase(
      AUTH_PROVIDER_SUCCESS,
      (state, { id, isAdmin, email, name, location, logoUrl, createdAt }) => ({
        ...state,
        userData: {
          id,
          isAdmin,
          email,
          name,
          location,
          logoUrl,
          createdAt,
        },
        error: null,
        loading: false,
      })
    )
    .addCase(AUTH_PROVIDER_FAIL, (state, payload) => ({
      ...state,
      loading: false,
      error: payload.error,
    }));
});
