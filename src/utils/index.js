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

export const deleteLogo = (oldLogo, role) => {
  if (!oldLogo.includes('firebasestorage')) {
    return null;
  }
  const logoPath = oldLogo
    .split(`${role}%2F`)
    .pop()
    .split('?alt=media')
    .shift();
  return firebase.storage().ref(`${role}/${logoPath}`).delete();
};

export const getLogoUrl = (uid, file, role) => {
  const fileExtension = file.name.split('.').pop();

  const bucketUrl = `${process.env.REACT_APP_FIRE_BASE_STORAGE_API}`;

  return `${bucketUrl}/o/${role}%2F${uid}_200x200.${fileExtension}?alt=media`;
};

export const uploadLogo = (uid, file, role) => {
  const storageRef = firebase.storage().ref();

  const fileExtension = file.name.split('.').pop();

  const fileName = `${uid}.${fileExtension}`;

  return storageRef.child(`${role}/${fileName}`).put(file);
};

export const openModal = (setModal, id) => {
  setModal((prevState) => ({
    id,
    isOpen: !prevState.isOpen,
  }));
};

export const closeModal = (setModal) => {
  setModal({ id: null, isOpen: false });
};
