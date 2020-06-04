import React from 'react';
import { Redirect } from 'react-router-dom';
import * as reactRedux from 'react-redux';

import * as authActions from 'state/actions/auth';
import paths from '../Router/paths';
import Login from '.';

describe('<Login /> rendering', () => {
  it('should render without crashing', () => {
    const { component } = mountWithProviders(<Login />)({
      auth: {
        userData: {}
      }
    });

    expect(component).toMatchSnapshot();
  });

  it('should display an error message when there is an error', () => {
    const { component } = mountWithProviders(<Login />)({
      auth: {
        userData: {},
        error: 'sample error'
      }
    });

    expect(component.find('.has-text-danger').length).toBe(1);
  });

  it('should redirect to /home when the user is authenticated', () => {
    const { component } = mountWithProviders(<Login />)({
      auth: {
        userData: {
          id: 'some userId'
        }
      }
    });

    expect(component.contains(<Redirect to={paths.ROOT} />)).toEqual(true);
  });
});

const dispatchMock = jest.fn();

beforeEach(() => {
  jest.spyOn(reactRedux, 'useDispatch').mockImplementation(() => dispatchMock);
  jest.spyOn(authActions, 'authFacebook').mockImplementation(jest.fn);
  jest.spyOn(authActions, 'authGoogle').mockImplementation(jest.fn);
});

it('should dispatch authFacebook action when the user tries to log in with Facebook', () => {
  const { component } = mountWithProviders(<Login />)({
    auth: {
      userData: {}
    }
  });

  component.find('#facebook').simulate('click');

  expect(authActions.authFacebook).toHaveBeenCalled();
});

it('should dispatch authGoogle action when the user tries to log in with Google', () => {
  const { component } = mountWithProviders(<Login />)({
    auth: {
      userData: {}
    }
  });

  component.find('#google').simulate('click');

  expect(authActions.authGoogle).toHaveBeenCalled();
});
