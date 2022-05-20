/* eslint-disable no-param-reassign */
import { createReducer } from '@reduxjs/toolkit';

import { PREFERENCES_SET_LOCALE } from 'state/actions/preferences';

const initialState = {
  locale: null,
};

export const preferencesReducer = createReducer(
    initialState,
  {
    [PREFERENCES_SET_LOCALE]: (state, {payload}) => {
      state.locale = payload.locale;
    },
  }
);
