import React from 'react';
import * as reactRedux from 'react-redux';
import '@testing-library/jest-dom';

import * as actions from 'state/actions/auth';
import { fireEvent } from '@testing-library/react';
import ResetPassword from '.';

describe('<ResetPassword /> rendering', () => {
  const dispatchMock = jest.fn();

  beforeEach(() => {
    jest
      .spyOn(reactRedux, 'useDispatch')
      .mockImplementation(() => dispatchMock);
    jest.spyOn(actions, 'authCleanUp').mockImplementation(jest.fn);
  });

  it('should render without crashing', () => {
    const { component } = renderWithProviders(<ResetPassword />)({
      auth: {
        userData: {},
      },
    });

    expect(component.asFragment()).toMatchSnapshot();
  });

  it('should display an error message correctly', () => {
    const { component } = renderWithProviders(<ResetPassword />)({
      auth: {
        userData: {},
        error: 'some error',
      },
    });

    expect(component.container.querySelector('p.has-text-danger')).toBeTruthy();
  });

  it('should display a confirmation message correctly', () => {
    const { component } = renderWithProviders(<ResetPassword />)({
      auth: {
        userData: {},
        restoredPassword: true,
      },
    });

    expect(component.container.querySelector('.card-content')).toBeTruthy();
  });

  it('should display the button loading correctly', () => {
    const { component } = renderWithProviders(<ResetPassword />)({
      auth: {
        userData: {},
        loading: true,
      },
    });

    expect(component.getByRole('button')).toHaveClass('is-loading');
  });
});

describe('<ResetPassword /> actions', () => {
  const dispatchMock = jest.fn();

  beforeEach(() => {
    jest
      .spyOn(reactRedux, 'useDispatch')
      .mockImplementation(() => dispatchMock);
    jest.spyOn(actions, 'resetPassword').mockImplementation(() => jest.fn());
    jest.spyOn(actions, 'authCleanUp').mockImplementation(jest.fn);
  });

  it('should dispatch resetPassword action when the form is submitted', async () => {
    const { component } = renderWithProviders(<ResetPassword />)({
      auth: {
        userData: {},
      },
    });

    fireEvent.input(component.container.querySelector('input[name=email]'), {
      target: {
        value: 'test@gmail.com',
      },
    });

    fireEvent.submit(component.container.querySelector('form'));

    await (() => expect(actions.resetPassword).toBeCalledTimes(1));

    await (() =>
      expect(actions.resetPassword).toBeCalledWith('test@gmail.com'));
  });

  it('should dispatch resetPasswordCleanUp action when the component is unmounted', () => {
    const { component } = renderWithProviders(<ResetPassword />)({
      auth: {
        userData: {},
      },
    });

    component.unmount();

    expect(actions.authCleanUp).toBeCalled();
  });
});
