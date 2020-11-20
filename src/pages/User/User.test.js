import React from 'react';
import * as reactRedux from 'react-redux';
import Router from 'react-router-dom';

import * as actions from 'state/actions/users';
import User from '.';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ id: 'userId' }),
}));

describe('<User /> rendering', () => {
  const dispatchMock = jest.fn();

  beforeEach(() => {
    jest
      .spyOn(reactRedux, 'useDispatch')
      .mockImplementation(() => dispatchMock);
    jest.spyOn(actions, 'usersCleanUp').mockImplementation(jest.fn);
    jest
      .spyOn(Router, 'useParams')
      .mockImplementation(() => ({ id: 'userId' }));
  });

  it('should render without crashing', () => {
    const { component } = renderWithProviders(<User />)({
      users: {
        data: [
          {
            email: 'test@gmail.com',
            name: 'Test',
            location: 'Montevideo, Uruguay',
            isAdmin: false,
            file: null,
            id: 'userId',
            logoUrl: 'some logoUrl',
            createdAt: '11/12/2020',
          },
        ],
      },
    });

    expect(component.asFragment()).toMatchSnapshot();
  });

  it('should not show the spinner when creating a user', () => {
    const { component } = renderWithProviders(<User />)({
      users: {
        data: [
          {
            email: 'test@gmail.com',
            name: 'Test',
            location: 'Montevideo, Uruguay',
            isAdmin: false,
            file: null,
            id: 'userId',
            logoUrl: 'some logoUrl',
            createdAt: '11/12/2020',
          },
        ],
      },
    });

    expect(component.container.querySelector('.spinner')).toBeFalsy();
  });

  it('should render the UserForm component when creating a user', () => {
    const { component } = renderWithProviders(<User />)({
      users: {
        data: [
          {
            email: 'test@gmail.com',
            name: 'Test',
            location: 'Montevideo, Uruguay',
            isAdmin: false,
            file: null,
            id: 'userId',
            logoUrl: 'some logoUrl',
            createdAt: '11/12/2020',
          },
        ],
      },
    });

    expect(component.getByText('User Information')).toBeTruthy();
  });
});
