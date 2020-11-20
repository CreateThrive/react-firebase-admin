import { createAction } from 'redux-act';
import { toastr } from 'react-redux-toastr';

import { firebaseError, deleteLogo, getLogoUrl, uploadLogo } from 'utils';
import firebase from 'firebase.js';
import { checkUserData, AUTH_UPDATE_USER_DATA } from './auth';
import {
  fetchCollection,
  fetchDocument,
  createDocument,
  deleteDocument,
  updateDocument,
} from '../api';

export const USERS_FETCH_DATA_INIT = createAction('USERS_FETCH_DATA_INIT');
export const USERS_FETCH_DATA_SUCCESS = createAction(
  'USERS_FETCH_DATA_SUCCESS'
);
export const USERS_FETCH_DATA_FAIL = createAction('USERS_FETCH_DATA_FAIL');

export const USERS_DELETE_USER_INIT = createAction('USERS_DELETE_USER_INIT');
export const USERS_DELETE_USER_SUCCESS = createAction(
  'USERS_DELETE_USER_SUCCESS'
);
export const USERS_DELETE_USER_FAIL = createAction('USERS_DELETE_USER_FAIL');

export const USERS_CREATE_USER_INIT = createAction('USERS_CREATE_USER_INIT');
export const USERS_CREATE_USER_SUCCESS = createAction(
  'USERS_CREATE_USER_SUCCESS'
);
export const USERS_CREATE_USER_FAIL = createAction('USERS_CREATE_USER_FAIL');

export const USERS_MODIFY_USER_INIT = createAction('USERS_MODIFY_USER_INIT');
export const USERS_MODIFY_USER_SUCCESS = createAction(
  'USERS_MODIFY_USER_SUCCESS'
);
export const USERS_MODIFY_USER_FAIL = createAction('USERS_MODIFY_USER_FAIL');

export const USERS_CLEAN_UP = createAction('USERS_CLEAN_UP');

export const USERS_CLEAR_DATA_LOGOUT = createAction('USERS_CLEAR_DATA_LOGOUT');

export const USERS_ADD_USER = createAction('USERS_ADD_USER');

export const USERS_REMOVE_USER = createAction('USERS_REMOVE_USER');

export const fetchUsers = (userId = '') => {
  return async (dispatch, getState) => {
    dispatch(checkUserData());
    const { locale } = getState().preferences;
    const { id } = getState().auth.userData;

    dispatch(USERS_FETCH_DATA_INIT());

    if (userId) {
      let user;
      try {
        user = await fetchDocument('users', userId);
      } catch (error) {
        toastr.error('', error);
        return dispatch(USERS_FETCH_DATA_FAIL({ error }));
      }

      if (!user) {
        const errorMessage = firebaseError('users.UserNotAvailable', locale);
        toastr.error('', errorMessage);
        return dispatch(USERS_FETCH_DATA_FAIL({ error: errorMessage }));
      }

      const users = getState().users.data;
      users.push(user);

      return dispatch(
        USERS_FETCH_DATA_SUCCESS({
          data: users,
        })
      );
    }

    let users;

    try {
      users = await fetchCollection('users');
    } catch (error) {
      const errorMessage = firebaseError(error.code, locale);
      toastr.error('', errorMessage);
      return dispatch(USERS_FETCH_DATA_FAIL({ error }));
    }

    return dispatch(
      USERS_FETCH_DATA_SUCCESS({
        data: users.filter((user) => user.id !== id),
      })
    );
  };
};

export const deleteUser = (id) => {
  return async (dispatch, getState) => {
    dispatch(USERS_DELETE_USER_INIT());
    const { locale } = getState().preferences;
    const { logoUrl } = getState()
      .users.data.filter((user) => user.id === id)
      .pop();

    const deleteLogoTask = logoUrl ? deleteLogo(logoUrl, 'users') : null;

    const deleteUserTask = deleteDocument('users', id);

    try {
      await Promise.all([deleteLogoTask, deleteUserTask]);
    } catch (error) {
      const errorMessage = firebaseError(error.code, locale);
      toastr.error('', errorMessage);
      return dispatch(
        USERS_DELETE_USER_FAIL({
          error: errorMessage,
        })
      );
    }

    toastr.success('', 'The user was deleted.');
    return dispatch(USERS_DELETE_USER_SUCCESS({ id }));
  };
};

export const clearUsersDataLogout = () => {
  return (dispatch) => {
    dispatch(USERS_CLEAR_DATA_LOGOUT());
  };
};

export const createUser = ({
  name,
  email,
  location,
  file,
  createdAt,
  isAdmin,
}) => {
  return async (dispatch, getState) => {
    dispatch(USERS_CREATE_USER_INIT());
    const { locale } = getState().preferences;

    let response;
    try {
      const createUserAuth = firebase
        .functions()
        .httpsCallable('httpsCreateUser');

      response = await createUserAuth({ email, isAdmin });
    } catch (error) {
      const errorMessage = firebaseError(error.message, locale);
      toastr.error('', errorMessage);
      return dispatch(
        USERS_CREATE_USER_FAIL({
          error: errorMessage,
        })
      );
    }

    const { uid } = response.data;

    let uploadLogoTask = null;
    let logoUrl = null;
    if (file) {
      logoUrl = getLogoUrl(uid, file, 'users');
      uploadLogoTask = uploadLogo(uid, file, 'users');
    }
    const userData = {
      name,
      email,
      location,
      logoUrl,
      createdAt,
      isAdmin,
      teams: [],
    };

    const createUserDbTask = createDocument('users', uid, userData);

    const actionCodeSettings = {
      url: process.env.REACT_APP_LOGIN_PAGE_URL,
      handleCodeInApp: true,
    };

    const sendSignInLinkToEmailTask = firebase
      .auth()
      .sendSignInLinkToEmail(email, actionCodeSettings);

    try {
      await Promise.all([
        uploadLogoTask,
        createUserDbTask,
        sendSignInLinkToEmailTask,
      ]);
    } catch (error) {
      const errorMessage = firebaseError(error.code, locale);
      toastr.error('', errorMessage);
      return dispatch(
        USERS_CREATE_USER_FAIL({
          error: errorMessage,
        })
      );
    }

    toastr.success('', 'User created successfully');
    return dispatch(USERS_CREATE_USER_SUCCESS({ user: response.data }));
  };
};

export const modifyUser = ({
  name,
  location,
  isAdmin,
  file,
  createdAt,
  id,
  isEditing,
  isProfile,
}) => {
  return async (dispatch, getState) => {
    dispatch(USERS_MODIFY_USER_INIT());
    const { locale } = getState().preferences;
    const user = isProfile
      ? getState().auth.userData
      : getState().users.data.find((thisUser) => thisUser.id === id);
    const { logoUrl } = user;
    let deleteLogoTask;
    let uploadLogoTask;
    let newLogoUrl = null;
    if (file) {
      newLogoUrl = getLogoUrl(id, file, 'users');
      deleteLogoTask = logoUrl && deleteLogo(logoUrl, 'users');
      uploadLogoTask = uploadLogo(id, file, 'users');
    }

    const userData = {
      name,
      location,
      createdAt,
      isAdmin: isAdmin || user.isAdmin,
      logoUrl: logoUrl || newLogoUrl,
    };
    const updateUserDbTask = updateDocument('users', id, userData);

    try {
      await Promise.all([deleteLogoTask, uploadLogoTask, updateUserDbTask]);
    } catch (error) {
      const errorMessage = firebaseError(error.code, locale);
      toastr.error('', errorMessage);
      return dispatch(
        USERS_MODIFY_USER_FAIL({
          error: errorMessage,
        })
      );
    }

    if (isProfile) {
      dispatch(AUTH_UPDATE_USER_DATA({ ...userData, id }));
    }

    if (isProfile) {
      toastr.success('', 'Profile updated successfully');
    } else if (isEditing) {
      toastr.success('', 'User updated successfully');
    }

    return dispatch(USERS_MODIFY_USER_SUCCESS({ user: userData, id }));
  };
};

export const usersCleanUp = () => (dispatch) => dispatch(USERS_CLEAN_UP());

export const removeStoreUser = (userId) => (dispatch) =>
  dispatch(USERS_REMOVE_USER({ userId }));

export const addStoreUser = (user) => (dispatch) =>
  dispatch(USERS_ADD_USER({ user }));
