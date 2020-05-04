import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import ReduxToastr from 'react-redux-toastr';
import { IntlProvider } from 'react-intl';

import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import { configureStore } from './state/store';
import './index.scss';
import Router from './pages/Router';
import * as serviceWorker from './serviceWorker';
import spanish from './languages/es.json';
import english from './languages/en.json';

import './assets/css/main.css';

const local = navigator.language.split(/[-_]/)[0];

const messages = {
  es: spanish,
  en: english
};

const { store, persistor } = configureStore({});

const app = (
  <IntlProvider locale={local} messages={messages[local]}>
    <Provider store={store}>
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
    </Provider>
  </IntlProvider>
);

ReactDOM.render(app, document.getElementById('root'));

serviceWorker.unregister();
