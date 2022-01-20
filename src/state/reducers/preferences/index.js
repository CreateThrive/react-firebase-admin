import { createReducer } from '@reduxjs/toolkit';

import { PREFERENCES_SET_LOCALE } from 'state/actions/preferences';

const initialState = {
  locale: null,
};

export const preferencesReducer = createReducer(initialState, (builder) => {
  builder.addCase(PREFERENCES_SET_LOCALE, (state, payload) => ({
    ...state,
    locale: payload.locale,
  }));
});
