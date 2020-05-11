export const FIREBASE_RESPONSE = {
  EMAIL_IN_USE: 'auth/email-already-exists',
  EMAIL_INVALID: 'auth/invalid-email',
  EMAIL_NOT_FOUND: 'auth/user-not-found',
  PASSWORD_INVALID: 'auth/wrong-password',
  USER_DISABLED: 'auth/user-disabled',
  TOO_MANY_REQUESTS: 'auth/too-many-requests',
  EXPIRED_ACTION_CODE: 'auth/expired-action-code',
  INVALID_ACTION_CODE: 'auth/invalid-action-code'
};

export const firebaseError = error => {
  let errorMessage = '';

  switch (error) {
    case FIREBASE_RESPONSE.EMAIL_IN_USE:
      errorMessage = 'Email already in use';
      break;
    case FIREBASE_RESPONSE.EMAIL_INVALID:
      errorMessage = 'Email is invalid';
      break;
    case FIREBASE_RESPONSE.EMAIL_NOT_FOUND:
      errorMessage = 'Invalid credentials';
      break;
    case FIREBASE_RESPONSE.PASSWORD_INVALID:
      errorMessage = 'Invalid credentials';
      break;
    case FIREBASE_RESPONSE.USER_DISABLED:
      errorMessage = 'User disabled';
      break;
    case FIREBASE_RESPONSE.TOO_MANY_REQUESTS:
      errorMessage = 'Too many attempts made, try again later';
      break;
    case FIREBASE_RESPONSE.EXPIRED_ACTION_CODE:
      errorMessage =
        'The invitation link has expired, get in touch with your administrator';
      break;
    case FIREBASE_RESPONSE.INVALID_ACTION_CODE:
      errorMessage =
        'The invitation link has expired, get in touch with your administrator';
      break;
    default:
      errorMessage = 'Unknown error, get in touch with your administrator';
  }

  return errorMessage;
};

export const validateEmail = email => {
  return email.match(
    // eslint-disable-next-line no-useless-escape
    /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i
  );
};

export const inputValidations = (email, password) => {
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

  const setInputs = (key, value) => {
    inputs = { ...inputs, [`${key}`]: value };
  };

  const isValidEmail = email && validateEmail(email);

  if (email && !isValidEmail) {
    setInputs('email', {
      modifier: 'is-danger',
      message: 'Invalid email'
    });
  }

  const isValidPassword = password && password.length >= 6;

  if (isValidPassword) {
    setInputs('password', {
      modifier: 'is-success',
      message: 'Safe password'
    });
  } else if (password) {
    setInputs('password', {
      modifier: 'is-danger',
      message: 'Unsafe password'
    });
  }

  if (isValidEmail && isValidPassword) {
    setInputs('canSubmit', true);
  }

  return inputs;
};

export const availableLocales = props => Object.keys(props);
