import React from 'react';
import * as reactRedux from 'react-redux';

import * as actions from 'state/actions/teams';
import * as usersActions from 'state/actions/users';

import UsersCard from '.';

describe('<UsersCard /> rendering', () => {
  const dispatchMock = jest.fn();
  const state = {
    auth: { userData: { isAdmin: true } },
    teams: {
      success: false,
      deleted: false,
      loadingUsers: false,
      loadingTeams: false,
      teamsList: [],
      usersList: [
        {
          name: 'testUser',
          email: 'test@test.com',
          location: 'Montevideo, Uruguay',
          isAdmin: true,
          file: null,
          id: 'testId',
          logoUrl: 'some lougoUrl',
          createdAt: '11/12/2020',
        },
      ],
    },
    users: { data: [] },
  };

  beforeEach(() => {
    jest
      .spyOn(reactRedux, 'useDispatch')
      .mockImplementation(() => dispatchMock);
    jest.spyOn(actions, 'addUser').mockImplementation(jest.fn);
    jest.spyOn(usersActions, 'usersCleanUp').mockImplementation(jest.fn);
  });

  it('should render without crashing', () => {
    const { component } = renderWithProviders(<UsersCard />)({ ...state });

    expect(component.asFragment()).toMatchSnapshot();
  });

  it('should not render Link for non-admins', () => {
    const { component } = renderWithProviders(<UsersCard />)({
      ...state,
      auth: {
        userData: {
          name: 'testUser',
          email: 'user@test.com',
          location: 'Montevideo, Uruguay',
          isAdmin: false,
          file: null,
          id: 'testUserId',
          logoUrl: 'some lougoUrl',
          createdAt: '11/12/2020',
        },
      },
    });

    expect(component.queryByRole('link')).toBeNull();
  });

  it('should render Link for admins', () => {
    const { component } = renderWithProviders(<UsersCard />)({
      ...state,
    });

    expect(component.getAllByRole('link')).toBeTruthy();
  });
});
