import React from 'react';
import * as reactRedux from 'react-redux';

import * as actions from 'state/actions/users';
import User from '.';

describe('<User /> rendering', () => {
  const dispatchMock = jest.fn();

  beforeEach(() => {
    jest
      .spyOn(reactRedux, 'useDispatch')
      .mockImplementation(() => dispatchMock);
    jest.spyOn(actions, 'usersCleanUp').mockImplementation(jest.fn);
  });

  it('should render without crashing', () => {
    const { component } = renderWithProviders(<User />)({
      users: {
        data: [],
      },
    });

    expect(component.asFragment()).toMatchSnapshot();
  });

  it('should not show the spinner when creating a user', () => {
    const { component } = renderWithProviders(<User />)({
      users: {
        data: [],
      },
    });

    expect(component.container.querySelector('.spinner')).toBeFalsy();
  });

  it('should render the UserForm component when creating a user', () => {
    const { component } = renderWithProviders(<User />)({
      users: {
        data: [],
      },
    });

    expect(component.getByText('User Information')).toBeTruthy();
  });
});
