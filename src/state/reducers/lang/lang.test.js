import { LANG_SET_LOCALE } from 'state/actions/lang';

import { langReducer } from '.';

describe('Lang reducer', () => {
  const initialState = {
    locale: null
  };
  const reducerTest = reducerTester(langReducer);

  it('should set locale to "en" when LANG_SET_LOCALE action is fired', () => {
    reducerTest(initialState, LANG_SET_LOCALE({ locale: 'en' }), {
      ...initialState,
      locale: 'en'
    });
  });
});
