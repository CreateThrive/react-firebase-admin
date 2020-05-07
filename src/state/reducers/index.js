import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { reducer as toastrReducer } from 'react-redux-toastr';
import { CookieStorage } from 'redux-persist-cookie-storage';
import Cookies from 'cookies-js';

import { authReducer } from './auth';
import { usersReducer } from './users';
import { langReducer } from './lang';

export default combineReducers({
  auth: persistReducer(
    {
      key: 'auth',
      storage,
      blacklist: ['error', 'loading']
    },
    authReducer
  ),
  lang: persistReducer(
    { key: 'lang', storage: new CookieStorage(Cookies, 'locale') },
    langReducer
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
