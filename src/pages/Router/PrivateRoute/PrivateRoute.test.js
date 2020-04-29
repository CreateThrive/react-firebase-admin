import React from 'react';
import * as reactRedux from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as actions from 'state/actions/auth';
import PrivateRoute from '.';
import paths from '../paths';

describe('<PrivateRoute /> rendering', () => {
  const dispatchMock = jest.fn();

  beforeEach(() => {
    jest
      .spyOn(reactRedux, 'useDispatch')
      .mockImplementation(() => dispatchMock);
    jest
      .spyOn(reactRedux, 'useSelector')
      .mockImplementation(() => dispatchMock);
    jest.spyOn(actions, 'auth').mockImplementation(jest.fn);
  });

  it('should render without crashing', () => {
    const { component } = mountWithProvider(<PrivateRoute />)({
      user: {}
    });

    expect(component).toMatchSnapshot();
  });

  it('should redirect to /login when the user is not authenticated', () => {
    const { component } = mountWithProvider(<PrivateRoute />)({
      user: {}
    });
    expect(component.contains(<Redirect to={paths.LOGIN} />)).toEqual(true);
  });
});
