import React from 'react';
import * as reactRedux from 'react-redux';

import * as actions from 'state/actions/auth';
import Router from '.';

describe('<Router /> rendering', () => {
  const dispatchMock = jest.fn();

  beforeEach(() => {
    jest
      .spyOn(reactRedux, 'useDispatch')
      .mockImplementation(() => dispatchMock);
    jest.spyOn(actions, 'auth').mockImplementation(jest.fn);
  });

  it('should render without crashing', () => {
    const { component } = renderWithProviders(<Router />)({
      auth: { userData: { id: 'testId' } },
    });

    expect(component.asFragment()).toMatchSnapshot();
  });
});
