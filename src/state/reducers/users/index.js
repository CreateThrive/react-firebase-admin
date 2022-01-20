import { createReducer } from '@reduxjs/toolkit';

import {
  USERS_FETCH_DATA_INIT,
  USERS_FETCH_DATA_SUCCESS,
  USERS_FETCH_DATA_FAIL,
  USERS_DELETE_USER_INIT,
  USERS_DELETE_USER_SUCCESS,
  USERS_DELETE_USER_FAIL,
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
  data: [],
  loading: false,
  error: null,
  success: false,
  deleted: false,
};

export const usersReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(USERS_FETCH_DATA_INIT, () => ({
      ...initialState,
      loading: true,
    }))
    .addCase(USERS_FETCH_DATA_SUCCESS, (state, { data }) => ({
      ...state,
      data,
      loading: false,
      error: null,
    }))
    .addCase(USERS_FETCH_DATA_FAIL, (state, payload) => ({
      ...state,
      loading: false,
      error: payload.error,
    }))
    .addCase(USERS_DELETE_USER_INIT, (state) => ({
      ...state,
      loading: true,
    }))
    .addCase(USERS_DELETE_USER_SUCCESS, (state, payload) => ({
      ...state,
      data: state.data.filter((elem) => elem.id !== payload.id),
      loading: false,
      error: null,
      deleted: true,
    }))
    .addCase(USERS_DELETE_USER_FAIL, (state, payload) => ({
      ...state,
      loading: false,
      error: payload.error,
    }))
    .addCase(USERS_CREATE_USER_INIT, (state) => ({
      ...state,
      loading: true,
    }))
    .addCase(USERS_CREATE_USER_SUCCESS, (state, payload) => ({
      ...state,
      data: state.data.concat(payload.user),
      loading: false,
      error: null,
      success: true,
    }))
    .addCase(USERS_CREATE_USER_FAIL, (state, payload) => ({
      ...state,
      loading: false,
      error: payload.error,
    }))
    .addCase(USERS_MODIFY_USER_INIT, (state) => ({
      ...state,
      loading: true,
    }))
    .addCase(USERS_MODIFY_USER_SUCCESS, (state, payload) => ({
      ...state,
      data: !state.data
        ? []
        : state.data.map((elem) => {
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
    }))
    .addCase(USERS_MODIFY_USER_FAIL, (state, payload) => ({
      ...state,
      loading: false,
      error: payload.error,
    }))
    .addCase(USERS_CLEAN_UP, (state) => ({
      ...state,
      loading: false,
      error: null,
      success: false,
      deleted: false,
    }))
    .addCase(USERS_CLEAR_DATA_LOGOUT, () => ({
      ...initialState,
    }));
});
