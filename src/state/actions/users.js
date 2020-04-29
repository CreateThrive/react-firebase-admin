import { createAction } from 'redux-act';
import uuid from 'uuid/v4';
import { toastr } from 'react-redux-toastr';

import axios from 'utils/axios';
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

export const fetchUsers = () => {
  return async (dispatch, getState) => {
    dispatch(checkUserData());

    dispatch(USERS_FETCH_DATA_INIT());

    const { tenant, id } = getState().auth.userData;

    let users;

    try {
      const ref = firebase.database().ref('users');

      users = (
        await ref
          .orderByChild('tenant')
          .equalTo(tenant)
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

export const deleteUser = id => {
  return async dispatch => {
    dispatch(USERS_DELETE_USER_INIT());

    const user = firebase.auth().currentUser;

    const userToken = await user.getIdToken();

    try {
      await axios(userToken).delete(`/users/${id}`);
    } catch (error) {
      toastr.error('', error);
      return dispatch(USERS_DELETE_USER_FAIL({ error }));
    }

    toastr.success('', 'The user was deleted.');
    return dispatch(USERS_DELETE_USER_SUCCESS({ id }));
  };
};

export const clearUsersData = () => {
  return dispatch => {
    dispatch(USERS_CLEAR_DATA());
  };
};

export const createUser = ({
  name,
  email,
  location,
  file,
  createdAt,
  isAdmin
}) => {
  return async (dispatch, getState) => {
    dispatch(USERS_CREATE_USER_INIT());

    const { tenant } = getState().auth.userData;

    const user = firebase.auth().currentUser;

    const userToken = await user.getIdToken();

    const body = new FormData();

    if (file) {
      const fileExtension = file.name.split('.')[1];

      const fileName = `${uuid()}.${fileExtension}`;

      body.append('logo', file, fileName);
    }

    body.append('name', name);
    body.append('location', location);
    body.append('email', email);
    body.append('password', uuid());
    body.append('tenant', tenant);
    body.append('createdAt', createdAt);
    body.append('isAdmin', isAdmin);

    axios(userToken)
      .post('/users', body)
      .then(async response => {
        const userCreated = response.data;

        const actionCodeSettings = {
          url: process.env.REACT_APP_LOGIN_PAGE_URL,
          handleCodeInApp: true
        };

        try {
          await firebase
            .auth()
            .sendSignInLinkToEmail(email, actionCodeSettings);
        } catch (error) {
          const errorMessage = firebaseError(error.response.data.error.code);

          return dispatch(
            USERS_CREATE_USER_FAIL({
              error: errorMessage
            })
          );
        }

        toastr.success('', 'User created successfully');
        return dispatch(
          USERS_CREATE_USER_SUCCESS({
            user: userCreated
          })
        );
      })
      .catch(error => {
        const errorMessage = firebaseError(error.response.data.error.code);
        toastr.error('', errorMessage);
        return dispatch(
          USERS_CREATE_USER_FAIL({
            error: errorMessage
          })
        );
      });
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
  return async (dispatch, getState) => {
    dispatch(USERS_MODIFY_USER_INIT());

    const { tenant } = getState().auth.userData;

    const user = firebase.auth().currentUser;

    const userToken = await user.getIdToken();

    const body = new FormData();

    if (file) {
      const fileExtension = file.name.split('.')[1];

      const fileName = `${uuid()}.${fileExtension}`;

      body.append('logo', file, fileName);
    }

    body.append('name', name);
    body.append('location', location);
    body.append('tenant', tenant);
    body.append('createdAt', createdAt);
    body.append('isAdmin', isAdmin);

    axios(userToken)
      .patch(`/users/${id}`, body)
      .then(response => {
        const userCreated = response.data;
        const { uid } = firebase.auth().currentUser;

        if (id === uid) {
          dispatch(AUTH_UPDATE_USER_DATA({ ...userCreated }));
        }

        if (isProfile) {
          toastr.success('', 'Profile updated successfully');
        } else if (isEditing) {
          toastr.success('', 'User updated successfully');
        }

        return dispatch(
          USERS_MODIFY_USER_SUCCESS({
            user: userCreated
          })
        );
      })
      .catch(error => {
        const errorMessage = firebaseError(error.response.data.error.code);
        toastr.error('', errorMessage);
        return dispatch(
          USERS_MODIFY_USER_FAIL({
            error: errorMessage
          })
        );
      });
  };
};

export const usersCleanUp = () => dispatch => dispatch(USERS_CLEAN_UP());
