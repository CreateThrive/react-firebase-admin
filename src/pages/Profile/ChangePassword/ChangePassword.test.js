import React from 'react';
import * as reactRedux from 'react-redux';
import { fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import * as actions from 'state/actions/auth';
import ChangePassword from '.';

describe('<ChangePassword /> rendering', () => {
  const dispatchMock = jest.fn();

  beforeEach(() => {
    jest
      .spyOn(reactRedux, 'useDispatch')
      .mockImplementation(() => dispatchMock);
    jest.spyOn(actions, 'authCleanUp').mockImplementation(jest.fn);
  });

  it('should render without crashing', () => {
    const { component } = renderWithProviders(<ChangePassword />)({
      auth: {
        userData: {},
      },
    });

    expect(component.asFragment()).toMatchSnapshot();
  });

  it('should display an error message when the current and new password are equal', () => {
    const { component } = renderWithProviders(<ChangePassword />)({
      auth: {
        userData: {},
      },
    });

    fireEvent.input(component.container.querySelector('input[name=current]'), {
      target: {
        value: 'oldpassword',
      },
    });

    fireEvent.input(component.container.querySelector('input[name=new]'), {
      target: {
        value: 'oldpassword',
      },
    });

    expect(component.container.querySelector('.error')).toBeTruthy();
  });

  it('should display a message informing the user that the new password is secure', () => {
    const { component } = renderWithProviders(<ChangePassword />)({
      auth: {
        userData: {},
      },
    });

    fireEvent.input(component.container.querySelector('input[name=new]'), {
      target: {
        value: 'newSecurePassword',
      },
    });

    expect(component.container.querySelector('p.is-success')).toBeTruthy();
  });

  it('should display a message informing the user that the new and confirmation passwords match', () => {
    const { component } = renderWithProviders(<ChangePassword />)({
      auth: {
        userData: {},
      },
    });

    fireEvent.input(component.container.querySelector('input[name=new]'), {
      target: {
        value: 'newSecurePassword!',
      },
    });

    fireEvent.input(
      component.container.querySelector('input[name=confirmation]'),
      {
        target: {
          value: 'newSecurePassword!',
        },
      }
    );

    expect(component.container.querySelector('p.is-success')).toBeTruthy();
  });

  it('should display the button loading when loading', () => {
    const { component } = renderWithProviders(<ChangePassword />)({
      auth: {
        userData: {},
        loading: true,
      },
    });

    expect(component.getByRole('button')).toHaveClass('is-loading');
  });
});

describe('<ChangePassword /> actions', () => {
  const dispatchMock = jest.fn();
  beforeEach(() => {
    jest
      .spyOn(reactRedux, 'useDispatch')
      .mockImplementation(() => dispatchMock);
    jest.spyOn(actions, 'changeUserPassword').mockImplementation(jest.fn);
  });

  it('should dispatch changeUserPassword action when the form is submited', async () => {
    const { component } = renderWithProviders(<ChangePassword />)({
      auth: {
        userData: {},
      },
    });

    fireEvent.input(component.container.querySelector('input[name=current]'), {
      target: {
        value: 'oldpassword',
      },
    });

    fireEvent.input(
      component.container.querySelector('input[name=confirmation]'),
      {
        target: {
          value: 'newpassword',
        },
      }
    );

    fireEvent.input(
      component.container.querySelector('input[name=confirmation]'),
      {
        target: {
          value: 'newpassword',
        },
      }
    );

    fireEvent.submit(component.container.querySelector('form'));

    await (() => expect(actions.changeUserPassword).toBeCalledTimes(1));

    await (() =>
      expect(actions.changeUserPassword).toBeCalledWith(
        'oldpassword',
        'newpassword'
      ));
  });
});
