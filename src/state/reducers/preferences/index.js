import { createReducer } from 'redux-act';

import { PREFERENCES_SET_LOCALE } from 'state/actions/preferences';

const initialState = {
  locale: null
};

export const preferencesReducer = createReducer(
  {
    [PREFERENCES_SET_LOCALE]: (state, payload) => ({
      ...state,
      locale: payload.locale
    })
  },
  initialState
);
