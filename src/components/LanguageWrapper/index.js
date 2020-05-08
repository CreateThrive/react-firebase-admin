import React from 'react';
import { IntlProvider } from 'react-intl';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';

import { langSetLocale } from 'state/actions/lang';
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
      locale: state.lang.locale
    }),
    shallowEqual
  );

  if (locale === null) {
    locale = ['en', 'es'].includes(browserLocale) ? browserLocale : 'en';
    dispatch(langSetLocale(browserLocale));
  }

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      {children}
    </IntlProvider>
  );
};

export default LanguageWrapper;
