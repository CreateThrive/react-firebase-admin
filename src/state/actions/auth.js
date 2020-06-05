import { createAction } from 'redux-act';
import { toastr } from 'react-redux-toastr';

import { firebaseError, FIREBASE_RESPONSE } from 'utils';
import firebase from 'firebase.js';
import { clearUsersDataLogout } from './users';

export const AUTH_SIGN_IN_INIT = createAction('AUTH_SIGN_IN_INIT');
export const AUTH_SIGN_IN_FAIL = createAction('AUTH_SIGN_IN_FAIL');

export const AUTH_RESTORE_SESSION_INIT = createAction(
  'AUTH_RESTORE_SESSION_INIT'
);
export const AUTH_RESTORE_SESSION_SUCCESS = createAction(
  'AUTH_RESTORE_SESSION_SUCCESS'
);
export const AUTH_RESTORE_SESSION_FAIL = createAction(
  'AUTH_RESTORE_SESSION_FAIL'
);

export const AUTH_LOGOUT_INIT = createAction('AUTH_LOGOUT_INIT');
export const AUTH_LOGOUT_SUCCESS = createAction('AUTH_LOGOUT_SUCCESS');

export const AUTH_SET_PASSWORD_INIT = createAction('AUTH_SET_PASSWORD_INIT');
export const AUTH_SET_PASSWORD_SUCCESS = createAction(
  'AUTH_SET_PASSWORD_SUCCESS'
);
export const AUTH_SET_PASSWORD_FAIL = createAction('AUTH_SET_PASSWORD_FAIL');

export const AUTH_RESET_PASSWORD_INIT = createAction(
  'AUTH_RESET_PASSWORD_INIT'
);
export const AUTH_RESET_PASSWORD_SUCCESS = createAction(
  'AUTH_RESET_PASSWORD_SUCCESS'
);
export const AUTH_RESET_PASSWORD_FAIL = createAction(
  'AUTH_RESET_PASSWORD_FAIL'
);

export const AUTH_CLEAN_UP = createAction('AUTH_CLEAN_UP');

export const AUTH_FETCH_USER_DATA_INIT = createAction(
  'AUTH_FETCH_USER_DATA_INIT'
);
export const AUTH_FETCH_USER_DATA_SUCCESS = createAction(
  'AUTH_FETCH_USER_DATA_SUCCESS'
);
export const AUTH_FETCH_USER_DATA_FAIL = createAction(
  'AUTH_FETCH_USER_DATA_FAIL'
);

export const AUTH_CHANGE_PASSWORD_INIT = createAction(
  'AUTH_CHANGE_PASSWORD_INIT'
);
export const AUTH_CHANGE_PASSWORD_SUCCESS = createAction(
  'AUTH_CHANGE_PASSWORD_SUCCESS'
);
export const AUTH_CHANGE_PASSWORD_FAIL = createAction(
  'AUTH_CHANGE_PASSWORD_FAIL'
);

export const AUTH_UPDATE_USER_DATA = createAction('AUTH_UPDATE_USER_DATA');

export const AUTH_PROVIDER_INIT = createAction('AUTH_PROVIDER_INIT');

export const AUTH_PROVIDER_SUCCESS = createAction('AUTH_PROVIDER_SUCCESS');

export const AUTH_PROVIDER_FAIL = createAction('AUTH_PROVIDER_FAIL');

export const logout = () => {
  return async dispatch => {
    dispatch(AUTH_LOGOUT_INIT());

    dispatch(clearUsersDataLogout());
    await firebase.auth().signOut();

    dispatch(AUTH_LOGOUT_SUCCESS());
  };
};

export const verifyAuth = () => {
  return dispatch => {
    firebase.auth().onAuthStateChanged(user => {
      dispatch(AUTH_RESTORE_SESSION_INIT());

      if (user !== null) {
        return dispatch(AUTH_RESTORE_SESSION_SUCCESS());
      }

      dispatch(AUTH_RESTORE_SESSION_FAIL());
      return dispatch(logout());
    });
  };
};

export const fetchUserData = () => {
  return async dispatch => {
    dispatch(AUTH_FETCH_USER_DATA_INIT());

    const { uid } = firebase.auth().currentUser;

    let user;

    try {
      user = (
        await firebase
          .database()
          .ref(`users/${uid}`)
          .once('value')
      ).val();
    } catch (error) {
      dispatch(logout());
      return dispatch(AUTH_FETCH_USER_DATA_FAIL({ error }));
    }

    if (!user) {
      return dispatch(logout());
    }

    return dispatch(
      AUTH_FETCH_USER_DATA_SUCCESS({
        id: uid,
        ...user
      })
    );
  };
};

export const checkUserData = () => {
  return (dispatch, getState) => {
    const { id } = getState().auth.userData;

    if (!id) {
      dispatch(fetchUserData());
    }
  };
};

export const auth = (email, password) => {
  return async (dispatch, getState) => {
    dispatch(AUTH_SIGN_IN_INIT());
    const { locale } = getState().preferences;
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      const errorMessage = firebaseError(error.code, locale);
      return dispatch(AUTH_SIGN_IN_FAIL({ error: errorMessage }));
    }

    const { emailVerified } = firebase.auth().currentUser;

    if (!emailVerified) {
      const errorMessage = firebaseError(
        FIREBASE_RESPONSE.USER_DISABLED,
        locale
      );
      return dispatch(AUTH_SIGN_IN_FAIL({ error: errorMessage }));
    }

    return dispatch(fetchUserData());
  };
};

export const setPassword = (email, password, url) => {
  return async (dispatch, getState) => {
    dispatch(AUTH_SET_PASSWORD_INIT());
    const { locale } = getState().preferences;

    try {
      await firebase.auth().signInWithEmailLink(email, url);
    } catch (error) {
      const errorMessage = firebaseError(error.code, locale);
      return dispatch(AUTH_SET_PASSWORD_FAIL({ error: errorMessage }));
    }

    const user = firebase.auth().currentUser;

    try {
      await user.updatePassword(password);
    } catch (error) {
      const errorMessage = firebaseError(error.code, locale);
      return dispatch(AUTH_SET_PASSWORD_FAIL({ error: errorMessage }));
    }

    dispatch(AUTH_SET_PASSWORD_SUCCESS());

    return dispatch(fetchUserData());
  };
};

export const resetPassword = email => {
  return async (dispatch, getState) => {
    dispatch(AUTH_RESET_PASSWORD_INIT());
    const { locale } = getState().preferences;

    try {
      await firebase.auth().sendPasswordResetEmail(email);
    } catch (error) {
      const errorMessage = firebaseError(error.code, locale);
      return dispatch(AUTH_RESET_PASSWORD_FAIL({ error: errorMessage }));
    }

    return dispatch(AUTH_RESET_PASSWORD_SUCCESS());
  };
};

export const authCleanUp = () => dispatch => dispatch(AUTH_CLEAN_UP());

export const changeUserPassword = (currentPassword, newPassword) => {
  return async (dispatch, getState) => {
    dispatch(AUTH_CHANGE_PASSWORD_INIT());
    const { locale } = getState().preferences;

    const user = firebase.auth().currentUser;

    const { email } = user;

    const credential = firebase.auth.EmailAuthProvider.credential(
      email,
      currentPassword
    );

    try {
      await user.reauthenticateWithCredential(credential);
    } catch (error) {
      const errorMessage = firebaseError(error.code, locale);
      toastr.error('', errorMessage);
      return dispatch(AUTH_CHANGE_PASSWORD_FAIL({ error: errorMessage }));
    }

    try {
      await user.updatePassword(newPassword);
    } catch (error) {
      const errorMessage = firebaseError(error, locale);
      toastr.error('', errorMessage);
      return dispatch(AUTH_CHANGE_PASSWORD_FAIL({ error: errorMessage }));
    }

    toastr.success('', 'Password changed successfully');
    return dispatch(AUTH_CHANGE_PASSWORD_SUCCESS());
  };
};

const authWithProvider = provider => {
  return async (dispatch, getState) => {
    dispatch(AUTH_PROVIDER_INIT());
    const { locale } = getState().preferences;
    let result;

    try {
      result = await firebase.auth().signInWithPopup(provider);
    } catch (error) {
      const errorMessage = firebaseError(error.code, locale);
      return dispatch(AUTH_PROVIDER_FAIL({ error: errorMessage }));
    }
    const { user, additionalUserInfo } = result;

    const { uid } = firebase.auth().currentUser;

    const createdAt = new Date().toString();

    const { location } = additionalUserInfo.profile;

    const userData = {
      isAdmin: false,
      email: user.email,
      name: user.displayName,
      createdAt,
      logoUrl: user.photoURL,
      location: location ? location.name : null
    };

    let userValue;
    try {
      userValue = (
        await firebase
          .database()
          .ref(`users/${uid}`)
          .once('value')
      ).val();
    } catch (error) {
      const errorMessage = firebaseError(error.code, locale);
      return dispatch(AUTH_PROVIDER_FAIL({ error: errorMessage }));
    }

    if (!userValue) {
      try {
        await firebase
          .database()
          .ref(`users/${uid}`)
          .set(userData);
      } catch (error) {
        const errorMessage = firebaseError(error.code, locale);
        return dispatch(AUTH_PROVIDER_FAIL({ error: errorMessage }));
      }
    }

    return dispatch(
      AUTH_PROVIDER_SUCCESS({ id: uid, ...userData, ...userValue })
    );
  };
};

export const authFacebook = () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  provider.addScope('email');
  provider.addScope('user_location');
  return authWithProvider(provider);
};

export const authGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/user.addresses.read');
  provider.addScope('https://www.googleapis.com/auth/userinfo.email');
  return authWithProvider(provider);
};

export const authMicrosoft = () => {
  const provider = new firebase.auth.OAuthProvider('microsoft.com');
  return authWithProvider(provider);
};
