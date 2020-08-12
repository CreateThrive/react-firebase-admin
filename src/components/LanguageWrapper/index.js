import React from 'react';
import { IntlProvider } from 'react-intl';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';

import { setUserLocale } from 'state/actions/preferences';
import { availableLocales, browserLocale, messages } from 'utils/index';

const LanguageWrapper = ({ children }) => {
  const dispatch = useDispatch();

  let { locale } = useSelector(
    (state) => ({
      locale: state.preferences.locale,
    }),
    shallowEqual
  );

  if (!locale) {
    locale = availableLocales.includes(browserLocale) ? browserLocale : 'en';
    dispatch(setUserLocale(locale));
  }

  return (
    <IntlProvider
      locale={locale}
      defaultLocale="en"
      messages={messages[locale]}
    >
      {children}
    </IntlProvider>
  );
};

export default LanguageWrapper;
