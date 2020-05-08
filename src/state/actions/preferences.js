import { createAction } from 'redux-act';

export const PREFERENCES_SET_LOCALE = createAction('PREFERENCES_SET_LOCALE');

export const preferencesSetLocale = locale => dispatch => {
  return dispatch(PREFERENCES_SET_LOCALE({ locale }));
};
