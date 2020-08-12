import { createIntl, createIntlCache } from 'react-intl';

import english from 'languages/en';
import spanish from 'languages/es';
import en from 'assets/en.png';
import es from 'assets/es.png';

export const FIREBASE_RESPONSE = {
  EMAIL_IN_USE: 'auth/email-already-exists',
  EMAIL_INVALID: 'auth/invalid-email',
  EMAIL_NOT_FOUND: 'auth/user-not-found',
  PASSWORD_INVALID: 'auth/wrong-password',
  USER_DISABLED: 'auth/user-disabled',
  TOO_MANY_REQUESTS: 'auth/too-many-requests',
  EXPIRED_ACTION_CODE: 'auth/expired-action-code',
  INVALID_ACTION_CODE: 'auth/invalid-action-code',
  QUOTA_EXCEEDED_STORAGE: 'storage/quota-exceeded',
  UNAUTHENTICATED_STORAGE: 'storage/unauthenticated',
  UNAUTHORIZED_STORAGE: 'storage/unauthorized'
};

export const messages = {
  en: english,
  es: spanish
};

const getIntlContext = locale => {
  const cache = createIntlCache();
  return createIntl(
    {
      locale,
      messages: messages[locale]
    },
    cache
  );
};

export const firebaseError = (error, locale) => {
  const intl = getIntlContext(locale);
  return intl.formatMessage({
    id: error,
    defaultMessage: messages[locale]['utils.default']
  });
};

export const validateEmail = email => {
  return email.match(
    // eslint-disable-next-line no-useless-escape
    /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i
  );
};

export const inputValidations = (email, password, locale) => {
  let inputs = {
    email: {
      modifier: null,
      message: null
    },
    password: {
      modifier: null,
      message: null
    },
    canSubmit: null
  };
  const intl = getIntlContext(locale);

  const setInputs = (key, value) => {
    inputs = { ...inputs, [`${key}`]: value };
  };

  const isValidEmail = email && validateEmail(email);

  if (email && !isValidEmail) {
    setInputs('email', {
      modifier: 'is-danger',
      message: intl.formatMessage({ id: 'utils.invalidEmail' })
    });
  }

  const isValidPassword = password && password.length >= 6;

  if (isValidPassword) {
    setInputs('password', {
      modifier: 'is-success',
      message: intl.formatMessage({ id: 'utils.safePassword' })
    });
  } else if (password) {
    setInputs('password', {
      modifier: 'is-danger',
      message: intl.formatMessage({ id: 'utils.unsafePassword' })
    });
  }

  if (isValidEmail && isValidPassword) {
    setInputs('canSubmit', true);
  }

  return inputs;
};

export const availableLocales = Object.keys(messages);

export const browserLocale = navigator.language.split(/[-_]/)[0];

export const flags = {
  en,
  es
};
