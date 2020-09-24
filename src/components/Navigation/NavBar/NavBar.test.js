import React from 'react';
import * as reactRedux from 'react-redux';
import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/react';

import es from 'assets/es.png';
import * as authActions from 'state/actions/auth';
import * as preferencesActions from 'state/actions/preferences';
import paths from 'pages/Router/paths';
import NavBar from '.';

const onHandleMobile = jest.fn();

describe('<NavBar /> rendering', () => {
  it('should render without crashing', () => {
    const { component } = renderWithProviders(
      <NavBar handleMobileToggle={onHandleMobile} />
    )({
      auth: {
        userData: {},
      },
    });

    expect(component.asFragment()).toMatchSnapshot();
  });

  it('the link should redirect to the profile page', () => {
    const { component } = renderWithProviders(
      <NavBar handleMobileToggle={onHandleMobile} />
    )({
      auth: {
        userData: {},
      },
    });

    fireEvent.click(component.getByText('Profile'));

    expect(window.location.pathname).toBe(paths.PROFILE);
  });
});

describe('<Bar /> actions', () => {
  const dispatchMock = jest.fn();

  beforeEach(() => {
    jest
      .spyOn(reactRedux, 'useDispatch')
      .mockImplementation(() => dispatchMock);
    jest.spyOn(authActions, 'logout').mockImplementation(jest.fn);
    jest.spyOn(preferencesActions, 'setUserLocale').mockImplementation(jest.fn);
  });

  it('should dispatch logout action when the user tries to logout', () => {
    const { component } = renderWithProviders(
      <NavBar handleMobileToggle={onHandleMobile} />
    )({
      auth: {
        userData: {},
      },
    });

    fireEvent.click(component.getByText('Log Out'));

    expect(authActions.logout).toHaveBeenCalled();
  });

  it('should display US flag when locale is set to english', () => {
    const { component } = renderWithProviders(
      <NavBar handleMobileToggle={onHandleMobile} />
    )({
      auth: {
        userData: {},
      },
    });
    expect(component.getByAltText('es flag')).toHaveAttribute('src', es);
  });

  it('should dispatch setUserLocale action when the user tries to change language', () => {
    const { component } = renderWithProviders(
      <NavBar handleMobileToggle={onHandleMobile} />
    )({
      auth: {
        userData: {},
      },
    });

    fireEvent.click(component.getByAltText('es flag'));

    expect(preferencesActions.setUserLocale).toHaveBeenCalledWith('es');
  });
});
