import { createAction } from 'redux-act';
import { toastr } from 'react-redux-toastr';

import { firebaseError } from 'utils';
import firebase from 'firebase.js';
import { checkUserData, AUTH_UPDATE_USER_DATA } from './auth';

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

export const USERS_CLEAR_DATA = createAction('USERS_CLEAR_DATA');

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

export const fetchUsers = (userId = '') => {
  return async (dispatch, getState) => {
    dispatch(checkUserData());

    dispatch(USERS_FETCH_DATA_INIT());
    if (userId) {
      let userData;
      try {
        userData = (
          await firebase.database().ref(`users/${userId}`).once('value')
        ).val();
      } catch (error) {
        toastr.error('', error);
        return dispatch(USERS_FETCH_DATA_FAIL({ error }));
      }

      const user = { ...userData, id: userId };
      return dispatch(
        USERS_FETCH_DATA_SUCCESS({
          list: getState().users.list,
          user
        })
      );
    }

    const { id } = getState().auth.userData;

    let users;

    try {
      users = (await firebase.database().ref('users').once('value')).val();
    } catch (error) {
      toastr.error('', error);
      return dispatch(USERS_FETCH_DATA_FAIL({ error }));
    }

    const usersData = users
      ? Object.entries(users).map(([key, value]) => ({
          id: key,
          ...value,
        }))
      : [];

    return dispatch(
      USERS_FETCH_DATA_SUCCESS({
        list: usersData.filter((user) => user.id !== id),
        user: getState().users.user
      })
    );
  };
};

const deleteLogo = (oldLogo) => {
  if (!oldLogo.includes('firebasestorage')) {
    return null;
  }
  const logoPath = oldLogo.split('users%2F').pop().split('?alt=media').shift();
  return firebase.storage().ref(`users/${logoPath}`).delete();
};

export const deleteUser = (id) => {
  return async (dispatch, getState) => {
    dispatch(USERS_DELETE_USER_INIT());
    const { locale } = getState().preferences;
    const { logoUrl } = getState()
      .users.list.filter((user) => user.id === id)
      .pop();

    const deleteLogoTask = logoUrl ? deleteLogo(logoUrl) : null;

    const deleteUserTask = firebase.database().ref(`users/${id}`).remove();

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

export const clearUsersData = () => {
  return (dispatch) => {
    dispatch(USERS_CLEAR_DATA());
  };
};

export const clearUsersDataLogout = () => {
  return (dispatch) => {
    dispatch(USERS_CLEAR_DATA_LOGOUT());
  };
};

const uploadLogo = (uid, file) => {
  const storageRef = firebase.storage().ref();

  const fileExtension = file.name.split('.').pop();

  const fileName = `${uid}.${fileExtension}`;

  return storageRef.child(`users/${fileName}`).put(file);
};

const getLogoUrl = (uid, file) => {
  const fileExtension = file.name.split('.').pop();

  const bucketUrl = `${process.env.REACT_APP_FIRE_BASE_STORAGE_API}`;

  return `${bucketUrl}/o/users%2F${uid}_200x200.${fileExtension}?alt=media`;
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
      logoUrl = getLogoUrl(uid, file);
      uploadLogoTask = uploadLogo(uid, file);
    }

    const createUserDbTask = firebase
      .database()
      .ref(`users/${uid}`)
      .set({ name, email, location, logoUrl, createdAt, isAdmin });

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
    const { logoUrl } = isProfile
      ? getState().auth.userData
      : getState()
          .users.list.filter((user) => user.id === id)
          .pop();

    let deleteLogoTask;
    let uploadLogoTask;
    let newLogoUrl = null;
    if (file) {
      newLogoUrl = getLogoUrl(id, file);
      deleteLogoTask = logoUrl && deleteLogo(logoUrl);
      uploadLogoTask = uploadLogo(id, file);
    }

    const userData = {
      name,
      location,
      createdAt,
      isAdmin,
      logoUrl: logoUrl || newLogoUrl,
    };

    const updateUserDbTask = firebase
      .database()
      .ref(`users/${id}`)
      .update(userData);

    const { uid } = firebase.auth().currentUser;

    if (id === uid) {
      dispatch(AUTH_UPDATE_USER_DATA({ ...userData, id }));
    }

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
      toastr.success('', 'Profile updated successfully');
    } else if (isEditing) {
      toastr.success('', 'User updated successfully');
    }

    return dispatch(USERS_MODIFY_USER_SUCCESS({ user: { ...userData, id } }));
  };
};

export const usersCleanUp = () => (dispatch) => dispatch(USERS_CLEAN_UP());
