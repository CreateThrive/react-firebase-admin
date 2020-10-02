import React from 'react';
import * as reactRedux from 'react-redux';

import * as actions from 'state/actions/auth';
import paths from '../Router/paths';
import Login from '.';

jest.mock('react-firebaseui');

describe('<Login /> rendering', () => {
  const dispatchMock = jest.fn();

  beforeEach(() => {
    jest
      .spyOn(reactRedux, 'useDispatch')
      .mockImplementation(() => dispatchMock);
    jest.spyOn(actions, 'authCleanUp').mockImplementation(jest.fn);
  });

  it('should render without crashing', () => {
    const { component } = renderWithProviders(<Login />)({
      auth: {
        userData: {},
      },
    });

    expect(component.asFragment()).toMatchSnapshot();
  });

  it('should display an error message when there is an error', () => {
    const { component } = renderWithProviders(<Login />)({
      auth: {
        userData: {},
        error: 'sample error',
      },
    });

    expect(component.container.querySelector('p.has-text-danger')).toBeTruthy();
  });

  it('should redirect to /home when the user is authenticated', () => {
    renderWithProviders(<Login />)({
      auth: {
        userData: {
          id: 'some userId',
        },
      },
    });

    expect(window.location.pathname).toBe(paths.ROOT);
  });
});
