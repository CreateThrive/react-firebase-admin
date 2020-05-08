import React from 'react';
import { Redirect } from 'react-router-dom';

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
