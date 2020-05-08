import React from 'react';
import { IntlProvider } from 'react-intl';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';

import { preferencesSetLocale } from 'state/actions/preferences';
import english from 'languages/en';
import spanish from 'languages/es';

const browserLocale = navigator.language.split(/[-_]/)[0];

const messages = {
  en: english,
  es: spanish
};

const LanguageWrapper = ({ children }) => {
  const dispatch = useDispatch();

  let { locale } = useSelector(
    state => ({
      locale: state.preferences.locale
    }),
    shallowEqual
  );

  if (locale === null) {
    locale = ['en', 'es'].includes(browserLocale) ? browserLocale : 'en';
    dispatch(preferencesSetLocale(browserLocale));
  }

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      {children}
    </IntlProvider>
  );
};

export default LanguageWrapper;
