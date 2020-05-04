import React from 'react';
import * as reactRedux from 'react-redux';

import * as actions from 'state/actions/auth';
import ResetPassword from '.';

describe('<ResetPassword /> rendering', () => {
  it('should render without crashing', () => {
    const { component } = mountWithIntlProvider(<ResetPassword />)({
      auth: {
        userData: {}
      }
    });

    expect(component).toMatchSnapshot();
  });

  it('should display an error message correctly', () => {
    const { component } = mountWithIntlProvider(<ResetPassword />)({
      auth: {
        userData: {},
        error: 'some error'
      }
    });

    expect(component.find('.has-text-danger').length).toBe(1);
  });

  it('should display a confirmation message correctly', () => {
    const { component } = mountWithIntlProvider(<ResetPassword />)({
      auth: {
        userData: {},
        restoredPassword: true
      }
    });

    expect(component.find('.card-content p').length).toBe(1);
  });

  it('should display the button loading correctly', () => {
    const { component } = mountWithIntlProvider(<ResetPassword />)({
      auth: {
        userData: {},
        loading: true
      }
    });

    expect(component.find('button.is-loading').length).toBe(1);
  });
});

describe('<ResetPassword /> actions', () => {
  const dispatchMock = jest.fn();

  beforeEach(() => {
    jest
      .spyOn(reactRedux, 'useDispatch')
      .mockImplementation(() => dispatchMock);
    jest.spyOn(actions, 'resetPassword').mockImplementation(jest.fn);
    jest.spyOn(actions, 'authCleanUp').mockImplementation(jest.fn);
  });

  it('should dispatch resetPassword action when the form is submitted', () => {
    const { component } = mountWithIntlProvider(<ResetPassword />)({
      auth: {
        userData: {}
      }
    });

    component.find('form').simulate('submit');

    expect(actions.resetPassword).toBeCalled();
  });

  it('should dispatch resetPasswordCleanUp action when the component is unmounted', () => {
    const { component } = mountWithIntlProvider(<ResetPassword />)({
      auth: {
        userData: {}
      }
    });

    component.unmount();

    expect(actions.authCleanUp).toBeCalled();
  });
});
