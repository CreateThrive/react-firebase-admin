import React from 'react';
import * as reactRedux from 'react-redux';
import { Link } from 'react-router-dom';

import en from 'assets/en.png';
import * as actions from 'state/actions/auth';
import * as action from 'state/actions/preferences';
import NavBar from '.';

const onHandleMobile = jest.fn();

describe('<NavBar /> rendering', () => {
  it('should render without crashing', () => {
    const { component } = shallowWithProviders(
      <NavBar handleMobileToggle={onHandleMobile} />
    )({
      auth: {
        userData: {}
      }
    });

    expect(component).toMatchSnapshot();
  });

  it('should render the links correctly', () => {
    const { component } = mountWithProviders(
      <NavBar handleMobileToggle={onHandleMobile} />
    )({
      auth: {
        userData: {}
      }
    });

    expect(component.find(Link)).toHaveLength(1);
  });
});

describe('<Bar /> actions', () => {
  const dispatchMock = jest.fn();

  beforeEach(() => {
    jest
      .spyOn(reactRedux, 'useDispatch')
      .mockImplementation(() => dispatchMock);
    jest.spyOn(actions, 'logout').mockImplementation(jest.fn);
    jest.spyOn(action, 'preferencesSetLocale').mockImplementation(jest.fn);
  });

  it('should dispatch logout action when the user tries to logout', () => {
    const { component } = mountWithProviders(
      <NavBar handleMobileToggle={onHandleMobile} />
    )({
      auth: {
        userData: {}
      }
    });

    component.find('#logout').simulate('click');

    expect(actions.logout).toHaveBeenCalled();
  });

  it('should dispatch preferencesSetLocale action when the user tries to change language', () => {
    const { component } = mountWithProviders(
      <NavBar handleMobileToggle={onHandleMobile} />
    )({
      auth: {
        userData: {}
      }
    });

    component.find('#es').simulate('click');

    expect(action.preferencesSetLocale).toHaveBeenCalledWith('es');
  });

  it('should display US flag when locale is set to english', () => {
    const { component } = mountWithProviders(
      <NavBar handleMobileToggle={onHandleMobile} />
    )({
      auth: {
        userData: {}
      }
    });
    expect(component.find('#en').prop('src')).toBe(en);
  });
});
