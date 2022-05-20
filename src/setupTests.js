/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import deepFreeze from 'deep-freeze';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { IntlProvider } from 'react-intl';
import english from 'languages/en.json';
import 'mutationobserver-shim';
import thunk from 'redux-thunk';

global.MutationObserver = window.MutationObserver;

global.reducerTester = (reducer) => (currentState, action, expectedState) => {

  if (currentState && typeof currentState === 'object') {
    deepFreeze(currentState);
  }
  const newState = reducer(currentState, action);

  return expect(newState).toEqual(expectedState);

};

const mockedStore = (initial = {}) =>
  configureStore([
    thunk
  ])(initial);

const initStore = (initialState) =>
  mockedStore({
    ...initialState,
    preferences: { locale: 'en' },
  });

// Use this to test mounted components w/ store connection
global.renderWithProviders = (children) => (initialState) => {
  const store = initStore(initialState);
  return {
    component: render(
      <IntlProvider locale="en" messages={english}>
        <BrowserRouter keyLength={0}>
          <Provider store={store}>{children}</Provider>
        </BrowserRouter>
      </IntlProvider>
    ),
    store,
  };
};
