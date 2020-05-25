import { createAction } from 'redux-act';
import { toastr } from 'react-redux-toastr';

import axios from 'utils/axios';
import { firebaseError } from 'utils';
import firebase from 'firebase.js';
import { checkUserData } from './auth';

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

export const fetchUsers = () => {
  return async (dispatch, getState) => {
    dispatch(checkUserData());

    dispatch(USERS_FETCH_DATA_INIT());

    const { id } = getState().auth.userData;

    let users;

    try {
      users = (
        await firebase
          .database()
          .ref('users')
          .once('value')
      ).val();
    } catch (error) {
      toastr.error('', error);
      return dispatch(USERS_FETCH_DATA_FAIL({ error }));
    }

    const usersData = users
      ? Object.entries(users).map(([key, value]) => ({
          id: key,
          ...value
        }))
      : [];

    return dispatch(
      USERS_FETCH_DATA_SUCCESS({
        users: usersData.filter(user => user.id !== id)
      })
    );
  };
};
const deleteLogo = async id => {
  const userRef = firebase.database().ref(`users/${id}`);
  const oldLogo = (await userRef.child('logoUrl').once('value')).val();
  if (oldLogo) {
    await firebase
      .storage()
      .ref(oldLogo)
      .delete();
  }
};

export const deleteUser = id => {
  return async dispatch => {
    dispatch(USERS_DELETE_USER_INIT());

    try {
      await deleteLogo(id);
    } catch (error) {
      const errorMessage = firebaseError(error.response.data.error.code);
      toastr.error('', errorMessage);
      return dispatch(
        USERS_DELETE_USER_FAIL({
          error: errorMessage
        })
      );
    }

    const userRef = firebase.database().ref(`users/${id}`);

    userRef.remove();
    toastr.success('', 'The user was deleted.');
    return dispatch(USERS_DELETE_USER_SUCCESS({ id }));
  };
};

export const clearUsersData = () => {
  return dispatch => {
    dispatch(USERS_CLEAR_DATA());
  };
};

const uploadLogo = async (uid, file) => {
  const storageRef = firebase.storage().ref();

  const fileExtension = file.name.split('.').pop();

  const fileName = `${uid}.${fileExtension}`;

  const basePath = 'users/';

  await storageRef.child(`${basePath}${fileName}`).put(file);

  return `${basePath}${uid}_200x200.${fileExtension}`;
};

export const createUser = ({
  name,
  email,
  location,
  file,
  createdAt,
  isAdmin
}) => {
  return async dispatch => {
    dispatch(USERS_CREATE_USER_INIT());

    const user = firebase.auth().currentUser;

    const userToken = await user.getIdToken();

    let response;
    try {
      response = await axios(userToken).post('/users', { email, isAdmin });
    } catch (error) {
      const errorMessage = firebaseError(error.response.data.error.code);
      toastr.error('', errorMessage);
      return dispatch(
        USERS_CREATE_USER_FAIL({
          error: errorMessage
        })
      );
    }

    const { uid } = response.data;

    let logoUrl = null;
    if (file) {
      try {
        logoUrl = await uploadLogo(uid, file);
      } catch (error) {
        const errorMessage = firebaseError(error.code);
        toastr.error('', errorMessage);
        return dispatch(
          USERS_CREATE_USER_FAIL({
            error: errorMessage
          })
        );
      }
    }
    try {
      await firebase
        .database()
        .ref(`users/${uid}`)
        .set({ name, email, location, logoUrl, createdAt, isAdmin });
    } catch (error) {
      const errorMessage = firebaseError(error.code);
      toastr.error('', errorMessage);
      return dispatch(
        USERS_CREATE_USER_FAIL({
          error: errorMessage
        })
      );
    }

    const actionCodeSettings = {
      url: process.env.REACT_APP_LOGIN_PAGE_URL,
      handleCodeInApp: true
    };

    try {
      await firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings);
    } catch (error) {
      const errorMessage = firebaseError(error.code);
      return dispatch(
        USERS_CREATE_USER_FAIL({
          error: errorMessage
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
  isProfile
}) => {
  return async dispatch => {
    dispatch(USERS_MODIFY_USER_INIT());

    let logoUrl = null;
    if (file) {
      try {
        await deleteLogo(id);
      } catch (error) {
        const errorMessage = firebaseError(error.code);
        toastr.error('', errorMessage);
        return dispatch(
          USERS_MODIFY_USER_FAIL({
            error: errorMessage
          })
        );
      }
    }

    try {
      logoUrl = await uploadLogo(id, file);
    } catch (error) {
      const errorMessage = firebaseError(error.code);
      toastr.error('', errorMessage);
      return dispatch(
        USERS_MODIFY_USER_FAIL({
          error: errorMessage
        })
      );
    }

    const userData = {
      name,
      location,
      createdAt,
      isAdmin
    };

    if (logoUrl) userData.logoUrl = logoUrl;

    try {
      await firebase
        .database()
        .ref(`users/${id}`)
        .update({ ...userData });
    } catch (error) {
      const errorMessage = firebaseError(error.code);
      toastr.error('', errorMessage);
      return dispatch(
        USERS_MODIFY_USER_FAIL({
          error: errorMessage
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

export const usersCleanUp = () => dispatch => dispatch(USERS_CLEAN_UP());
