import { createReducer } from 'redux-act';

import { LANG_SET_LOCALE } from 'state/actions/lang';

const initialState = {
  locale: null
};

export const langReducer = createReducer(
  {
    [LANG_SET_LOCALE]: (state, payload) => ({
      ...state,
      locale: payload.locale
    })
  },
  initialState
);
