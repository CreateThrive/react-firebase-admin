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
  AUTH_FACEBOOK_FAIL,
  AUTH_FACEBOOK_INIT,
  AUTH_FACEBOOK_SUCCESS
} from 'state/actions/auth';

import { authReducer } from '.';

describe('Auth reducer', () => {
  const initialState = {
    userData: {
      id: null,
      isAdmin: null
    },
    loading: false,
    error: null,
    restoring: false,
    restoringError: null,
    restoredPassword: false,
    changedPassword: false
  };

  const reducerTest = reducerTester(authReducer);

  it('should return the initial state', () => {
    reducerTest(initialState, {}, initialState);
  });

  it('should reset to initial state and set loading to true when AUTH_SIGN_IN_INIT action is fired', () => {
    reducerTest(initialState, AUTH_SIGN_IN_INIT(), {
      ...initialState,
      loading: true
    });
  });

  it('should set the state with the error and set loading to false when AUTH_FAIL actions is fired', () => {
    reducerTest(initialState, AUTH_SIGN_IN_FAIL({ error: 'some error' }), {
      ...initialState,
      error: 'some error'
    });
  });

  it('should reset to initial state and set loading to true when AUTH_FETCH_USER_DATA_INIT action is fired', () => {
    reducerTest(initialState, AUTH_FETCH_USER_DATA_INIT(), {
      ...initialState,
      loading: true
    });
  });

  it('should set the state with the error and set loading to false when AUTH_FETCH_USER_DATA_FAIL actions is fired', () => {
    reducerTest(
      initialState,
      AUTH_FETCH_USER_DATA_FAIL({ error: 'some error' }),
      {
        ...initialState,
        error: 'some error'
      }
    );
  });

  it('should set the state with the corresponding payload, loading to false and error to null when AUTH_FETCH_USER_DATA_SUCCESS actions is fired', () => {
    const payload = {
      id: 'some user id',
      isAdmin: false
    };

    reducerTest(initialState, AUTH_FETCH_USER_DATA_SUCCESS(payload), {
      ...initialState,
      userData: {
        ...payload
      }
    });
  });

  it('should set restoring to true when AUTH_RESTORE_SESSION_INIT actions is fired', () => {
    reducerTest(initialState, AUTH_RESTORE_SESSION_INIT(), {
      ...initialState,
      restoring: true
    });
  });

  it('should set restoring to false and restoringError to null when AUTH_RESTORE_SESSION_SUCCESS actions is fired', () => {
    reducerTest(initialState, AUTH_RESTORE_SESSION_SUCCESS(), {
      ...initialState,
      restoring: false,
      restoringError: null
    });
  });

  it('should set restoring to false and restoringError to true when AUTH_RESTORE_SESSION_FAIL actions is fired', () => {
    reducerTest(initialState, AUTH_RESTORE_SESSION_FAIL(), {
      ...initialState,
      restoring: false,
      restoringError: true
    });
  });

  it('should reset to initial state when AUTH_LOGOUT_INIT action is fired', () => {
    reducerTest(initialState, AUTH_LOGOUT_INIT(), initialState);
  });

  it('should set the state with the previous state when AUTH_LOGOUT_SUCCESS action is fired', () => {
    reducerTest(initialState, AUTH_LOGOUT_SUCCESS(), initialState);
  });

  it('should set loading to true when AUTH_SET_PASSWORD_INIT action is fired', () => {
    reducerTest(initialState, AUTH_SET_PASSWORD_INIT(), {
      ...initialState,
      loading: true
    });
  });

  it('should reset to initial state and set loading to true when AUTH_RESET_PASSWORD_INIT action is fired', () => {
    reducerTest(initialState, AUTH_RESET_PASSWORD_INIT(), {
      ...initialState,
      loading: true
    });
  });

  it('should set loading to false and error to null when AUTH_SET_PASSWORD_SUCCESS action is fired', () => {
    reducerTest(initialState, AUTH_SET_PASSWORD_SUCCESS(), {
      ...initialState,
      loading: false,
      error: null
    });
  });

  it('should set loading to false and error to the corresponding payload when AUTH_SET_PASSWORD_FAIL action is fired', () => {
    reducerTest(initialState, AUTH_SET_PASSWORD_FAIL({ error: 'some error' }), {
      ...initialState,
      loading: false,
      error: 'some error'
    });
  });

  it('should set loading to false, error to null and restoredPassword to true when AUTH_RESET_PASSWORD_SUCCESS action is fired', () => {
    reducerTest(initialState, AUTH_RESET_PASSWORD_SUCCESS(), {
      ...initialState,
      loading: false,
      error: null,
      restoredPassword: true
    });
  });

  it('should set loading to false and error with the corresponding payload when AUTH_RESET_PASSWORD_FAIL action is fired', () => {
    reducerTest(
      initialState,
      AUTH_RESET_PASSWORD_FAIL({ error: 'some error' }),
      {
        ...initialState,
        error: 'some error'
      }
    );
  });

  it('should reset error to null and restoredPassword to false when AUTH_CLEAN_UP action is fired', () => {
    reducerTest(initialState, AUTH_CLEAN_UP(), initialState);
  });

  it('should set loading to true when AUTH_CHANGE_PASSWORD_INIT action is fired', () => {
    reducerTest(initialState, AUTH_CHANGE_PASSWORD_INIT(), {
      ...initialState,
      loading: true
    });
  });

  it('should set loading to false and error to null when AUTH_CHANGE_PASSWORD_SUCCESS action is fired', () => {
    reducerTest(
      { ...initialState, loading: true },
      AUTH_CHANGE_PASSWORD_SUCCESS(),
      { ...initialState, changedPassword: true }
    );
  });

  it('should set loading to false and error with the corresponding payload when AUTH_CHANGE_PASSWORD_FAIL action is fired', () => {
    reducerTest(
      { ...initialState, loading: true },
      AUTH_CHANGE_PASSWORD_FAIL({ error: 'sample error' }),
      { ...initialState, error: 'sample error' }
    );
  });

  it('should set the userData field with the corresponding payload when AUTH_UPDATE_USER_DATA action is fired', () => {
    const userData = {
      id: 'some userId',
      isAdmin: false,
      name: 'some name',
      location: 'some location',
      createdAt: '11/20/2020'
    };
    reducerTest(initialState, AUTH_UPDATE_USER_DATA({ ...userData }), {
      ...initialState,
      userData: {
        ...userData
      }
    });
  });

  it('should set loading to true when AUTH_FACEBOOK_INIT action is fired', () => {
    reducerTest(initialState, AUTH_FACEBOOK_INIT(), {
      ...initialState,
      loading: true
    });
  });

  it('should set the state with the corresponding payload, loading to false and error to null when AUTH_FACEBOOK_SUCCESS actions is fired', () => {
    const payload = {
      id: 'some user id',
      isAdmin: false
    };

    reducerTest(initialState, AUTH_FACEBOOK_SUCCESS(payload), {
      ...initialState,
      userData: {
        ...payload
      }
    });
  });

  it('should set loading to false and error with the corresponding payload when AUTH_FACEBOOK_FAIL action is fired', () => {
    reducerTest(
      { ...initialState, loading: true },
      AUTH_FACEBOOK_FAIL({ error: 'sample error' }),
      { ...initialState, error: 'sample error' }
    );
  });
});
