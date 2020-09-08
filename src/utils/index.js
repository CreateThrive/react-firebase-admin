import { createIntl, createIntlCache } from 'react-intl';
import firebase from 'firebase.js';

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
  UNAUTHORIZED_STORAGE: 'storage/unauthorized',
};

export const messages = {
  en: english,
  es: spanish,
};

const getIntlContext = (locale) => {
  const cache = createIntlCache();
  return createIntl(
    {
      locale,
      messages: messages[locale],
    },
    cache
  );
};

export const firebaseError = (error, locale) => {
  const intl = getIntlContext(locale);
  return intl.formatMessage({
    id: error,
    defaultMessage: messages[locale]['utils.default'],
  });
};

export const availableLocales = Object.keys(messages);

export const browserLocale = navigator.language.split(/[-_]/)[0];

export const flags = {
  en,
  es,
};

export const uiConfig = (onSignInSuccessHandler, onSignInFailHandler) => {
  return {
    callbacks: {
      signInSuccessWithAuthResult: onSignInSuccessHandler,
      signInFailure: onSignInFailHandler,
    },
    signInFlow: 'popup',
    signInSuccessUrl: '/home',
    signInOptions: [
      {
        provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        fullLabel: 'Continue with Google',
        scopes: [
          'https://www.googleapis.com/auth/user.addresses.read',
          'https://www.googleapis.com/auth/userinfo.email',
        ],
      },
      {
        provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        fullLabel: 'Continue with Facebook',
        scopes: ['email'],
      },
      { provider: 'microsoft.com', fullLabel: 'Continue with Microsoft' },
    ],
  };
};
