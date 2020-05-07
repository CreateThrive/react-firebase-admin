import { createAction } from 'redux-act';

export const LANG_SET_LOCALE = createAction('LANG_SET_LOCALE');

export const langSetLocale = locale => dispatch => {
  return dispatch(LANG_SET_LOCALE({ locale }));
};
