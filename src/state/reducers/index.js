import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { reducer as toastrReducer } from 'react-redux-toastr';
import { CookieStorage } from 'redux-persist-cookie-storage';
import Cookies from 'cookies-js';

import { authReducer } from './auth';
import { usersReducer } from './users';
import { preferencesReducer } from './preferences';

export default combineReducers({
  auth: persistReducer(
    {
      key: 'auth',
      storage,
      blacklist: ['error', 'loading']
    },
    authReducer
  ),
  preferences: persistReducer(
    { key: 'preferences', storage: new CookieStorage(Cookies) },
    preferencesReducer
  ),
  users: persistReducer(
    {
      key: 'users',
      storage,
      blacklist: ['error', 'loading']
    },
    usersReducer
  ),
  toastr: toastrReducer
});
