import { PREFERENCES_SET_LOCALE } from 'state/actions/preferences';

import { preferencesReducer } from '.';

describe('Preferences reducer', () => {
  const initialState = {
    locale: null
  };
  const reducerTest = reducerTester(preferencesReducer);

  it('should set locale to "en" when PREFERENCES_SET_LOCALE action is fired', () => {
    reducerTest(initialState, PREFERENCES_SET_LOCALE({ locale: 'en' }), {
      ...initialState,
      locale: 'en'
    });
  });
});
