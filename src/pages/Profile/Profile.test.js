import React from 'react';
import * as reactRedux from 'react-redux';

import * as actions from 'state/actions/users';
import Profile from '.';

describe('<Profile /> rendering', () => {
  const dispatchMock = jest.fn();

  beforeEach(() => {
    jest
      .spyOn(reactRedux, 'useDispatch')
      .mockImplementation(() => dispatchMock);
    jest.spyOn(actions, 'usersCleanUp').mockImplementation(jest.fn);
  });

  it('should render without crashing', () => {
    const { component } = renderWithProviders(<Profile />)({
      users: {
        data: [],
      },
      auth: {
        userData: {
          email: 'test@test.com',
          name: 'Test',
          location: 'Montevideo, Uruguay',
          isAdmin: false,
          file: null,
          id: 'test id',
          logoUrl: 'some logoUrl',
          createdAt: '11/12/2020',
        },
      },
    });

    expect(component.asFragment()).toMatchSnapshot();
  });
});
