import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';

import rootReducer from './reducers';
import { verifyAuth } from './actions/auth';

export const store = configureStore({
  reducer: rootReducer,

});

store.dispatch(verifyAuth());
export const persistor = persistStore(store);