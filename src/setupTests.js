/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import deepFreeze from 'deep-freeze';
import { configure, mount, shallow } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { IntlProvider } from 'react-intl';
import english from 'languages/en';

configure({ adapter: new Adapter() });

global.reducerTester = reducer => (currentState, action, expectedState) => {
  if (currentState && typeof currentState === 'object') {
    deepFreeze(currentState);
  }
  const newState = reducer(currentState, action);
  return expect(newState).toEqual(expectedState);
};

const mockedStore = (initial = {}) =>
  configureStore([
    /* place middlewares here */
  ])(initial);

const initStore = initialState =>
  mockedStore({
    ...initialState,
    preferences: { locale: 'en' }
  });

// Use this to test mounted components w/ store connection
global.mountWithProviders = children => initialState => {
  const store = initStore(initialState);
  return {
    component: mount(
      <IntlProvider locale="en" messages={english}>
        <BrowserRouter keyLength={0}>
          <Provider store={store}>{children}</Provider>
        </BrowserRouter>
      </IntlProvider>
    ),
    store
  };
};

global.shallowWithProviders = children => initialState => {
  const store = initStore(initialState);
  return {
    component: shallow(
      <IntlProvider locale="en" messages={english}>
        <BrowserRouter keyLength={0}>
          <Provider store={store}>{children}</Provider>
        </BrowserRouter>
      </IntlProvider>
    ),
    store
  };
};
