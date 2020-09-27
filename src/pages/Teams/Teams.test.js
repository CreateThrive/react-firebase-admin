import React from 'react';
import * as reactRedux from 'react-redux';

import * as teamsActions from 'state/actions/teams';
import * as usersActions from 'state/actions/users';
import Teams from '.';

describe('<Teams /> rendering', () => {
  const dispatchMock = jest.fn();
  const state = {
    auth: { userData: { isAdmin: true } },
    teams: {
      success: false,
      deleted: false,
      loadingUsers: false,
      loadingTeams: false,
      teamsList: [{ id: 'teamTestId', name: 'testTeam', createdBy: 'test' }],
      usersList: [
        {
          name: 'testUser',
          id: 'userTestId',
          isAdmin: false,
          email: 'test@test.com',
          location: 'Montevideo, Uruguay',
          file: null,
          logoUrl: 'some lougoUrl',
          createdAt: '11/12/2020',
        },
      ],
    },
    users: { data: ['testUser'] },
  };

  beforeEach(() => {
    jest
      .spyOn(reactRedux, 'useDispatch')
      .mockImplementation(() => dispatchMock);
    jest.spyOn(teamsActions, 'teamsCleanUp').mockImplementation(jest.fn);
    jest.spyOn(usersActions, 'usersCleanUp').mockImplementation(jest.fn);
  });

  it('should render without crashing', () => {
    const { component } = renderWithProviders(<Teams />)({ ...state });

    expect(component.asFragment()).toMatchSnapshot();
  });
});
