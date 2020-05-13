import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import ReduxToastr from 'react-redux-toastr';

import LanguageWrapper from 'components/LanguageWrapper';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import { configureStore } from './state/store';
import './index.scss';
import Router from './pages/Router';
import * as serviceWorker from './serviceWorker';

import './assets/css/main.css';

const { store, persistor } = configureStore({});

const app = (
  <Provider store={store}>
    <LanguageWrapper>
      <PersistGate persistor={persistor}>
        <ReduxToastr
          newestOnTop={false}
          preventDuplicates
          position="bottom-right"
          getState={state => state.toastr}
          transitionIn="fadeIn"
          transitionOut="fadeOut"
          progressBar
          closeOnToastrClick
        />
        <Router />
      </PersistGate>
    </LanguageWrapper>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

serviceWorker.unregister();
